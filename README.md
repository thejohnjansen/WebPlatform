# WebPlatform2026

A lightweight workspace for:

- Draft explainers in Markdown (`.md`)
- Front-end prototypes in HTML/CSS/JavaScript
- Focused test cases for browser behavior

## Project Layout

```
explainers/
	README.md
	example-explainer.md
prototypes/
	README.md
	template/
		index.html
		styles.css
		script.js
test-cases/
	README.md
```

## How To Use

1. Write drafts in `explainers/`.
2. Create a new folder under `prototypes/` by copying `prototypes/template/`.
3. Store isolated reproductions and notes in `test-cases/`.

## Quick Start

Open a prototype directly:

- `prototypes/template/index.html`

Or run a simple local server from the repo root if you prefer:

```bash
npx serve .
```

## GitHub Pages

This repository now includes a root landing page at `index.html`, which is the default entry point GitHub Pages serves for a project site.

- Site shell: `index.html`
- Site styles: `assets/styles.css`

If your Pages source is set to this repository root (or the default branch root), the landing page will load automatically.