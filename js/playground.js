document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('data/playground.json');
  const items = await res.json();
  const grid = document.getElementById('playground-grid');
  if (!grid) return;

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card playground-card fade-in';
    card.innerHTML = `
      <div class="card-image" style="background: ${item.color || 'var(--border)'}; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
        ${item.icon || ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="tag-list" style="margin-bottom: var(--spacing-md);">
          ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="card-links">
          ${item.liveUrl ? `<a href="${item.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Ver demo</a>` : ''}
          ${item.repoUrl ? `<a href="${item.repoUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Código</a>` : ''}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  initFadeIn();
});
