import emailjs from "@emailjs/browser";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_NOTIFICATION = import.meta.env
  .VITE_EMAILJS_TEMPLATE_NOTIFICATION;
const TEMPLATE_AUTOREPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY;

export function sendEmail(e) {
  e.preventDefault();

  const btn = document.getElementById("submit-btn");
  const toast = document.getElementById("form-toast");
  const btnText = btn.querySelector(".btn-text");
  const spinner = btn.querySelector(".btn-spinner");

  btn.disabled = true;
  btnText.style.display = "none";
  spinner.style.display = "inline";
  toast.textContent = "";
  toast.className = "form-toast";

  const params = {
    user_name: document.getElementById("name").value.trim(),
    user_email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  Promise.all([
    emailjs.send(SERVICE_ID, TEMPLATE_NOTIFICATION, params),
    emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, params),
  ])
    .then(() => {
      toast.textContent = "Message sent! I'll get back to you soon.";
      toast.classList.add("success");
      document.getElementById("contact-form").reset();
    })
    .catch((err) => {
      console.error("Status:", err.status);
      console.error("Text:", err.text);
      toast.textContent = "✕ Something went wrong. Please try again.";
      toast.classList.add("error");
    })
    .finally(() => {
      btn.disabled = false;
      btnText.style.display = "inline";
      spinner.style.display = "none";
    });
}
