const burgerMenuToggle = document.getElementById("burger-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (burgerMenuToggle && navLinks) {
  burgerMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    burgerMenuToggle.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}
