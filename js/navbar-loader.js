fetch(PATHS.navbar)
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("afterbegin", html);
    if (window.initThemeToggle) window.initThemeToggle();
    if (window.initNav) window.initNav();
  });