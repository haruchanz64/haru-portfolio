document
  .querySelector('a[href="#projects"]')
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Smooth scroll to the #projects section
    document.getElementById("projects").scrollIntoView({
      behavior: "smooth",
    });

    // After the scroll, update the URL without the hash
    // We use setTimeout to allow the scroll animation to start before the URL changes
    setTimeout(() => {
      const urlWithoutHash = window.location.href.split("#")[0];
      window.history.pushState(null, "", urlWithoutHash);
    }, 500); // Adjust this delay if needed, depending on your scroll speed
  });

// Optional: If you want to remove the hash if the page is loaded directly with #projects
// This will run when the page first loads
window.addEventListener("DOMContentLoaded", (event) => {
  if (window.location.hash === "#projects") {
    const urlWithoutHash = window.location.href.split("#")[0];
    window.history.replaceState(null, "", urlWithoutHash);
  }
});
