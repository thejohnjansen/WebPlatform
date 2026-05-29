# glTests — Grid Lanes Bug-Hunting Tests

Reftests for CSS `display: grid-lanes` (CSS Grid Layout Level 3) targeting spec behaviors that have sparse or no WPT coverage. Each test is a pair: `<name>.html` (the test) and `<name>-ref.html` (the reference rendering built with regular grid/absolute positioning).

## Test format

Follows the [WPT reftest](https://web-platform-tests.org/writing-tests/reftests.html) convention:
- Test file links `rel="match"` to its reference file
- Both link `rel="help"` to the relevant spec section at `https://drafts.csswg.org/css-grid-3/`
- References reproduce the expected pixel output using already-supported CSS (regular grid, flex, absolute positioning) rather than `display: grid-lanes`

## Test inventory

| File | Spec section | What it probes |
|---|---|---|
| `column-inline-grid-lanes-001` | §2.2 | `display: inline-grid-lanes` generates an inline-level box (two containers side-by-side) |
| `column-flow-tolerance-percentage-001` | §4.2 | `flow-tolerance` accepts percentage values (relative to grid-axis content box) |
| `column-flow-tolerance-zero-001` | §4.2 | `flow-tolerance: 0` forces strict shortest-column placement |
| `row-flow-tolerance-infinite-001` | §4.2 | `flow-tolerance: infinite` on row grid-lanes fills rows in source order |
| `column-stacking-align-content-center-001` | §6.3 | `align-content: center` centers the stacking range as a block |
| `column-stacking-align-self-end-001` | §6.4 | `align-self: end` on item adjacent to gap before spanning item |
| `column-rtl-placement-001` | §4.4.2 | `direction: rtl` reverses column placement order |
| `column-auto-fit-collapse-001` | §3.3.1 | `repeat(auto-fit)` collapses empty tracks; `repeat(auto-fill)` keeps them |
| `column-abspos-stacking-lines-001` | §8 | Abs-pos item with `grid-row: 1 / -1` spans full stacking range |
| `column-dense-packing-001` | §4.3 | `grid-auto-flow: dense` backfills gaps left by explicitly-placed items |
| `row-lanes-orientation-001` | §2.3 | `grid-template-rows` (columns=none) triggers row-axis grid lanes layout |

## Running the tests

Open each `.html` file in a browser that supports `display: grid-lanes` (Chrome/Edge 149+, Safari TP 234+). Use the browser's devtools or a visual diff tool to compare with the `-ref.html` counterpart.

For automated runs, these tests are compatible with the [wpt harness](https://github.com/web-platform-tests/wpt) reftest runner.

## Spec issues targeted

- **ISSUE 3 (§2.3):** The orientation property is TBD — `row-lanes-orientation-001` exercises the fallback rule (grid-template-rows ≠ none → block axis is grid axis).
- **ISSUE 8 (§4.4):** Whether explicit placement updates the auto-placement cursor is unresolved — `column-dense-packing-001` exercises interplay between explicit and auto placement.
- **ISSUE 9 (§8):** Static position in the stacking axis is undefined — `column-abspos-stacking-lines-001` exercises the defined line-1 / line-(-1) placement.
