document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  if (anchor.getAttribute("href") === "#") return;

  anchor.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior

    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });

      setTimeout(() => {
        const urlWithoutHash = window.location.href.split("#")[0];
        window.history.pushState(null, "", urlWithoutHash);
      }, 500); // Adjust this delay if needed
    }
  });
});