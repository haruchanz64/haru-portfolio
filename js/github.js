const GITHUB_USERNAME = 'haruchanz64';
const PINNED_REPOS = [
  'UnityEventToolkit',
  'DebugCommandSystem',
  'ScriptableBatchTool',
  'SaveEncryptionToolkit'
];

const grid = document.getElementById('tools-grid');

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
  .then(res => res.json())
  .then(repos => {
    grid.innerHTML = '';

    const filtered = repos.filter(repo => PINNED_REPOS.includes(repo.name));

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="loading-text">No projects found.</p>';
      return;
    }

    // Preserve the order defined in PINNED_REPOS
    PINNED_REPOS.forEach(name => {
      const repo = filtered.find(r => r.name === name);
      if (!repo) return;

      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.className = 'project-card uniform';
      card.innerHTML = `
        <div class="project-info">
          <h3 class="project-title">${repo.name}</h3>
          <p class="project-description">${repo.description || 'No description provided.'}</p>
          <div class="project-meta">
            ${repo.language ? `<span class="role-tag">${repo.language}</span>` : ''}
            ${repo.stargazers_count > 0 ? `<span class="role-tag">⭐ ${repo.stargazers_count}</span>` : ''}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  })
  .catch(() => {
    grid.innerHTML = '<p class="loading-text">Failed to load projects. Please try again later.</p>';
  });