/**
 * Simple JavaScript masonry layout implementation
 * This demonstrates the classic pre-Grid Lanes approach that libraries like Masonry.js used.
 * 
 * The algorithm:
 * 1. Calculate how many columns fit in the container (matching repeat(auto-fill, minmax(280px, 1fr)))
 * 2. Calculate the actual column width based on available space
 * 3. Track the current height of each column
 * 4. For each item, place it in the shortest column
 * 5. Calculate its absolute position (left, top)
 * 6. Set CSS transform and width to position it correctly
 * 7. Repeat for all items
 * 
 * This is EXPENSIVE work — every resize recalculates everything!
 */

class SimpleJSMasonry {
  constructor(container, minColumnWidth = 280) {
    this.container = container;
    this.minColumnWidth = minColumnWidth;
    this.gap = 16;
    this.columns = [];
    this.columnHeights = [];

    // Listen for window resize to recalculate layout
    window.addEventListener('resize', () => this.layout());

    // Initial layout after images load (in real scenarios)
    this.layout();
  }

  layout() {
    // Clear previous state
    this.columns = [];
    this.columnHeights = [];

    // Calculate number of columns that fit in container width
    const containerWidth = this.container.clientWidth;
    
    // Calculate how many columns fit with minmax(280px, 1fr) + gap
    // We want: (n * minColWidth) + ((n-1) * gap) <= containerWidth
    let columnCount = 1;
    while ((columnCount + 1) * this.minColumnWidth + columnCount * this.gap <= containerWidth) {
      columnCount++;
    }
    
    // Calculate the actual column width based on available space (like 1fr does)
    const totalGapWidth = (columnCount - 1) * this.gap;
    const columnWidth = (containerWidth - totalGapWidth) / columnCount;

    // Initialize column arrays and heights
    for (let i = 0; i < columnCount; i++) {
      this.columns[i] = [];
      this.columnHeights[i] = 0;
    }

    // Get all cards
    const cards = Array.from(this.container.querySelectorAll('.card'));

    // Place each card in the shortest column
    cards.forEach((card) => {
      // Handle wide cards: span 2 columns
      if (card.classList.contains('card--wide')) {
        // Wide card anchors to the left (columns 0-1)
        // But it should be placed below whichever of those two columns is taller
        const bestCol = 0;
        this.columns[bestCol].push(card);

        // Measure the card's height
        const cardHeight = card.offsetHeight;

        // Set its width to span 2 columns (or 1 if only 1 column exists)
        const colsToSpan = Math.min(2, columnCount);
        let wideWidth = 0;
        for (let i = 0; i < colsToSpan; i++) {
          wideWidth += columnWidth;
          if (i < colsToSpan - 1) {
            wideWidth += this.gap;
          }
        }
        card.style.width = `${wideWidth}px`;

        // Find the maximum height of the columns this card will span
        // and place it after them
        let maxSpanHeight = 0;
        for (let i = 0; i < colsToSpan; i++) {
          maxSpanHeight = Math.max(maxSpanHeight, this.columnHeights[bestCol + i]);
        }

        // Update heights for all columns this card spans
        for (let i = 0; i < colsToSpan; i++) {
          this.columnHeights[bestCol + i] = maxSpanHeight + cardHeight + this.gap;
        }
      } else {
        // Find the shortest column
        let shortestCol = 0;
        let shortestHeight = this.columnHeights[0];

        for (let i = 1; i < columnCount; i++) {
          if (this.columnHeights[i] < shortestHeight) {
            shortestHeight = this.columnHeights[i];
            shortestCol = i;
          }
        }

        // Add card to shortest column
        this.columns[shortestCol].push(card);

        // Measure the card
        const cardHeight = card.offsetHeight;

        // Update that column's height
        this.columnHeights[shortestCol] += cardHeight + this.gap;

        // Set normal width
        card.style.width = `${columnWidth}px`;
      }
    });

    // Now calculate and apply absolute positions for each card
    this.positionCards(columnCount, columnWidth);

    // Set container height to the tallest column
    const maxHeight = Math.max(...this.columnHeights);
    this.container.style.height = `${maxHeight}px`;

    // Log the column distribution for debugging
    console.log('Masonry layout recalculated:', {
      columnCount,
      containerWidth,
      columnWidth: Math.round(columnWidth),
      columnHeights: this.columnHeights.map(h => Math.round(h)),
      itemsPerColumn: this.columns.map((col) => col.length),
    });
  }

  positionCards(columnCount, columnWidth) {
    // Track the Y position for each column
    const columnYPositions = new Array(columnCount).fill(0);

    // Get all cards in order
    const cards = Array.from(this.container.querySelectorAll('.card'));

    cards.forEach((card) => {
      // Find which column this card belongs to
      let cardColumn = 0;
      for (let col = 0; col < columnCount; col++) {
        if (this.columns[col].includes(card)) {
          cardColumn = col;
          break;
        }
      }

      // Calculate X position (left)
      const left = cardColumn * (columnWidth + this.gap);

      // Calculate Y position (top)
      // For wide cards, find the max Y position of all columns it spans
      let top;
      const isWide = card.classList.contains('card--wide');
      const colsToSpan = isWide ? Math.min(2, columnCount) : 1;
      
      if (isWide) {
        top = columnYPositions[cardColumn];
        for (let i = 1; i < colsToSpan; i++) {
          top = Math.max(top, columnYPositions[cardColumn + i]);
        }
      } else {
        top = columnYPositions[cardColumn];
      }

      // Apply positioning
      card.style.position = 'absolute';
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;

      // Update Y position for this column and any columns this card spans
      const cardHeight = card.offsetHeight;

      // For wide cards, all spanned columns should have the same Y position after this card
      if (isWide) {
        const newYPos = top + cardHeight + this.gap;
        for (let i = 0; i < colsToSpan; i++) {
          columnYPositions[cardColumn + i] = newYPos;
        }
      } else {
        columnYPositions[cardColumn] += cardHeight + this.gap;
      }
    });
  }
}

// Initialize masonry when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  new SimpleJSMasonry(gallery, 280);
});
