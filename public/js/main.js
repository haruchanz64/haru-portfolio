(async () => {
  // Load navbar early so it still appears even if other modules fail
  try {
    await import("./navbar-loader.js");
  } catch (err) {
    console.error("Failed to load navbar-loader:", err);
  }

  // Optional: contact form
  try {
    const { sendEmail } = await import("./contact.js");
    window.sendEmail = sendEmail;
  } catch (err) {
    console.error("Failed to load contact.js:", err);
  }

  // Load the rest without hard-failing the whole app
  const modules = [
    "./observer.js",
    "./url-hash-manager.js",
    "./blog-config.js",
    "./github.js",
    "./theme.js",
    "./nav.js",
    "./tabs.js",
  ];

  for (const mod of modules) {
    try {
      await import(mod);
    } catch (err) {
      console.error(`Failed to load ${mod}:`, err);
    }
  }
})();
