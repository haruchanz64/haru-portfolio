const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");

function updateToggleIcon() {
  if (body.classList.contains("light-theme")) {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.querySelectorAll(".github-card").forEach((card) => {
      card.src = card.src.replace("theme=dark", "theme=light");
    });
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    document.querySelectorAll(".github-card").forEach((card) => {
      card.src = card.src.replace("theme=light", "theme=dark");
    });
  }
}

// Apply initial theme
if (savedTheme) {
  body.classList.toggle("light-theme", savedTheme === "light");
} else {
  body.classList.toggle("light-theme", !prefersDarkScheme.matches);
}
updateToggleIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const theme = body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", theme);
    updateToggleIcon();
  });
}
