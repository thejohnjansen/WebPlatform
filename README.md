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