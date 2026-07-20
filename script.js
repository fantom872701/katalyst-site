// =========================
// Server Status Checker
// =========================

const statusDot = document.querySelector(".status-dot");
const statusText = document.querySelector(".status-text");

// Replace with your actual Render backend URL
const HEALTH_URL = "https://katalyst-it.onrender.com/health";

async function checkServerStatus() {
  try {
    const response = await fetch(HEALTH_URL, { cache: "no-store" });

    if (response.ok) {
      statusDot.style.background = "#4ade80"; // green
      statusText.textContent = "Online";
    } else {
      statusDot.style.background = "#f87171"; // red
      statusText.textContent = "Offline";
    }
  } catch (error) {
    statusDot.style.background = "#f87171"; // red
    statusText.textContent = "Offline";
  }
}

// Run immediately
checkServerStatus();

// Re-check every 30 seconds
setInterval(checkServerStatus, 30000);


// =========================
// Mobile Navigation Toggle
// =========================

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});


// =========================
// Contact Form Submission
// =========================

const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  formStatus.textContent = "Sending...";

  const formData = {
    name: form.name.value,
    email: form.email.value,
    company: form.company.value,
    message: form.message.value,
  };

  try {
    const res = await fetch("https://katalyst-it.onrender.com/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      formStatus.textContent = "Thank you! We will contact you shortly.";
      form.reset();
    } else {
      formStatus.textContent = "Something went wrong. Please try again.";
    }
  } catch (err) {
    formStatus.textContent = "Server unreachable. Try again later.";
  }
});


// =========================
// Footer Year
// =========================

document.getElementById("year").textContent = new Date().getFullYear();
