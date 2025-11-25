import assert from 'node:assert';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = resolve(__dirname, '../data/stories.json');
const stories = JSON.parse(readFileSync(dataPath, 'utf8'));

const mustHave = ['Politics', 'Business', 'Technology', 'Sports', 'Science', 'Health', 'Entertainment', 'World'];

const now = new Date('2024-11-25');
const oldestAllowed = new Date(now);
oldestAllowed.setDate(now.getDate() - 30);

test('contains at least 20 stories', () => {
  assert.ok(stories.length >= 20, `Expected at least 20 stories, found ${stories.length}`);
});

test('uses required core categories', () => {
  const categories = new Set(stories.map((story) => story.category));
  mustHave.forEach((cat) => assert.ok(categories.has(cat), `Missing category ${cat}`));
});

test('includes recent publication dates', () => {
  const allRecent = stories.every((story) => {
    const published = new Date(story.published);
    return published >= oldestAllowed && published <= now;
  });
  assert.ok(allRecent, 'Stories should be from the last month');
});
