// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const nav = document.querySelector('nav');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    nav.classList.toggle('dark-mode');
    nav.classList.toggle('light-mode');
    themeToggle.classList.toggle('light');
    
    const ball = themeToggle.querySelector('.theme-toggle-ball');
    if (body.classList.contains('light-mode')) {
        ball.textContent = '☀️';
    } else {
        ball.textContent = '🌙';
    }
});

// Smooth Scrolling
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

// Skills Animation on Scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.style.display = 'none';
    });

    if (nameInput.value.trim() === '') {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        contactForm.reset();
        
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    projectObserver.observe(card);
});

// About Section Animation
const aboutElements = document.querySelectorAll('.about-text, .about-image-section');
const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

aboutElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease';
    aboutObserver.observe(element);
});