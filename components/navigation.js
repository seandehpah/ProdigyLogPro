class CustomNavigation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.LOGO_SRC = "images/prodigy.png";
     }
    
    connectedCallback() {
        // Detect current page from URL pathname
        const path = window.location.pathname;
        
        if (path.includes('logistics.html') || 
            path.includes('procurement.html') || 
            path.includes('custom.html') ||
            path.includes('services.html')) {
            this.currentPage = 'services';
        } else if (path.includes('about.html')) {
            this.currentPage = 'about';
        } else if (path.includes('contact.html')) {
            this.currentPage = 'contact';
        } else {
            this.currentPage = 'home';
        }
      
        console.log('Current URL path:', path);
        console.log('Current page set to:', this.currentPage);

        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host { display: block; font-family: Arial, sans-serif; }

            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: white;
                padding: 1rem 2rem;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                position: fixed;            /* STATIONARY */
                top: 0;
                left: 0;
                width: 100%;
                box-sizing: border-box;
                z-index: 200;
            }

            .logo {
                margin-left: 10px; /* push logo right */
            }

            .logo img {
                height: 50px;
            }

            .menu {
                display: flex;
                gap: 1.5rem;
                margin-right: 100px; /* push menu left */
            }

            .menu-item { position: relative; cursor: pointer; }

            .menu-item a {
                text-decoration: none;
                color: #1E3A8A;
                font-weight: bold;
                padding-bottom: 3px;
                border-bottom: 2px solid transparent;
                transition: 0.2s;
            }

            .menu-item a:hover {
                color: #DC2626;
                border-bottom: 2px solid #DC2626;
            }

            .menu-item.active > a {
                border-bottom: 2px solid #DC2626;
                color: #DC2626;
            }

            /* Dropdown */
            .dropdown {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                background: white;
                flex-direction: column;
                min-width: 220px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }

            .dropdown a {
                padding: 0.5rem 1rem;
                color: #1E3A8A;
                font-weight: bold;
                transition: 0.2s;
            }

            .dropdown a:hover {
                background: #DC2626;
                color: white;
            }

            .menu-item.show .dropdown {
                display: flex;
            }

            /* Hamburger */
            .hamburger {
                display: none;
                flex-direction: column;
                cursor: pointer;
                gap: 5px;
                z-index: 300;
            }

            .hamburger div {
                width: 25px;
                height: 3px;
                background: #1E3A8A;
            }

            /* Mobile */
            @media (max-width: 768px) {
                nav {
                    position: relative;
                }
                .menu {
                    display: none;
                    flex-direction: column;
                    background: white;
                    position: absolute;
                    top: 100%;
                    right: -2.5rem;
                    width: 150px;
                    padding: 0.75rem;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                    z-index: 250;
                    max-height: calc(100vh - 64px);
                    overflow-y: auto;
                }

                .menu.show { display: flex; }

                .menu-item .dropdown {
                    position: static;
                    box-shadow: none;
                }

                .hamburger { display: flex; }
            }
        </style>

        <nav part="header">
            <div class="logo">
                <a href="index.html"><img src="${this.LOGO_SRC}" alt="Logo"></a>
            </div>

            <div class="menu">
                <div class="menu-item ${this.currentPage === 'home' ? 'active' : ''}">
                    <a href="index.html">Home</a>
                </div>

                <div class="menu-item ${this.currentPage === 'services' ? 'active' : ''}">
                    <a href="services.html">Services</a>
                    <div class="dropdown">
                        <a href="logistics.html">Logistics & Delivery</a>
                        <a href="procurement.html">Procurement Solutions</a>
                        <a href="custom.html">Custom Supply Chain Solutions</a>
                    </div>
                </div>

                <div class="menu-item ${this.currentPage === 'about' ? 'active' : ''}">
                    <a href="about.html">About</a>
                </div>

                <div class="menu-item ${this.currentPage === 'contact' ? 'active' : ''}">
                    <a href="contact.html">Contact</a>
                </div>
            </div>

            <div class="hamburger">
                <div></div><div></div><div></div>
            </div>
        </nav>
        `;
    }

    addEventListeners() {
        const menuItems = this.shadowRoot.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown');

            if (dropdown) {
                const link = item.querySelector('a');
                
                // Desktop hover
                item.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 768) item.classList.add('show');
                });
                item.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 768) item.classList.remove('show');
                });

                // Mobile click only - first tap opens dropdown, second tap navigates
                link.addEventListener('click', (e) => {
                    // Only handle clicks on mobile
                    if (window.innerWidth <= 768) {
                        if (!item.classList.contains('show')) {
                            e.preventDefault();
                            item.classList.add('show');
                        }
                        // If already showing, let the link navigate normally
                    }
                    // Desktop: don't prevent anything, link works as normal
                });
            }
        });

        // Mobile hamburger
        const hamburger = this.shadowRoot.querySelector('.hamburger');
        const menu = this.shadowRoot.querySelector('.menu');

        hamburger.addEventListener('click', () => menu.classList.toggle('show'));
    }
}

customElements.define('custom-navigation', CustomNavigation);