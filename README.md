# The New Hagen News

A modern, static news landing page showcasing the most popular categories and twenty curated stories from the past few weeks.

## Getting started

No build step is required. Open `index.html` in a browser or serve the folder locally (for example, `python -m http.server 8000`).

## Data

Story content lives in `data/stories.json`. Each story includes a title, category, publication date, summary, and link placeholder. The homepage loads this JSON to render category pills and story cards.

## Styling and theme

The site uses a brighter neon navy palette defined in `styles/style.css` with top-level CSS variables for background, text, and accent tones. Adjust the values in the `:root` block to fine-tune contrast or swap in your own brand colors while keeping the same gradients and card layout.

## Ad placements

Use the `#ad-slot` panel in `index.html` to embed a Google AdSense unit. Replace the commented sample snippet with your own `data-ad-client` and `data-ad-slot` values to begin serving ads on the page.

## Running tests

Node's built-in test runner checks the dataset for completeness and freshness.

```bash
npm test
```

The suite verifies that at least 20 stories exist, the core categories are covered, and every story falls within the last month relative to 2024-11-25.
