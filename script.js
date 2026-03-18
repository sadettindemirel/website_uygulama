// ===== DOM Elements =====
const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typingText');
const currentYear = document.getElementById('currentYear');

// ===== Current Year =====
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    
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

window.addEventListener('scroll', updateActiveNav);

// ===== Mobile Menu Toggle =====
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// ===== Typing Animation =====
const typingPhrases = [
    'Veri Gazeteciliği',
    'Metin Madenciliği',
    'Programlamalı Sosyal Bilimler',
    'Duygu Analizi',
    'Sosyal Ağ Analizi',
    'Hesaplamalı Gazetecilik',
    'Yapay Zeka & İletişim'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];
    
    if (isDeleting) {
        if (typingText) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        }
        charIndex--;
        typeSpeed = 40;
    } else {
        if (typingText) {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        }
        charIndex++;
        typeSpeed = 80;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of word
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing animation
if (typingText) {
    setTimeout(typeEffect, 1000);
}

// ===== Scroll Reveal Animation =====
function createScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
}

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', createScrollReveal);

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Stat Counter Animation =====
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = Math.max(1, Math.floor(finalValue / 30));
                const duration = 1500;
                const stepTime = duration / (finalValue / increment);
                
                target.textContent = '0';
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        target.textContent = currentValue;
                    }
                }, stepTime);
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
}

document.addEventListener('DOMContentLoaded', animateCounters);
