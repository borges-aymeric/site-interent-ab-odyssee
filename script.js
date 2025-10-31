
        // Custom cursor effect (desktop only)
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');

        if (window.innerWidth > 1024) {
            // ensure native cursor is hidden (fallback) and custom cursors are visible
            try {
                document.documentElement.style.cursor = 'none';
                document.body.style.cursor = 'none';
            } catch(e) {}
            cursor.style.display = 'block';
            cursorDot.style.display = 'block'; 


            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;
            let dotX = 0;
            let dotY = 0;
            
            // Smooth cursor movement with lerp
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            // Store target/current scale for smooth growth
            let targetCursorScale = 1;
            let currentCursorScale = 1;
            let cursorBg = 'transparent';
            let cursorBorder = 'rgba(255, 255, 255, 0.5)';
            const scaleLerp = 0.12; // adjust for faster/slower smoothing (0.0 - 1.0)

            // Cursor hover effects (set target values, don't change instantly)
            const hoverElements = document.querySelectorAll('a, button, .service-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    targetCursorScale = 1.5;
                    cursorBg = 'rgba(47, 209, 112, 0.2)';
                    cursorBorder = 'rgba(47, 209, 112, 0.8)';
                });
                
                el.addEventListener('mouseleave', () => {
                    targetCursorScale = 1;
                    cursorBg = 'transparent';
                    cursorBorder = 'rgba(255, 255, 255, 0.5)';
                });
            });
            
            // Update cursor style & smooth scale in animation loop
            function animateCursor() {
                // lerp position
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                dotX += (mouseX - dotX) * 0.3;
                dotY += (mouseY - dotY) * 0.3;

                // lerp scale for smooth growth/shrink
                currentCursorScale += (targetCursorScale - currentCursorScale) * scaleLerp;
                
                cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px) scale(${currentCursorScale})`;
                cursor.style.backgroundColor = cursorBg;
                cursor.style.borderColor = cursorBorder;
                cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
                
                requestAnimationFrame(animateCursor);
            }
            
            animateCursor();
        }
        
        // Menu burger toggle
        const burgerMenu = document.querySelector('.burger-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Fermer le menu lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                burgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Smooth scroll vers la section
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
        
        // GSAP Animations
        document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    const heroTimeline = gsap.timeline();

    heroTimeline
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power3.out"
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: "power3.out"
        }, "-=1.5")
        .to('.hero-content .btn', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.3
        }, "-=1.2")
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1");

    // Services section animations
    const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    gsap.fromTo(card, 
        { 
            opacity: 0,
            y: 60,
            rotateZ: 0 // départ sans rotation
        },
        {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            duration: 1.2,
            ease: "power1.out",
            force3D: true,
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                end: 'top 25%',
                once: true
                // toggleActions: 'play reverse restart reverse'
            }
        }
    );
});


    // About section animations
    gsap.fromTo('.about-image', 
        { opacity: 0, x: -80 },
        {
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.about-image',
                start: 'top 90%',
                end: 'center 20%',
                // toggleActions: 'play reverse restart reverse'
            }
        }
    );

    gsap.fromTo('.about-text', 
        { opacity: 0, x: 80 },
        {
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 90%',
                end: 'center 20%',
                // toggleActions: 'play reverse restart reverse'
            }
        }
    );

    // Animation des statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const suffix = stat.textContent.includes('%') ? '%' : '+';

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 90%',
            onEnter: () => {
                gsap.to({value: 0}, {
                    value: finalValue, 
                    duration: 3,
                    ease: "power2.out",
                    onUpdate: function() {
                        stat.textContent = Math.ceil(this.targets()[0].value) + suffix;
                    }
                });
            },
            onLeaveBack: () => {
                stat.textContent = '0' + suffix;
            }
        });
    });

    // Contact section animations
    gsap.fromTo('.contact-info', 
        { opacity: 0, x: -60 },
        {
            opacity: 1,
            x: 0,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 90%',
                end: 'center 30%',
                // toggleActions: 'play reverse restart reverse'
            }
        }
    );

    gsap.fromTo('.contact-form', 
        { opacity: 0, x: 60 },
        {
            opacity: 1,
            x: 0,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 90%',
                end: 'center 10%',
                // toggleActions: 'play reverse restart reverse'
            }
        }
    );

    // Animation des titres de section
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: 'top 95%',
                    end: 'top 30%',
                    // toggleActions: 'play reverse restart reverse'
                }
            }
        );
    });

    // Services intro animation
    gsap.fromTo('.services-intro p',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.services-intro',
                start: 'top 90%',
                end: 'top 30%',
                // toggleActions: 'play reverse restart reverse'
            }
        }
    );
});

        
        // Form submission with animation
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animation du bouton
            const submitBtn = contactForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.style.opacity = '0.7';
            
            // Simulation d'envoi
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                submitBtn.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.opacity = '1';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
        
        // Parallax effect on scroll (optimisé via requestAnimationFrame)
        const heroBg = document.querySelector('.hero-bg');
        const aboutPattern = document.querySelector('.about-pattern');
        let lastScrollY = 0;
        let isTicking = false;

        function applyParallax(y) {
            if (heroBg) {
                heroBg.style.transform = `translateY(${y * 0.5}px)`;
            }
            if (aboutPattern) {
                aboutPattern.style.transform = `translateY(${y * 0.1}px)`;
            }
            isTicking = false;
        }

        window.addEventListener('scroll', () => {
            lastScrollY = window.pageYOffset || window.scrollY;
            if (!isTicking) {
                isTicking = true;
                requestAnimationFrame(() => applyParallax(lastScrollY));
            }
        }, { passive: true });

        // Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');
const scrollProgressFill = document.querySelector('.scroll-progress-fill');
const circumference = 2 * Math.PI * 27; // 27 est le rayon du cercle

scrollProgressFill.style.strokeDasharray = circumference;
scrollProgressFill.style.strokeDashoffset = circumference;

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollTop / docHeight;
    const drawLength = circumference * scrollPercent;
    
    scrollProgressFill.style.strokeDashoffset = circumference - drawLength;
    
    // Afficher l'indicateur après avoir scrollé un peu
    if (scrollTop > 100) {
        scrollProgress.classList.add('visible');
    } else {
        scrollProgress.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// Clic sur l'indicateur pour remonter en haut
scrollProgress.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});