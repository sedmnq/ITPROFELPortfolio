// wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // initialize the application
    initApp();
});

// main initialization function
function initApp() {
    // initialize all features
    initNavigation();
    initScrollToTop();
    initSkillsAnimation();
    initContactForm();
    initSmoothScroll();
}

// navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    // change navbar styles on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ccroll to top button functionality
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top');
    
    // show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // scroll to top when button is clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// skills progress bar animation
function initSkillsAnimation() {
    const progressBars = document.querySelectorAll('#skills .progress');
    const skillsSection = document.getElementById('skills');
    
    // function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // function to animate progress bars
    function animateProgressBars() {
        if (isInViewport(skillsSection)) {
            progressBars.forEach(function(progress) {
                const percent = progress.getAttribute('data-percent');
                progress.style.width = percent + '%';
            });
            // remove the scroll event listener after animation
            window.removeEventListener('scroll', animateProgressBars);
        }
    }
    
    // initialize animation on page load
    animateProgressBars();
    
    // add scroll event listener for animation
    window.addEventListener('scroll', animateProgressBars);
}

// contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // het form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // hhere you would typically send the form data to a server
            // for this example, we'll just log it to the console
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // show success message (in a real application, you would check for successful submission)
            alert('Thank you for your message! I will get back to you soon.');
            
            // reset the form
            contactForm.reset();
        });
    }
}

// smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('#navbar a');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // scroll to the target section
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

// project filtering functionality (if needed in the future)
function initProjectFilters() {
    // this function can be implemented if you want to add filtering functionality
    // to your projects section in the future
}

// aimation for revealing sections when scrolling
function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    
    const revealSection = function() {
        sections.forEach(function(section) {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < window.innerHeight - 150) {
                section.classList.add('revealed');
            }
        });
    };
    
    // add scroll event listener for revealing sections
    window.addEventListener('scroll', revealSection);
    
    // reveal sections on page load
    revealSection();
}

// debounce function for performance optimization
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}