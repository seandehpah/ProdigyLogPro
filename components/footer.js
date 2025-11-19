// components/footer.js

class CustomFooter extends HTMLElement {
    constructor() {
        super();
        this.HQ_ADDRESS_LINE1 = "2 Ibidun Oginni Close, off Otitoloju Street, Idimu, Lagos, Nigeria";
        this.PHONE = "+234 810 988 1237";
        this.EMAIL = "info@prodigyconsults.com.ng";

        this.WHATSAPP_NUMBER = "2348109881237";
        this.WHATSAPP_URL = `https://wa.me/${this.WHATSAPP_NUMBER}`;
        this.FACEBOOK_URL = "https://web.facebook.com/people/Theprodigylogistics/100069321536375/";
        this.INSTAGRAM_URL = "https://instagram.com/the_prodigylogistics";
        this.LINKEDIN_URL = "https://www.linkedin.com/company/107902737";

        this.CURRENT_YEAR = new Date().getFullYear();
        this.LOGO_SRC = "/images/prodigy.png";
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = this.template();
    }

    template() {
        return `
<style>
/* Custom Colors */
.prodigy-blue { background-color: #1E3A8A; }
.prodigy-red { color: #DC2626; }
.prodigy-orange { color: #F59E0B; }

/* Footer Styling */
.footer {
    background-color: var(--prodigyBlue, #1E3A8A);
    color: white;
    padding: 2rem 1.5rem 1rem;
}
.footer-container {
    max-width: 1200px;
    margin: 0 auto;
}

/* Top Section Grid */
.footer-top {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
@media (min-width: 768px) {
    .footer-top {
        grid-template-columns: 2fr 1fr 1fr 2fr;
        align-items: flex-start;
    }
}

/* Logo Section */
.footer-logo {
    display: flex;
    flex-direction: column;
    text-align: center;
}
@media (min-width: 768px) {
    .footer-logo { text-align: left; }
}
.logo-img {
    max-height: 80px;
    margin-bottom: 0.5rem;
    filter: brightness(0) invert(1); /* MAKE LOGO PURE WHITE */
}
.footer-summary {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
    line-height: 1.4;
}

/* Section Titles */
h4 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--prodigyRed, #DC2626);
    padding-bottom: 0.25rem;
}

/* FIXED COLUMN ALIGNMENT */
.nav-links,
.contact-info {
    padding-left: 0;
    margin-top: 0.25rem;
}
.nav-links li,
.contact-info li {
    list-style: none;
    margin-bottom: 0.65rem;
}

/* Nav Links */
.nav-links a {
    color: white;
    font-size: 0.9rem;
    opacity: 0.85;
    text-decoration: none;
    transition: opacity 0.2s, color 0.2s;
}
.nav-links a:hover {
    opacity: 1;
    color: var(--prodigyOrange, #F59E0B);
}
.contact-info a {
    color: white !important;
    text-decoration: none;
    opacity: 0.9;
    transition: opacity 0.2s;
}
.contact-info a:hover {
    opacity: 1;
    color: var(--prodigyOrange, #F59E0B);
}

/* Contact Icons */
.contact-info li {
    display: flex;
    align-items: flex-start;
    line-height: 1.3;
}
.contact-icon,
.whatsapp-contact-icon {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    margin-right: 0.75rem;
    flex-shrink: 0;
    stroke: white;
    fill: none;
    stroke-width: 1.5;
}

.contact-info li:nth-child(1) .contact-icon {
    fill: white;
    stroke: none;
}

.whatsapp-contact-icon {
    fill: white;
    stroke: none;
}

/* Social Links */
.social-links {
    margin-top: 1rem;
    display: flex;
    gap: 1.25rem;
}
.social-icon {
    width: 24px;
    height: 24px;
    fill: white;
    opacity: 0.85;
    transition: transform 0.2s, opacity 0.2s, fill 0.2s;
}
.social-links a:hover .social-icon {
    fill: var(--prodigyOrange, #F59E0B);
    opacity: 1;
    transform: scale(1.12);
}

/* Footer Bottom */
.footer-bottom {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.82rem;
    opacity: 0.75;
}
</style>

<footer class="footer">
<div class="footer-container">

    <div class="footer-top">

        <!-- Logo + Summary -->
        <div class="footer-logo">
             <a href="/"><img src="${this.LOGO_SRC}" class="logo-img" alt="Prodigy Logistics Logo" /></a>
            <p class="footer-summary">
                End-to-end logistics, supply chain, and procurement solutions for Nigerian businesses.
            </p>

            <!-- FIXED: Social Links using REAL SVG ICONS -->
            <div class="social-links">
                <a href="${this.FACEBOOK_URL}" target="_blank">
                    <svg class="social-icon" viewBox="0 0 24 24">
                        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12"></path>
                    </svg>
                </a>
                <a href="${this.INSTAGRAM_URL}" target="_blank">
                    <svg class="social-icon" viewBox="0 0 24 24">
                        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.3A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 1 12 14.8zm4.6-8.9a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z"></path>
                    </svg>
                </a>
                <a href="${this.LINKEDIN_URL}" target="_blank">
                    <svg class="social-icon" viewBox="0 0 24 24">
                        <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5zM2.5 8.1h5v13h-5v-13zm7.8 0h4.8v1.8h.1a5.2 5.2 0 0 1 4.7-2.6c5 0 5.9 3.3 5.9 7.5v6.3h-5v-5.6c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9v5.7h-5v-13z"></path>
                    </svg>
                </a>
            </div>
        </div>

        <!-- Quick Links -->
        <div>
            <h4>Quick Links</h4>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about/">About Us</a></li>
                <li><a href="/services/">Services Overview</a></li>
                <li><a href="/contact/">Contact Us</a></li>
            </ul>
        </div>

        <!-- Services -->
        <div>
            <h4>Services</h4>
            <ul class="nav-links">
                <li><a href="/procurement/">Procurement</a></li>
                <li><a href="/logistics/">Logistics</a></li>
                <li><a href="/custom/">Custom Solutions</a></li>
            </ul>
        </div>

        <!-- Contact Info -->
        <div>
            <h4>Get In Touch</h4>
            <ul class="contact-info">
                <li>
                    <svg class="contact-icon" viewBox="0 0 24 24">
                        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z"/>
                    </svg>
                    <span>${this.HQ_ADDRESS_LINE1}</span>
                </li>
                <li>
                    <svg class="contact-icon" viewBox="0 0 24 24">
                        <path d="M2 5c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5z" fill="none" stroke="white" stroke-width="1.5"/>
                        <path d="M4 5l8 6 8-6" stroke="white" stroke-width="1.5" fill="none"/>
                    </svg>
                    <a href="mailto:${this.EMAIL}">${this.EMAIL}</a>
                </li>
                <li>
                    <svg class="contact-icon" viewBox="0 0 24 24">
                        <path d="M6.6 10.8A15.1 15.1 0 0 0 13.2 17l2.1-2.1a1 1 0 0 1 1-.3 11.1 11.1 0 0 0 3.5.6 1 1 0 0 1 1 1v3.2a1 1 0 0 1-.9 1C9.6 21.7 2.3 14.4 2.3 5.1a1 1 0 0 1 1-1H6.5a1 1 0 0 1 1 1 10.6 10.6 0 0 0 .6 3.4 1 1 0 0 1-.2 1z"/>
                    </svg>
                    <a href="tel:${this.PHONE}">${this.PHONE}</a>
                </li>
                <li>
                    <svg class="whatsapp-contact-icon" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.34 4.88l-1.4 5.14 5.3-1.38c1.4-.76 2.97-1.16 4.67-1.16 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91z"/>
                    </svg>
                    <a href="${this.WHATSAPP_URL}" target="_blank">Chat on WhatsApp</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; ${this.CURRENT_YEAR} Prodigy Logistics & Procurement Services. All rights reserved.</p>
    </div>

</div>
</footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);