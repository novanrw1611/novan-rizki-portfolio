// Contact Form Handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form")
  const submitBtn = document.getElementById("submit-btn")
  const formReply = document.getElementById("form-reply")
  const formError = document.getElementById("form-error")

  // EmailJS Configuration
  const EMAIL_SERVICE_ID = "service_gv66pvh"
  const EMAIL_TEMPLATE_ID = "template_h71kq34"
  const EMAIL_PUBLIC_KEY = "QKGO0DSQVBmzZUYiO"

  // Initialize EmailJS
  const emailjs = window.emailjs // Declare the emailjs variable
  emailjs.init(EMAIL_PUBLIC_KEY)

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Show loading state
    submitBtn.disabled = true
    submitBtn.innerHTML = `
      <span class="btn-caption">Sending...</span>
      <i class="ph-bold ph-spinner"></i>
    `

    // Hide previous messages
    formReply.style.display = "none"
    formError.style.display = "none"

    // Get form data
    const formData = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      to_email: "novanrizki1234@gmail.com",
    }

    // Debug: Log form data
    console.log("Form data:", formData)
    console.log("Service ID:", EMAIL_SERVICE_ID)
    console.log("Template ID:", EMAIL_TEMPLATE_ID)

    // Send email using EmailJS - PERBAIKAN UTAMA DI SINI
    emailjs
      .sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, "#contact-form")
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text)
          // Show success message
          formReply.style.display = "block"
          // Reset form
          form.reset()
          // Hide success message after 5 seconds
          setTimeout(() => {
            formReply.style.display = "none"
          }, 5000)
        },
        (error) => {
          console.error("FAILED...", error)
          // Show error message
          formError.style.display = "block"
          // Hide error message after 5 seconds
          setTimeout(() => {
            formError.style.display = "none"
          }, 5000)
        },
      )
      .finally(() => {
        // Reset button state
        submitBtn.disabled = false
        submitBtn.innerHTML = `
          <span class="btn-caption">Send Message</span>
          <i class="ph-bold ph-paper-plane-tilt"></i>
        `
      })
  })
})
