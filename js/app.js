document.addEventListener('DOMContentLoaded', () => {
  fetch('data/shortcuts.json')
    .then(response => response.json())
    .then(data => {
      renderShortcuts(data);
      setupSearch(data);
    });
});

function renderShortcuts(data, filter = '') {
  data.forEach(category => {
    const sectionId = getSectionId(category.category);
    const container = document.getElementById(sectionId + '-list');
    if (!container) return;
    container.innerHTML = '';
    category.shortcuts
      .filter(shortcut =>
        shortcut.keys.toLowerCase().includes(filter) ||
        shortcut.description.toLowerCase().includes(filter)
      )
      .forEach(shortcut => {
        const div = document.createElement('div');
        div.className = 'shortcut-item';
        div.innerHTML = `
          <div class="shortcut-keys">${shortcut.keys}</div>
          <div class="shortcut-desc">${shortcut.description}</div>
        `;
        container.appendChild(div);
      });
  });
}

function setupSearch(data) {
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.trim().toLowerCase();
    renderShortcuts(data, value);
  });
}

function getSectionId(categoryName) {
  if (categoryName.includes('기본 편집')) return 'basic-editing';
  if (categoryName.includes('탐색')) return 'navigation';
  return '';
} 