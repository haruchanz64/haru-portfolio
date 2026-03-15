const GITHUB_USERNAME = "haruchanz64";
const PINNED_REPOS = [
  "GDriveDesktop",
  "UnityEventToolkit",
  "DebugCommandSystem",
  "ScriptableBatchTool",
  "SaveEncryptionToolkit",
];

function waitForElement(id, timeout = 6000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        clearInterval(timer);
        resolve(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(timer);
        resolve(null);
      }
    }, 100);
  });
}

async function initGithubProjects() {
  const grid = await waitForElement("tools-grid");
  if (!grid) {
    console.warn("tools-grid element not found");
    return;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos = await res.json();

    const filtered = repos.filter((r) => PINNED_REPOS.includes(r.name));

    if (filtered.length === 0) {
      grid.innerHTML =
        '<p class="loading-text">No matching projects found.</p>';
      console.warn("No repos matched PINNED_REPOS:", PINNED_REPOS);
      return;
    }

    grid.innerHTML = "";

    PINNED_REPOS.forEach((name) => {
      const repo = filtered.find((r) => r.name === name);
      if (!repo) return;
      const card = document.createElement("a");
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "project-card uniform";
      card.innerHTML = `
        <div class="project-info">
          <h3 class="project-title">${repo.name}</h3>
          <p class="project-description">${repo.description || "No description"}</p>
          <div class="project-meta">
            <span class="project-language">${repo.language || "N/A"}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load GitHub projects:", err);
    grid.innerHTML = '<p class="loading-text">Failed to load projects.</p>';
  }
}

document.addEventListener("DOMContentLoaded", initGithubProjects);
