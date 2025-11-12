// --- THEME TOGGLE DYNAMIC LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
document.addEventListener('copy',function(event){
    event.clipboardData.setData('text/plain','❤');
    event.preventDefault();
});
function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
        body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
});

// --- SCROLL SPY & SMOOTH SCROLLING ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function initScrollSpy() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
            const sectionHeight = section.clientHeight;
            // Slightly adjust the threshold for when a section becomes 'active'
            if (scrollY >= sectionTop - sectionHeight / 4) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}


// --- SECTION FADE-IN ON SCROLL ANIMATION (No Slide) ---
function initScrollFadeIn() {
    const fadeElements = document.querySelectorAll('.section-fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}


// --- TYPEWRITER EFFECT ---
const typedTextSpan = document.getElementById('typed-text');
const phrases = ["Software Developer!", "AI/ML Model Developer!", "Creative Coder!"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 60;
const pauseTime = 1500;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex++);
    }

    let typeSpeed = typingSpeed;
    if (isDeleting) {
        typeSpeed = deletingSpeed;
    }

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
        typeSpeed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    initScrollSpy();
    initScrollFadeIn();
    type();
});
// --- IMAGE ZOOM MODAL ---
const profileImg = document.getElementById('profile-img');
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close-modal');

if (profileImg && imageModal && modalImg) {
    profileImg.addEventListener('click', () => {
        modalImg.src = profileImg.src;
        imageModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    // Close when clicking outside image
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
}

// Contact Form Submission with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevent default form submission
        
        // Add this debugging code to log form data
        const formData = new FormData(contactForm);
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        
        emailjs.sendForm('service_4yx8re6', 'template_lfvse6k', contactForm, 'r74OcD7Im6mSK8Hgz')
            .then((response) => {
                alert('Message sent successfully! Thank you.');
                contactForm.reset();  // Clear the form
            }, (error) => {
                alert('Failed to send message. Please try again later. Error: ' + error.text);
            });
    });
}

