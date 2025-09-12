const projectTabButtons = document.querySelectorAll("#projects .tab-button");
const projectTabContents = document.querySelectorAll("#projects .tab-content");

projectTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");
    projectTabButtons.forEach((btn) => btn.classList.remove("active"));
    projectTabContents.forEach((content) =>
      content.classList.remove("active")
    );
    button.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});

// Skills Tabs
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
