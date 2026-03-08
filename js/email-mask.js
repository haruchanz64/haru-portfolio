const user = "radam.aronjake";
const domain = "gmail.com";
const el = document.getElementById("email-link");
el.href = "mailto:" + user + "@" + domain;
document.getElementById("email-text").textContent = user + "@" + domain;
