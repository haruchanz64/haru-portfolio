const skillTabs = document.querySelectorAll("#skills .skill-tab");
const skillContents = document.querySelectorAll("#skills .tab-content");

skillTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const skillId = tab.getAttribute("data-skill");
    skillTabs.forEach((t) => t.classList.remove("active"));
    skillContents.forEach((content) => content.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(skillId).classList.add("active");
  });
});