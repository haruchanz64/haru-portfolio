window.initThemeToggle = function () {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const root = document.documentElement;

  function applyTheme(isDark) {
    root.classList.toggle("light-theme", !isDark);
    document.querySelectorAll(".github-card").forEach((card) => {
      card.src = isDark
        ? card.src.replace("theme=light", "theme=dark")
        : card.src.replace("theme=dark", "theme=light");
    });
  }

  applyTheme(prefersDark.matches);

  prefersDark.addEventListener("change", (e) => applyTheme(e.matches));
};

document.addEventListener("DOMContentLoaded", window.initThemeToggle);