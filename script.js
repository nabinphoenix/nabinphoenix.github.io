// script.js

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__link');
const themeToggle = document.getElementById('theme-toggle');
const projectDetailBtns = document.querySelectorAll('.project-details-btn');
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const contactForm = document.getElementById('contact-form');
const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast');
const typedRole = document.getElementById('typed-role');

// Project details data
const projectDetails = {
    1: {
        title: "To-Do List CRUD API (FastAPI + MongoDB)",
        description: "Developed a secure RESTful API using FastAPI, MongoDB, and JWT authentication, enabling user registration, login, and role-based task management with full CRUD operations. Added auto-incremented task IDs, bcrypt-based password hashing, and Pydantic validation for a scalable, clean backend architecture.",
        problem: "Need for a secure and scalable task management system with proper authentication and authorization.",
        approach: "Implemented FastAPI with MongoDB for data persistence, JWT for authentication, and role-based access control.",
        results: "Created a fully functional REST API with user management, secure authentication, and CRUD operations for tasks.",
        tech: ["FastAPI", "MongoDB", "Python", "JWT", "Pydantic"]
    },
    2: {
        title: "Energy Consumption Forecasting (SARIMAX)",
        description: "Built a SARIMAX model with weather variables to forecast daily energy demand. Processed time series data with resampling, feature engineering, and validation.",
        problem: "Need to accurately forecast energy consumption to optimize resource allocation and reduce waste.",
        approach: "Applied SARIMAX modeling with weather variables as exogenous factors to improve forecast accuracy.",
        results: "Developed a reliable forecasting model that can predict daily energy demand with consideration of weather conditions.",
        tech: ["Python", "SARIMAX", "Time Series", "Statsmodels"]
    },
    3: {
        title: "CNN (Cat vs. Dog Classification)",
        description: "Built and trained a CNN in PyTorch with data augmentation for robust image classification. Implemented model checkpointing and loss/accuracy visualization to track performance.",
        problem: "Need for accurate image classification to distinguish between cats and dogs in images.",
        approach: "Designed and trained a convolutional neural network with data augmentation techniques to improve generalization.",
        results: "Achieved high accuracy in classifying cat and dog images, with visualization tools to monitor training progress.",
        tech: ["PyTorch", "CNN", "Computer Vision", "Data Augmentation"]
    },
    4: {
        title: "Test Management System",
        description: "Built a CLI-based Test Question Management System in Python with role-based access for Admins, Lecturers, and Students, featuring input validation primarily using string methods. Utilized the Python file system for persistent data storage and implemented modular functions to manage users, questions, and exam papers efficiently.",
        problem: "Need for a simple yet effective test management system with different user roles and permissions.",
        approach: "Developed a CLI application with role-based access control and file-based data persistence.",
        results: "Created a functional test management system that allows different user types to perform appropriate actions.",
        tech: ["Python", "CLI", "File System", "Role-based Access"]
    }
};

// Initialize the website
function init() {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize animations
    initAnimations();
    
    // Initialize typing effect if enabled
    if (typedRole && !shouldReduceMotion()) {
        initTypingEffect();
    }
}

// Initialize event listeners
function initEventListeners() {
    // Scroll event for header
    window.addEventListener('scroll', debounce(handleScroll, 10));
    
    // Nav toggle for mobile
    navToggle.addEventListener('click', toggleMobileNav);
    
    // Close mobile nav when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                closeMobileNav();
            }
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Project detail modals
    projectDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => openProjectModal(btn.dataset.project));
    });
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Copy to clipboard buttons
    copyButtons.forEach(btn => {
        btn.addEventListener('click', handleCopy);
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize animations
function initAnimations() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill__level');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const level = skillLevel.dataset.level;
                skillLevel.style.width = `${level}%`;
                skillObserver.unobserve(skillLevel);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        cardObserver.observe(card);
    });
}

// Initialize typing effect for role
function initTypingEffect() {
    const roles = ['ML Engineer', 'Backend Developer', 'Python Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting text
            typedRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typedRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if we've finished typing a role
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end of typing
            typingSpeed = 1000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next role after deleting
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect after a short delay
    setTimeout(type, 1000);
}

// Handle scroll events
function handleScroll() {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Toggle mobile navigation
function toggleMobileNav() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
    
    // Trap focus when nav is open
    if (!isExpanded) {
        trapFocus(navList);
    }
}

// Close mobile navigation
function closeMobileNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navList.classList.remove('active');
}

// Focus trap for mobile navigation
function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
    
    firstElement.focus();
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

// Update theme toggle icon
function updateThemeToggle(theme) {
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Open project modal
function openProjectModal(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <h3 class="modal__title">${project.title}</h3>
        <p class="modal__description">${project.description}</p>
        <div class="modal__details">
            <h4 class="modal__detail-title">Problem</h4>
            <p>${project.problem}</p>
            
            <h4 class="modal__detail-title">Approach</h4>
            <p>${project.approach}</p>
            
            <h4 class="modal__detail-title">Results</h4>
            <p>${project.results}</p>
            
            <h4 class="modal__detail-title">Technologies</h4>
            <div class="chips">
                ${project.tech.map(tech => `<span class="chip">${tech}</span>`).join('')}
            </div>
        </div>
        <div class="modal__actions">
            <a href="https://github.com/nabinphoenix" class="btn btn--primary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
    `;
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus trap for modal
    trapFocus(projectModal);
}

// Close modal
function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Return focus to the button that opened the modal
    const activeElement = document.activeElement;
    if (activeElement && activeElement.classList.contains('project-details-btn')) {
        activeElement.focus();
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate form
    if (validateForm(name, email, message)) {
        // Create mailto link as fallback
        const subject = `Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:nabinepali012@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Show success message
        showToast('Message sent successfully!');
        
        // Reset form
        contactForm.reset();
        
        // Open mail client (fallback)
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1000);
    }
}

// Validate form
function validateForm(name, email, message) {
    let isValid = true;
    
    // Reset errors
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';
    
    // Name validation
    if (!name.trim()) {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
    }
    
    // Email validation
    if (!email.trim()) {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Message validation
    if (!message.trim()) {
        document.getElementById('message-error').textContent = 'Message is required';
        isValid = false;
    }
    
    return isValid;
}

// Check if email is valid
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle copy to clipboard
function handleCopy(e) {
    e.preventDefault();
    const copyTarget = e.target.closest('.copy-target');
    const textToCopy = copyTarget.dataset.value;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy to clipboard');
    });
}

// Show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if user prefers reduced motion
function shouldReduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', init);