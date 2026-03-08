const candidatePaths = [
  window.PATHS?.navbar,
  "./partials/navbar.html",
  "/partials/navbar.html",
].filter(Boolean);

async function loadNavbar() {
  // Prevent duplicate insert
  if (document.querySelector(".nav")) return;

  for (const path of candidatePaths) {
    try {
      const res = await fetch(path, { cache: "no-cache" });
      if (!res.ok) continue;

      const html = await res.text();
      document.body.insertAdjacentHTML("afterbegin", html);

      if (window.initThemeToggle) window.initThemeToggle();
      if (window.initNav) window.initNav();
      return;
    } catch {
      // try next path
    }
  }

  console.error("Navbar failed to load. Tried:", candidatePaths);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadNavbar);
} else {
  loadNavbar();
}
