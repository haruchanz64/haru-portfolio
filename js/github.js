const grid = document.getElementById("tools-grid");

fetch("/repos.json")
  .then((res) => res.json())
  .then((repos) => {
    grid.innerHTML = "";

    if (repos.length === 0) {
      grid.innerHTML = '<p class="loading-text">No projects found.</p>';
      return;
    }

    repos.forEach((repo) => {
      const card = document.createElement("a");
      card.href = repo.html_url;
      card.target = "_blank";
      card.className = "project-card uniform";
      card.innerHTML = `
        <div class="project-info">
          <h3 class="project-title">${repo.name}</h3>
          <p class="project-description">${repo.description || "No description provided."}</p>
          <div class="project-meta">
            ${repo.language ? `<span class="role-tag">${repo.language}</span>` : ""}
            ${repo.stargazers_count > 0 ? `<span class="role-tag">⭐ ${repo.stargazers_count}</span>` : ""}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  })
  .catch(() => {
    grid.innerHTML =
      '<p class="loading-text">Failed to load projects. Please try again later.</p>';
  });