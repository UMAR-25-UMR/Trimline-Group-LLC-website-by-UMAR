// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking a normal link (NOT dropdown toggles)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.classList.contains("dropdown-toggle")) {
            // Do nothing if it's a dropdown toggle
            return;
        }

        nav.classList.remove('active');
        if (mobileToggle) {
            const icon = mobileToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(elementPosition < screenPosition) {
            element.classList.add('appear');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(header) {
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Dropdown toggle
document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();

    const parent = this.parentElement;

    // Close other dropdowns
    document.querySelectorAll(".dropdown").forEach(drop => {
      if (drop !== parent) drop.classList.remove("active");
    });

    // Toggle current dropdown
    parent.classList.toggle("active");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(drop => {
      drop.classList.remove("active");
    });
  }
});
