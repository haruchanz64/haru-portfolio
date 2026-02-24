const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.classList.toggle("light-theme", savedTheme === "light");
} else {
  body.classList.toggle("light-theme", !prefersDarkScheme.matches);
}

function updateThemeUI() {
  const isLight = body.classList.contains("light-theme");

  if (themeToggle) {
    themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  }

  // Guard for GitHub cards (prevents errors if none are present on the page)
  const cards = document.querySelectorAll(".github-card");
  if (cards.length > 0) {
    cards.forEach((card) => {
      card.src = isLight 
        ? card.src.replace("theme=dark", "theme=light") 
        : card.src.replace("theme=light", "theme=dark");
    });
  }
}

updateThemeUI();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const currentTheme = body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    updateThemeUI();
  });
}