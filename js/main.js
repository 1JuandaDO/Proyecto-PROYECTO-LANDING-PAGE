// Servicios
const services = {
    // Servicio de animaciones
    animations: {
        init() {
            this.observeElements();
            this.initParallax();
        },

        observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        },

        initParallax() {
            window.addEventListener('scroll', () => {
                const parallaxElements = document.querySelectorAll('.parallax');
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(window.pageYOffset * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    },

    // Servicio de navegación
    navigation: {
        init() {
            this.setupMobileMenu();
            this.setupSmoothScroll();
        },

        setupMobileMenu() {
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');
            const hamburgerBtn = document.querySelector('.hamburger-btn');

            if (menuToggle && hamburgerBtn) {
                menuToggle.addEventListener('change', () => {
                    nav.classList.toggle('active');
                    hamburgerBtn.classList.toggle('active');
                });
            }
        },

        setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    },

    // Servicio de galería
    gallery: {
        init() {
            this.setupImageHover();
            this.setupLightbox();
        },

        setupImageHover() {
            const bikeItems = document.querySelectorAll('.bike-item');
            bikeItems.forEach(item => {
                const primaryImg = item.querySelector('.primary-img');
                const secondaryImg = item.querySelector('.secondary-img');

                if (primaryImg && secondaryImg) {
                    item.addEventListener('mouseenter', () => {
                        primaryImg.style.opacity = '0';
                        secondaryImg.style.opacity = '1';
                    });

                    item.addEventListener('mouseleave', () => {
                        primaryImg.style.opacity = '1';
                        secondaryImg.style.opacity = '0';
                    });
                }
            });
        },

        setupLightbox() {
            const images = document.querySelectorAll('.bike-image img');
            images.forEach(img => {
                img.addEventListener('click', () => {
                    const lightbox = document.createElement('div');
                    lightbox.className = 'lightbox';
                    lightbox.innerHTML = `
                        <div class="lightbox-content">
                            <img src="${img.src}" alt="${img.alt}">
                            <button class="lightbox-close">&times;</button>
                        </div>
                    `;

                    document.body.appendChild(lightbox);
                    lightbox.classList.add('fade-in');

                    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                        lightbox.classList.remove('fade-in');
                        setTimeout(() => lightbox.remove(), 300);
                    });
                });
            });
        }
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los servicios
    Object.values(services).forEach(service => service.init());
}); 