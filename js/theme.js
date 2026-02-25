const themeToggle = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");
const root = document.documentElement;

if (savedTheme) {
  root.classList.toggle("light-theme", savedTheme === "light");
} else {
  root.classList.toggle("light-theme", !prefersDarkScheme.matches);
}

function updateThemeUI() {
  const isLight = root.classList.contains("light-theme");

  if (themeToggle) {
    themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  }

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
    root.classList.toggle("light-theme");
    const currentTheme = root.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    updateThemeUI();
  });
}