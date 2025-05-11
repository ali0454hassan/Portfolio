// These are additional JavaScript functions you can add to your existing code
// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursorBlob = document.querySelector('.cursor-blob');

        if (cursorBlob) {
            document.addEventListener('mousemove', (e) => {
                cursorBlob.style.left = e.clientX + 'px';
                cursorBlob.style.top = e.clientY + 'px';
            });
        }

// Scroll animations with GSAP
    gsap.registerPlugin(ScrollTrigger);

        // Animate section headings
        gsap.utils.toArray('section h2').forEach(heading => {
            gsap.from(heading, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: heading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Animate skill icons
        gsap.utils.toArray('.skill-icon').forEach((skill, i) => {
            gsap.from(skill, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: '#skills',
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Animate project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: '#projects',
                    start: "top 60%",
                    toggleActions: "play none none none"
                }
            });
        });

    // Show/hide back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('opacity-100');
            backToTop.classList.remove('opacity-0');
        } else {
            backToTop.classList.add('opacity-0');
            backToTop.classList.remove('opacity-100');
        }
        });
    }
});
// Section visibility animation
function animateSections() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Form submission handling
function setupContactForm() {
    const form = document.querySelector('#contact form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Form submission animation
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual submission)
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                form.reset();
                
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = originalText;
                }, 3000);
            }, 2000);
        });
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const isOpen = document.querySelector('[x-data]').__x.$data.isOpen;
                if (isOpen) {
                    document.querySelector('[x-data]').__x.$data.isOpen = false;
                }
            }
        });
    });
}

// Active navigation link highlighting
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-indigo-600', 'dark:text-indigo-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-indigo-600', 'dark:text-indigo-400');
            }
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSections();
    setupContactForm();
    setupSmoothScrolling();
    highlightActiveNavLink();
    
    // Type effect for hero section
    const text = document.querySelector('#home h1');
    if (text) {
        const textContent = text.innerHTML;
        text.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < textContent.length) {
                text.innerHTML += textContent.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Dark mode persistence
    const darkModeData = document.querySelector('[x-data]').__x.$data;
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (savedDarkMode) {
        darkModeData.darkMode = true;
        document.documentElement.classList.add('dark');
    }
    
    // Save dark mode preference
    const darkModeToggle = document.querySelector('[x-data] button');
    darkModeToggle.addEventListener('click', () => {
        localStorage.setItem('darkMode', darkModeData.darkMode);
    });
});
