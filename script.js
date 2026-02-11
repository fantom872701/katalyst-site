form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Sending...";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      statusEl.textContent = "Message sent! We'll contact you soon.";
      statusEl.style.color = "#22c55e";
      form.reset();
    } else {
      statusEl.textContent = "Error sending message.";
      statusEl.style.color = "#ef4444";
    }
  } catch (err) {
    statusEl.textContent = "Network error.";
    statusEl.style.color = "#ef4444";
  }
});