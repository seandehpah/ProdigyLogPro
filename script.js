// Main JavaScript for Prodigy Logistics (script.js)

document.addEventListener('DOMContentLoaded', function() {

    // 1. Initialize Feather Icons (for main page body content)
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Contact Form Submission (Real Email with Vercel API)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Show temporary loading text or disable button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";

            try {
                const response = await fetch('/api/sendmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Your message has been sent successfully!");
                    contactForm.reset();
                } else {
                    alert("Error sending message: " + result.error);
                }

            } catch (error) {
                alert("Network or server error. Please try again.");
            }

            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Inquiry";
        });
    }
});

// 4. Intersection Observer for Scroll Animations
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});
