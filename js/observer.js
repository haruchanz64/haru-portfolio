const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-item, .section-title')
  .forEach(el => { el.classList.add('reveal'); observer.observe(el); });