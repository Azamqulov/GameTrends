/**
 * GAMELINGO - MAIN JAVASCRIPT
 * Custom animations and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const preloader = document.querySelector('.preloader');
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const languageTabs = document.querySelectorAll('.language-tab');
    const languageCards = document.querySelectorAll('.language-card');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const testimonialArrows = document.querySelectorAll('.testimonial-arrow');
    const contactForm = document.querySelector('#contactForm');
    const cookieConsent = document.querySelector('#cookieConsent');
    const cookieAccept = document.querySelector('#cookieAccept');
    const cookieReject = document.querySelector('#cookieReject');
    const cookieSettings = document.querySelector('#cookieSettings');
    const backToTop = document.querySelector('#backToTop');
    const counters = document.querySelectorAll('.counter');
    
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#7e57c2'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#7e57c2',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Start counter animation
        startCounters();
        
        // Show cookie consent if not accepted before
        if (!localStorage.getItem('cookieConsent')) {
          setTimeout(() => {
            cookieConsent.classList.add('show');
          }, 2000);
        }
      }, 1500);
    });
    
    // Counter animation
    function startCounters() {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let currentCount = 0;
        
        const updateCounter = () => {
          currentCount += increment;
          
          if (currentCount < target) {
            counter.textContent = Math.ceil(currentCount);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
      });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Show/hide back to top button
      if (window.scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
      
      // Animate elements on scroll
      animateOnScroll();
    });
    
    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
      });
      
      mobileMenuClose.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
      });
      
      // Close menu when clicking on a link
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          mobileMenu.classList.remove('show');
          document.body.classList.remove('no-scroll');
        });
      });
    }
    
    // Portfolio filter
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          
          // Add active class to clicked button
          btn.classList.add('active');
          
          const category = btn.getAttribute('data-filter');
          
          // Filter items
          portfolioItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 100);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.8)';
              setTimeout(() => {
                item.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }
    
    // Language tabs
    if (languageTabs.length > 0 && languageCards.length > 0) {
      languageTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs
          languageTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          const region = tab.getAttribute('data-region');
          
          // Filter cards
          languageCards.forEach(card => {
            if (region === 'all' || card.getAttribute('data-region') === region) {
              card.style.display = 'block';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 100);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }
    
    // Testimonials slider
    if (testimonialSlides.length > 0) {
      let currentTestimonial = 0;
      const totalTestimonials = testimonialSlides.length;
      const testimonialTrack = document.querySelector('.testimonials-track');
      
      // Create dots
      if (testimonialDots) {
        for (let i = 0; i < totalTestimonials; i++) {
          const dot = document.createElement('span');
          dot.classList.add('testimonial-dot');
          if (i === 0) dot.classList.add('active');
          dot.setAttribute('data-slide', i);
          testimonialDots.appendChild(dot);
        }
        
        // Add click event to dots
        document.querySelectorAll('.testimonial-dot').forEach(dot => {
          dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToTestimonial(slideIndex);
          });
        });
      }
      
      // Add click event to arrows
      if (testimonialArrows.length === 2) {
        // Previous arrow
        testimonialArrows[0].addEventListener('click', () => {
          if (currentTestimonial > 0) {
            goToTestimonial(currentTestimonial - 1);
          } else {
            goToTestimonial(totalTestimonials - 1);
          }
        });
        
        // Next arrow
        testimonialArrows[1].addEventListener('click', () => {
          if (currentTestimonial < totalTestimonials - 1) {
            goToTestimonial(currentTestimonial + 1);
          } else {
            goToTestimonial(0);
          }
        });
      }
      
      function goToTestimonial(index) {
        currentTestimonial = index;
        testimonialTrack.style.transform = `translateX(-${100 * currentTestimonial}%)`;
        
        // Update dots
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
          if (i === currentTestimonial) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      
      // Auto slide
      let testimonialInterval = setInterval(() => {
        if (currentTestimonial < totalTestimonials - 1) {
          goToTestimonial(currentTestimonial + 1);
        } else {
          goToTestimonial(0);
        }
      }, 5000);
      
      // Pause auto slide on hover
      testimonialTrack.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
      });
      
      testimonialTrack.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
          if (currentTestimonial < totalTestimonials - 1) {
            goToTestimonial(currentTestimonial + 1);
          } else {
            goToTestimonial(0);
          }
        }, 5000);
      });
    }
    
    // Contact form validation
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const formElements = contactForm.elements;
        
        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].hasAttribute('required') && !formElements[i].value) {
            isValid = false;
            formElements[i].classList.add('error');
          } else {
            formElements[i].classList.remove('error');
          }
        }
        
        if (isValid) {
          // Show success message (in a real application, you would submit the form)
          const successMessage = document.createElement('div');
          successMessage.className = 'form-success';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
          
          contactForm.reset();
          contactForm.appendChild(successMessage);
          
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }
      });
    }
    
    // Cookie consent
    if (cookieConsent && cookieAccept && cookieReject) {
      cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
      });
      
      cookieReject.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieConsent.classList.remove('show');
      });
      
      if (cookieSettings) {
        cookieSettings.addEventListener('click', () => {
          window.location.href = 'cerez-politikasi.html';
        });
      }
    }
    
    // Back to top button
    if (backToTop) {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll('.service-card, .language-card, .portfolio-item, .testimonial-card');
      
      elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
          el.classList.add('animate');
        }
      });
    }
    
    // Initialize animations
    animateOnScroll();
  
    // Gallery lightbox
    document.querySelectorAll(".gallery-zoom").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault()
  
        const imageUrl = item.getAttribute("href")
  
        // Create lightbox elements
        const lightbox = document.createElement("div")
        lightbox.className = "lightbox"
  
        const lightboxContent = document.createElement("div")
        lightboxContent.className = "lightbox-content"
  
        const lightboxClose = document.createElement("span")
        lightboxClose.className = "lightbox-close"
        lightboxClose.innerHTML = "&times;"
  
        const lightboxImage = document.createElement("img")
        lightboxImage.src = imageUrl
  
        // Append elements
        lightboxContent.appendChild(lightboxClose)
        lightboxContent.appendChild(lightboxImage)
        lightbox.appendChild(lightboxContent)
        document.body.appendChild(lightbox)
  
        // Show lightbox
        setTimeout(() => {
          lightbox.classList.add("show")
        }, 10)
  
        // Prevent scrolling
        document.body.style.overflow = "hidden"
  
        // Close lightbox
        lightboxClose.addEventListener("click", () => {
          lightbox.classList.remove("show")
          setTimeout(() => {
            document.body.removeChild(lightbox)
            document.body.style.overflow = ""
          }, 300)
        })
  
        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox) {
            lightbox.classList.remove("show")
            setTimeout(() => {
              document.body.removeChild(lightbox)
              document.body.style.overflow = ""
            }, 300)
          }
        })
      })
    })
  
    // Add CSS for lightbox
    const style = document.createElement("style")
    style.textContent = `
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      
      .lightbox.show {
        opacity: 1;
        visibility: visible;
      }
      
      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
      }
      
      .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 30px;
        color: #fff;
        cursor: pointer;
      }
      
      .lightbox img {
        max-width: 100%;
        max-height: 80vh;
        border: 5px solid #fff;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
      }
    `
    document.head.appendChild(style)
  });
  