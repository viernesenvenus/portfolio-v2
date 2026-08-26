document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('data/projects.json');
  const projects = await res.json();

  if (window.location.pathname.includes('project-detail.html')) {
    renderDetail(projects);
  } else if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '') {
    renderFeatured(projects);
  } else {
    renderGrid(projects);
  }
});

function renderFeatured(projects) {
  const grid = document.getElementById('featured-projects');
  if (!grid) return;

  const featured = projects.filter(p => p.featured).slice(0, 3);
  renderProjects(grid, featured);
}

function renderGrid(projects) {
  const grid = document.getElementById('projects-grid');
  const filterBar = document.getElementById('filter-bar');
  if (!grid || !filterBar) return;

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-btn${cat === 'All' ? ' active' : ''}`;
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(grid, cat === 'All' ? projects : projects.filter(p => p.category === cat));
    });
    filterBar.appendChild(btn);
  });

  renderProjects(grid, projects);
}

function renderProjects(grid, projects) {
  grid.innerHTML = '';
  projects.forEach(project => {
    const card = document.createElement('a');
    card.href = `project-detail.html?id=${project.id}`;
    card.className = 'card fade-in';
    card.innerHTML = `
      <div class="card-image" style="background: ${project.color || 'var(--border)'}; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
        ${project.icon || ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.shortDescription}</p>
        <div class="tag-list">
          ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  initFadeIn();
}

function renderDetail(projects) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const project = projects.find(p => p.id === id);

  if (!project) {
    window.location.href = '404.html';
    return;
  }

  document.title = `${project.title} — Lucia Cruz`;
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-description').textContent = project.description;

  const meta = document.getElementById('project-meta');
  meta.innerHTML = `
    <div class="project-meta-item"><strong>Category:</strong> ${project.category}</div>
    <div class="project-meta-item"><strong>Year:</strong> ${project.year}</div>
    ${project.role ? `<div class="project-meta-item"><strong>Role:</strong> ${project.role}</div>` : ''}
  `;

  const links = document.getElementById('project-links');
  if (project.liveUrl) {
    links.innerHTML += `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">Ver live</a>`;
  }
  if (project.repoUrl) {
    links.innerHTML += `<a href="${project.repoUrl}" target="_blank" rel="noopener" class="btn btn-outline">Ver repo</a>`;
  }

  const gallery = document.getElementById('project-gallery');
  if (project.images) {
    project.images.forEach(img => {
      gallery.innerHTML += `<div style="width: 100%; aspect-ratio: 16/9; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--text-dim);">${img}</div>`;
    });
  }

  initFadeIn();
}

function renderDetail(projects) {
