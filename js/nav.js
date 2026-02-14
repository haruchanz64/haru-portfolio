const burgerMenuToggle = document.getElementById("burger-menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

if (burgerMenuToggle && navLinks) {
  burgerMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    burgerMenuToggle.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-ellipsis-vertical"></i>';
  });
}

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      burgerMenuToggle.innerHTML = '<i class="fas fa-ellipsis-vertical"></i>';
    }
  });
});

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100; // Offset for fixed navbar
    const sectionId = section.getAttribute("id");
    const correspondingLink = document.querySelector(
      `.nav-link[href="#${sectionId}"]`
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinkItems.forEach((link) => link.classList.remove("active"));
      if (correspondingLink) {
        correspondingLink.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", highlightNavOnScroll);

highlightNavOnScroll();