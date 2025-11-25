# The New Hagen News

A modern, static news landing page showcasing the most popular categories and twenty curated stories from the past few weeks.

## Getting started

No build step is required. Open `index.html` in a browser or serve the folder locally (for example, `python -m http.server 8000`).

## Data

Story content lives in `data/stories.json`. Each story includes a title, category, publication date, summary, full `content` text for the in-card "Read more" expansion, and a link placeholder. The homepage loads this JSON to render category pills and story cards.

Visitors can click the **Read more** button on any story card to expand it in place and reveal the complete article copy. The button toggles to **Show less** so readers can collapse the card without leaving the page.

## Styling and theme

The site uses a brighter neon navy palette defined in `styles/style.css` with top-level CSS variables for background, text, and accent tones. Adjust the values in the `:root` block to fine-tune contrast or swap in your own brand colors while keeping the same gradients and card layout.

## Ad placements

Ads now live in dual side rails that flank the main content. Each rail in `index.html` contains a placeholder AdSense snippet and uses the `.ad-rail` and `.ad-placeholder` styles from `styles/style.css` to keep units visible as visitors scroll. Replace the commented sample snippets on the left and right rails with your own `data-ad-client` and `data-ad-slot` values to begin serving ads on the page.

## Running tests

Node's built-in test runner checks the dataset for completeness and freshness.

```bash
npm test
```

The suite verifies that at least 20 stories exist, the core categories are covered, and every story falls within the last month relative to 2024-11-25. The project uses Node's native ES modules (via `"type": "module"` in `package.json`), so ensure your environment supports Node 18+.
