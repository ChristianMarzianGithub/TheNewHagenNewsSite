const storiesContainer = document.getElementById('stories');
const sortSelect = document.getElementById('sort-select');
const pillsContainer = document.getElementById('category-pills');
const categoryCount = document.getElementById('category-count');
const viewLatestBtn = document.getElementById('view-latest');
const viewTrendingBtn = document.getElementById('view-trending');

let stories = [];
let activeCategory = 'all';

const categoryPalette = {
  Politics: '#f772e1',
  Business: '#f6b73c',
  Technology: '#6ae6ff',
  Sports: '#5cd68a',
  Science: '#b39cff',
  Health: '#ff9b6a',
  Entertainment: '#ffe66d',
  World: '#71c4ff',
  Travel: '#5fd1c4',
  Lifestyle: '#e0ff6b'
};

async function loadStories() {
  const res = await fetch('data/stories.json');
  const data = await res.json();
  stories = data;
  document.getElementById('story-count').textContent = stories.length;
  renderCategories();
  renderStories();
}

function renderCategories() {
  const categoryCounts = stories.reduce((acc, story) => {
    acc[story.category] = (acc[story.category] || 0) + 1;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1]);

  categoryCount.textContent = sortedCategories.length;

  pillsContainer.innerHTML = '';
  const allPill = createPill('All', 'all');
  pillsContainer.appendChild(allPill);
  sortedCategories.forEach(([category]) => {
    const pill = createPill(category, category);
    pillsContainer.appendChild(pill);
  });
}

function createPill(label, key) {
  const pill = document.createElement('button');
  pill.className = `pill${activeCategory === key ? ' active' : ''}`;
  pill.textContent = label;
  pill.addEventListener('click', () => {
    activeCategory = key;
    renderStories();
    Array.from(pillsContainer.children).forEach((el) => el.classList.remove('active'));
    pill.classList.add('active');
  });
  return pill;
}

function renderStories() {
  const filtered = activeCategory === 'all'
    ? [...stories]
    : stories.filter((story) => story.category === activeCategory);

  const sorted = sortStories(filtered, sortSelect.value);
  storiesContainer.innerHTML = '';

  sorted.forEach((story) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="category" style="color:${categoryPalette[story.category] || '#71c4ff'}">
        <span>●</span> ${story.category}
      </div>
      <h3>${story.title}</h3>
      <p class="summary">${story.summary}</p>
      <p class="full-text" hidden>${story.content}</p>
      <div class="meta">
        <span>${formatDate(story.published)}</span>
        <button class="read-more" type="button" aria-label="Read more about ${story.title}" aria-expanded="false">Read more</button>
      </div>
    `;

    const readMoreBtn = card.querySelector('.read-more');
    const fullText = card.querySelector('.full-text');

    readMoreBtn.addEventListener('click', () => {
      const expanded = card.classList.toggle('expanded');
      fullText.hidden = !expanded;
      readMoreBtn.textContent = expanded ? 'Show less' : 'Read more';
      readMoreBtn.setAttribute('aria-expanded', expanded.toString());
      readMoreBtn.setAttribute('aria-label', expanded
        ? `Collapse story ${story.title}`
        : `Read more about ${story.title}`);
    });

    storiesContainer.appendChild(card);
  });
}

function sortStories(list, mode) {
  const copy = [...list];
  if (mode === 'alphabetical') {
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (mode === 'category') {
    return copy.sort((a, b) => a.category.localeCompare(b.category));
  }
  return copy.sort((a, b) => new Date(b.published) - new Date(a.published));
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

sortSelect.addEventListener('change', () => renderStories());
viewLatestBtn.addEventListener('click', () => {
  sortSelect.value = 'newest';
  activeCategory = 'all';
  renderStories();
});

viewTrendingBtn.addEventListener('click', () => {
  const firstCategory = pillsContainer.querySelector('.pill:nth-child(2)');
  if (firstCategory) firstCategory.click();
});

loadStories();
