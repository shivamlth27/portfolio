// DOM Elements
const header = document.querySelector('header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const typingText = document.querySelector('.typing-text');
const contactForm = document.getElementById('contactForm');

// Typing effect for hero section
const typingEffect = () => {
    const words = ['Data Science Student', 'AI Enthusiast', 'Machine Learning Developer', 'Data Analyst', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    };

    type();
};

// Mobile menu toggle
const toggleMenu = () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
};

// Project filtering
const filterProjects = (category) => {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Scroll to section
const scrollToSection = (e) => {
    if (e.target.hasAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();

        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('open')) {
                toggleMenu();
            }

            // Update active link
            navLinksItems.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
        }
    }
};

// Update active nav link on scroll
const updateActiveLink = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Handle form submission
const handleFormSubmit = (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Validate form data
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // In a real application, you would send the form data to a server
    // For this example, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
};

// Event Listeners
window.addEventListener('load', () => {
    // Start typing effect
    typingEffect();

    // Set initial active link
    updateActiveLink();
});

window.addEventListener('scroll', () => {
    // Add shadow to header on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active link on scroll
    updateActiveLink();
});

menuBtn.addEventListener('click', toggleMenu);

navLinksItems.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        const category = btn.getAttribute('data-filter');
        filterProjects(category);
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Create a placeholder image for projects
const createPlaceholderImages = () => {
    const projectImgs = document.querySelectorAll('.project-img img');

    projectImgs.forEach(img => {
        if (img.getAttribute('src') === 'images/project-placeholder.jpg') {
            // Create a canvas element for the placeholder
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions
            canvas.width = 600;
            canvas.height = 400;

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#2563eb');
            gradient.addColorStop(1, '#1e40af');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add some shapes for visual interest
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            for (let i = 0; i < 5; i++) {
                const size = Math.random() * 100 + 50;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Add project title
            ctx.fillStyle = 'white';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(img.alt || 'Project Image', canvas.width / 2, canvas.height / 2);

            // Set the canvas as the image source
            img.src = canvas.toDataURL();
        }
    });
};

// Call the function to create placeholder images
createPlaceholderImages(); 