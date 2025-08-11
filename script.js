// Wedding Invitation JavaScript

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global Variables
// let currentTheme = 'light'; // Removed theme toggle
let musicPlaying = false;
let currentGalleryIndex = 0;
let galleryImages = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    // Start vignette flash effect immediately
    setTimeout(() => {
        startVignetteFlashEffect();
    }, 300); // Quick start

    // Initialize all components
    initializeAnimations();
    initializeCherryBlossoms();
    initializeNavigation();
    initializeCountdown();
    initializeGallery();
    initializeEventCards();
    initializeForms();
    initializeShareButtons();
    initializeMusicControl();
    // initializeThemeToggle(); // Removed theme toggle
    initializeScrollAnimations();
    initializeParallax();

    
    // Set up event listeners
    setupEventListeners();
}

// Cinematic Vignette Flash TV Effect
function startVignetteFlashEffect() {
    const vignetteOverlay = document.getElementById('vignette-overlay');
    const vignetteLayer = document.getElementById('vignette-layer');
    const flashLayer = document.getElementById('flash-layer');
    const hero = document.getElementById('hero');
    
    // Create authentic TV turn-on effect
    const masterTL = gsap.timeline({
        onComplete: () => {
            vignetteOverlay.style.display = 'none';
        }
    });
    
    // Stage 1: Initial dark state (TV off)
    masterTL.fromTo(vignetteLayer, {
        opacity: 1,
        scale: 1.1,
        filter: 'contrast(1.2)'
    }, {
        opacity: 0.9,
        scale: 1.05,
        filter: 'contrast(1.1)',
        duration: 0.3,
        ease: 'power1.out'
    })
    
    // Stage 2: TV warming up
    .to(vignetteLayer, {
        opacity: 0.7,
        scale: 1.02,
        filter: 'contrast(1)',
        duration: 0.4,
        ease: 'power2.out'
    })
    
    // Stage 3: Bright flash (TV tube flash)
    .to(flashLayer, {
        opacity: 0.9,
        scale: 1.1,
        duration: 0.08,
        ease: 'power2.in'
    }, '-=0.1')
    .to(flashLayer, {
        opacity: 0.3,
        scale: 1.05,
        duration: 0.15,
        ease: 'power1.out'
    })
    .to(flashLayer, {
        opacity: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out'
    })
    
    // Stage 4: Vignette dissolve
    .to(vignetteLayer, {
        opacity: 0,
        scale: 0.98,
        filter: 'contrast(0.9)',
        duration: 1,
        ease: 'power3.out'
    }, '-=0.3')
    
    // Stage 5: Content elegant reveal
    .fromTo(hero, {
        opacity: 0,
        scale: 0.96,
        filter: 'brightness(0.8)'
    }, {
        opacity: 1,
        scale: 1,
        filter: 'brightness(1)',
        duration: 1.5,
        ease: 'power3.out'
    }, '-=0.8');
    
    // Initialize subtle breathing after reveal
    masterTL.add(() => {
        startBreathingAnimation();
    }, '-=0.3');
}





// Very Subtle Breathing Animation
function startBreathingAnimation() {
    gsap.to('.flower-bloom', {
        scale: 1.01,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
    });
    
    gsap.to('#open-invitation', {
        y: -1,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
}





// Initialize Optimized Animations
function initializeAnimations() {
    // Check if device can handle animations well
    const isLowEndDevice = navigator.hardwareConcurrency < 4 || window.innerWidth < 768;
    const animationMultiplier = isLowEndDevice ? 0.5 : 1;

    // Navbar visibility is handled in initializeNavigation to avoid conflicts

    // Enhanced Card Animations with Scroll Direction
    const allCards = gsap.utils.toArray('.glass-card, .event-card, .countdown-number, .timeline-item, .bg-white, .card-3d-inner');
    
    allCards.forEach((card, index) => {
        // Subtle entrance animation
        gsap.fromTo(card, {
            opacity: 0,
            y: 30,
            scale: 0.98
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6 * animationMultiplier,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 15%',
                toggleActions: 'play none none reverse',
                onEnter: () => {
                    // Gentle highlight on enter
                    gsap.to(card, {
                        boxShadow: '0 8px 25px rgba(232, 180, 184, 0.15)',
                        duration: 0.3
                    });
                },
                onLeave: () => {
                    // Subtle fade on leave (scrolling down)
                    gsap.to(card, {
                        opacity: 0.95,
                        y: -10,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                },
                onEnterBack: () => {
                    // Return to normal when scrolling back up
                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        boxShadow: '0 8px 25px rgba(232, 180, 184, 0.15)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                },
                onLeaveBack: () => {
                    // Gentle exit when scrolling up past element
                    gsap.to(card, {
                        opacity: 0.9,
                        y: 15,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            }
        });
    });

    // Optimized section text animations
    ScrollTrigger.batch('section h2, section h3, section p', {
        onEnter: (elements) => {
            gsap.fromTo(elements, {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6 * animationMultiplier,
                ease: 'power2.out',
                stagger: 0.05
            });
        },
        start: 'top 80%'
    });

    // Timeline items (simplified)
    const timelineItems = gsap.utils.toArray('.timeline-item');
    if (timelineItems.length > 0) {
        ScrollTrigger.batch(timelineItems, {
            onEnter: (elements) => {
                elements.forEach((item, index) => {
                    const isEven = index % 2 === 0;
                    gsap.fromTo(item, {
                        opacity: 0,
                        x: isEven ? -50 : 50
                    }, {
                        opacity: 1,
                        x: 0,
                        duration: 0.8 * animationMultiplier,
                        ease: 'power2.out'
                    });
                });
            },
            start: 'top 80%'
        });
    }

    // 3D Gallery Cards Animation
    const gallery3DCards = gsap.utils.toArray('.gallery-card-3d');
    if (gallery3DCards.length > 0) {
        ScrollTrigger.batch(gallery3DCards, {
            onEnter: (elements) => {
                // Add animate-in class for CSS transitions
                elements.forEach(el => el.classList.add('animate-in'));
                
                // GSAP animation with unique stagger pattern
                gsap.fromTo(elements, {
                    opacity: 0,
                    y: 80,
                    scale: 0.8,
                    rotationY: -45
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationY: 0,
                    duration: 1.2 * animationMultiplier,
                    ease: 'power3.out',
                    stagger: {
                        amount: 0.6,
                        from: "start"
                    }
                });
                
                // No floating animation - keep cards stable for better 3D interaction
            },
            start: 'top 80%'
        });
    }

    // Event cards and countdown (combined)
    ScrollTrigger.batch('.event-card, .countdown-number', {
        onEnter: (elements) => {
            gsap.fromTo(elements, {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6 * animationMultiplier,
                ease: 'power2.out',
                stagger: 0.1
            });
        },
        start: 'top 80%'
    });

    // Enhanced Form Cards Animation
    const formCards = gsap.utils.toArray('#rsvp-form, #wishes-form, #amplop .bg-white');
    formCards.forEach((form, index) => {
        gsap.fromTo(form, {
                opacity: 0,
            y: 40,
            scale: 0.95
            }, {
                opacity: 1,
                y: 0,
            scale: 1,
            duration: 0.8 * animationMultiplier,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: form,
                start: 'top 85%',
                end: 'top 10%',
                toggleActions: 'play none none reverse',
                onEnter: () => {
                    // Subtle glow effect
                    gsap.to(form, {
                        boxShadow: '0 15px 35px rgba(232, 180, 184, 0.2)',
                        duration: 0.3
            });
        },
                onLeave: () => {
                    // Gentle shrink when leaving viewport
                    gsap.to(form, {
                        scale: 0.98,
                        opacity: 0.9,
                        duration: 0.3
                    });
                },
                onEnterBack: () => {
                    // Return to full prominence
                    gsap.to(form, {
                        scale: 1,
                        opacity: 1,
                        boxShadow: '0 15px 35px rgba(232, 180, 184, 0.2)',
                        duration: 0.3
                    });
                },
                onLeaveBack: () => {
                    // Subtle fade when scrolling up past
                    gsap.to(form, {
                        opacity: 0.95,
                        y: 10,
                        duration: 0.3
                    });
                }
            }
        });
    });

    // Enhanced Section Dividers Animation
    const sectionDividers = gsap.utils.toArray('.section-divider');
    sectionDividers.forEach((divider, index) => {
                const ornament = divider.querySelector('.divider-ornament');
                const floats = divider.querySelectorAll('.divider-float');
                
        // Ornament animation with scroll direction awareness
                if (ornament) {
                    gsap.fromTo(ornament, {
                        opacity: 0,
                        scale: 0.7,
                        y: 20
                    }, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8 * animationMultiplier,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: ornament,
                    start: 'top 90%',
                    end: 'top 10%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => {
                        // Gentle pulse on enter
                        gsap.to(ornament, {
                            scale: 1.05,
                            duration: 0.2,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power2.out'
                        });
                    },
                    onLeave: () => {
                        // Subtle fade and shrink
                        gsap.to(ornament, {
                            opacity: 0.8,
                            scale: 0.95,
                            duration: 0.3
                        });
                    },
                    onEnterBack: () => {
                        // Return to normal with gentle emphasis
                        gsap.to(ornament, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.3
                        });
                    }
                }
            });
        }
        
        // Floating elements with independent triggers
                if (floats.length > 0) {
            floats.forEach((float, floatIndex) => {
                gsap.fromTo(float, {
                        opacity: 0,
                        scale: 0
                    }, {
                    opacity: 0.4,
                        scale: 1,
                        duration: 0.6 * animationMultiplier,
                        ease: 'power2.out',
                    delay: floatIndex * 0.1,
                    scrollTrigger: {
                        trigger: float,
                        start: 'top 85%',
                        end: 'top 15%',
                        toggleActions: 'play none none reverse',
                        onLeave: () => {
                            gsap.to(float, {
                                opacity: 0.2,
                                scale: 0.9,
                                duration: 0.3
                            });
                        },
                        onEnterBack: () => {
                            gsap.to(float, {
                                opacity: 0.4,
                                scale: 1,
                                duration: 0.3
                            });
                        }
                    }
                });
            });
        }
    });

    // Enhanced Thanks Section Animation
    ScrollTrigger.create({
        trigger: '#thanks',
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
            gsap.fromTo('.thanks-content', {
                opacity: 0,
                y: 40,
                scale: 0.95
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1 * animationMultiplier,
                ease: 'power2.out'
            });
        },
        onLeave: () => {
            gsap.to('.thanks-content', {
                opacity: 0.9,
                scale: 0.98,
                duration: 0.4
            });
        },
        onEnterBack: () => {
            gsap.to('.thanks-content', {
                opacity: 1,
                scale: 1,
                duration: 0.4
            });
        }
    });

    // Share Buttons Animation
    const shareButtons = gsap.utils.toArray('.share-btn');
    if (shareButtons.length > 0) {
        ScrollTrigger.batch(shareButtons, {
            onEnter: (elements) => {
                gsap.fromTo(elements, {
                    opacity: 0,
                    y: 20,
                    scale: 0.9
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5 * animationMultiplier,
                    ease: 'back.out(1.7)',
                    stagger: 0.1
                });
            },
            start: 'top 85%'
        });
    }

    // Navigation Links Scroll Awareness (subtle effects)
    const navLinks = gsap.utils.toArray('.nav-link');
    navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                gsap.to(link, {
                    y: -2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                gsap.to(link, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Initialize Enhanced Responsive Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    let isMobileMenuOpen = false;

    // Hide navbar initially on hero section
    if (navbar) {
        navbar.classList.add('nav-hidden');
        
        // Show/Hide navbar based on scroll position
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;
            
            if (scrollTop > heroHeight - 100) {
                navbar.classList.remove('nav-hidden');
                navbar.classList.add('nav-visible', 'show');
            } else {
                navbar.classList.add('nav-hidden');
                navbar.classList.remove('nav-visible', 'show');
            }
        });
    }
    
    // Mobile menu toggle functionality
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMobileMenuOpen && !mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mobileMenu.style.pointerEvents = 'auto';
        gsap.to(mobileMenu, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Change hamburger to X
        mobileMenuToggle.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
    }
    
    function closeMobileMenu() {
        isMobileMenuOpen = false;
        gsap.to(mobileMenu, {
            y: '-100%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                mobileMenu.style.pointerEvents = 'none';
            }
        });
        
        // Change X back to hamburger
        mobileMenuToggle.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;
    }
    
    // Enhanced navigation link handling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
                
                // Calculate offset based on screen size
                const isMobile = window.innerWidth < 768;
                const offset = isMobile ? 60 : 80;
                
                // Smooth scroll to target
                gsap.to(window, {
                    scrollTo: {
                        y: targetElement,
                        offsetY: offset
                    },
                    duration: isMobile ? 0.8 : 1,
                    ease: 'power2.inOut'
                });
                
                // Update active nav
                navLinks.forEach(nl => nl.classList.remove('active'));
                this.classList.add('active');
            }
        });
        
        // Add touch feedback for mobile
        if ('ontouchstart' in window) {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });

    // Enhanced open invitation button
    const openInvitationBtn = document.getElementById('open-invitation');
    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', function() {
            const isMobile = window.innerWidth < 768;
            
            // Show navbar when clicking open invitation
            if (navbar) {
                navbar.classList.remove('nav-hidden');
                navbar.classList.add('nav-visible', 'show');
            }
            
            // Ensure audio can start on user gesture
            const bg = document.getElementById('background-music');
            if (bg) {
                bg.play().then(() => {
                    musicPlaying = true;
                    const musicIcon = document.getElementById('music-icon');
                    const musicControl = document.getElementById('music-control');
                    if (musicIcon) musicIcon.className = 'fas fa-pause text-rose-gold';
                    if (musicControl) musicControl.classList.add('playing');
                    
                    // Show music alert
                    if (window.showMusicAlert) {
                        window.showMusicAlert(true);
                    }
                }).catch(() => {
                    // Ignore; user can press music button
                });
            }
            
            gsap.to(window, {
                scrollTo: {
                    y: '#story',
                    offsetY: isMobile ? 60 : 80
                },
                duration: isMobile ? 1 : 1.5,
                ease: 'power2.inOut'
            });
            
            // Start background music
            if (!musicPlaying) {
                toggleMusic();
            }
        });
        
        // Add touch feedback
        if ('ontouchstart' in window) {
            openInvitationBtn.addEventListener('touchstart', function() {
                gsap.to(this, { scale: 0.95, duration: 0.1 });
            });
            
            openInvitationBtn.addEventListener('touchend', function() {
                gsap.to(this, { scale: 1, duration: 0.1 });
            });
        }
    }
}

// Initialize Countdown Timer
function initializeCountdown() {
    const weddingDate = new Date('2024-12-25T08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update display with animation
            updateCountdownNumber('days', days);
            updateCountdownNumber('hours', hours);
            updateCountdownNumber('minutes', minutes);
            updateCountdownNumber('seconds', seconds);
        } else {
            // Wedding day has arrived - just hide countdown
            document.getElementById('countdown').style.display = 'none';
        }
    }
    
    function updateCountdownNumber(id, value) {
        const element = document.getElementById(id);
        const currentValue = element.textContent;
        const newValue = value.toString().padStart(2, '0');
        
        if (currentValue !== newValue) {
            element.parentElement.classList.add('pulse');
            setTimeout(() => {
                element.textContent = newValue;
                element.parentElement.classList.remove('pulse');
            }, 250);
        }
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize 3D Event Cards
function initializeEventCards() {
    const eventCards = document.querySelectorAll('.event-card-3d');
    
    eventCards.forEach((card, cardIndex) => {
        const cardInner = card.querySelector('.event-card-inner');
        const flipBtn = card.querySelector('.event-flip-btn');
        const flipBackBtn = card.querySelector('.event-flip-back-btn');
        let isFlipped = false;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentRotationY = 0;
        
        // Initialize card rotation
        gsap.set(cardInner, { rotationY: 0 });
        
        // Button click events
        if (flipBtn) {
            flipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                flipToMap();
            });
        }
        
        if (flipBackBtn) {
            flipBackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                flipToInfo();
            });
        }
        
        // Mouse Events for Desktop
        card.addEventListener('mousedown', (e) => {
            // Don't interfere with button clicks
            if (e.target.closest('button') || e.target.closest('a') || e.target.closest('iframe')) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            card.style.cursor = 'grabbing';
            card.classList.add('dragging');
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            // Determine if it's a horizontal or vertical drag
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                // Horizontal drag - rotate card
                const rotationY = currentRotationY + (deltaX * 0.5);
                gsap.set(cardInner, { rotationY: rotationY });
            }
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            card.style.cursor = 'grab';
            card.classList.remove('dragging');
            
            const deltaX = e.clientX - startX;
            
            // Mark as interacted for indicator fade
            if (Math.abs(deltaX) > 10) {
                card.classList.add('interacted');
            }
            
            // Determine final position based on drag distance
            if (Math.abs(deltaX) > 50) {
                // Significant drag - flip card
                if (deltaX > 0 && !isFlipped) {
                    flipToMap();
                } else if (deltaX < 0 && isFlipped) {
                    flipToInfo();
                }
            } else {
                // Small drag - return to current state
                currentRotationY = isFlipped ? 180 : 0;
                gsap.to(cardInner, {
                    rotationY: currentRotationY,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
        
        // Touch Events for Mobile
        card.addEventListener('touchstart', (e) => {
            // Don't interfere with button clicks
            if (e.target.closest('button') || e.target.closest('a') || e.target.closest('iframe')) return;
            
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            card.classList.add('dragging');
            // Don't prevent default here to allow scroll detection
        });
        
        card.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            // More responsive horizontal swipe detection
            const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 20;
            const isVerticalScroll = Math.abs(deltaY) > Math.abs(deltaX) * 2 && Math.abs(deltaY) > 25;
            
            if (isHorizontalSwipe && !isVerticalScroll) {
                const rotationY = currentRotationY + (deltaX * 0.4);
                gsap.set(cardInner, { rotationY: rotationY });
                e.preventDefault(); // Prevent scrolling only for horizontal swipes
            } else if (isVerticalScroll) {
                // Allow vertical scrolling, stop card interaction
                isDragging = false;
                card.classList.remove('dragging');
                // Reset card position
                gsap.to(cardInner, {
                    rotationY: currentRotationY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            card.classList.remove('dragging');
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            // Only process horizontal swipes for card flip
            const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
            
            // Mark as interacted for indicator fade
            if (Math.abs(deltaX) > 20 && isHorizontalSwipe) {
                card.classList.add('interacted');
            }
            
            // Determine final position based on swipe distance (more responsive threshold)
            if (Math.abs(deltaX) > 40 && isHorizontalSwipe) {
                // Significant horizontal swipe - flip card
                if (deltaX > 0 && !isFlipped) {
                    flipToMap();
                } else if (deltaX < 0 && isFlipped) {
                    flipToInfo();
                }
            } else {
                // Small swipe or vertical movement - return to current state
                currentRotationY = isFlipped ? 180 : 0;
                gsap.to(cardInner, {
                    rotationY: currentRotationY,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
        
        // Flip functions
        function flipToMap() {
            isFlipped = true;
            currentRotationY = 180;
            gsap.to(cardInner, {
                rotationY: 180,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
        
        function flipToInfo() {
            isFlipped = false;
            currentRotationY = 0;
            gsap.to(cardInner, {
                rotationY: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
        
        // Initialize card style
        card.style.cursor = 'grab';
        card.style.userSelect = 'none';
    });
}

// Initialize 3D Gallery with Swipe/Drag Controls
function initializeGallery() {
    const gallery3DCards = document.querySelectorAll('.gallery-card-3d');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    // Build gallery images array from both front and back images
    galleryImages = [];
    gallery3DCards.forEach(card => {
        const frontImg = card.dataset.front;
        const backImg = card.dataset.back;
        if (frontImg) galleryImages.push(frontImg);
        if (backImg) galleryImages.push(backImg);
    });
    
    // Add interactions to 3D gallery cards
    gallery3DCards.forEach((card, cardIndex) => {
        const cardInner = card.querySelector('.card-3d-inner');
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentRotationY = 0;
        let isRotating = false;
        let isFlipped = false;
        
        // Initialize card rotation
        gsap.set(cardInner, { rotationY: 0 });
        
        // Mouse Events for Desktop
        card.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            card.style.cursor = 'grabbing';
            card.classList.add('dragging');
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            // Determine if it's a horizontal or vertical drag
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                // Horizontal drag - rotate card
                const rotationY = currentRotationY + (deltaX * 0.5);
                gsap.set(cardInner, { rotationY: rotationY });
            }
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isDragging || isRotating) return;
            
            isDragging = false;
            card.style.cursor = 'grab';
            card.classList.remove('dragging');
            
            const deltaX = e.clientX - startX;
            
            // Mark as interacted for indicator fade
            if (Math.abs(deltaX) > 10) {
                card.classList.add('interacted');
            }
            
            // Determine final position based on drag distance - flip to opposite side
            if (Math.abs(deltaX) > 60) {
                isRotating = true;
                // Significant drag - flip card to opposite side
                isFlipped = !isFlipped;
                currentRotationY = isFlipped ? 180 : 0;
            }
            // If small drag, keep current rotation (no change needed)
            
            // Animate to final position
            gsap.to(cardInner, {
                rotationY: currentRotationY,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => {
                    isRotating = false;
                }
            });
        });
        
        // Touch Events for Mobile
        card.addEventListener('touchstart', (e) => {
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            card.classList.add('dragging');
            // Don't prevent default here to allow scroll detection
        });
        
        card.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            // More responsive horizontal swipe detection for gallery
            const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 20;
            const isVerticalScroll = Math.abs(deltaY) > Math.abs(deltaX) * 2 && Math.abs(deltaY) > 25;
            
            if (isHorizontalSwipe && !isVerticalScroll) {
                const rotationY = currentRotationY + (deltaX * 0.4);
                gsap.set(cardInner, { rotationY: rotationY });
                e.preventDefault(); // Prevent scrolling only for horizontal swipes
            } else if (isVerticalScroll) {
                // Allow vertical scrolling, stop card interaction
                isDragging = false;
                card.classList.remove('dragging');
                // Reset card position
                gsap.to(cardInner, {
                    rotationY: currentRotationY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('touchend', (e) => {
            if (!isDragging || isRotating) return;
            
            isDragging = false;
            card.classList.remove('dragging');
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            // Only process horizontal swipes for gallery card flip
            const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
            
            // Mark as interacted for indicator fade
            if (Math.abs(deltaX) > 20 && isHorizontalSwipe) {
                card.classList.add('interacted');
            }
            
            // Determine final position based on swipe distance - flip to opposite side
            if (Math.abs(deltaX) > 50 && isHorizontalSwipe) {
                isRotating = true;
                // Significant horizontal swipe - flip card to opposite side
                isFlipped = !isFlipped;
                currentRotationY = isFlipped ? 180 : 0;
            }
            // If small swipe, keep current rotation (no change needed)
            
            // Animate to final position
            gsap.to(cardInner, {
                rotationY: currentRotationY,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => {
                    isRotating = false;
                }
            });
        });
        
        // Double tap/click to open lightbox
        let tapCount = 0;
        card.addEventListener('click', (e) => {
            tapCount++;
            
            setTimeout(() => {
                if (tapCount === 1) {
                    // Single tap - do nothing (let swipe handle rotation)
                } else if (tapCount === 2) {
                    // Double tap - open lightbox
                    const currentSrc = isFlipped ? card.dataset.back : card.dataset.front;
                    const imageIndex = galleryImages.indexOf(currentSrc);
                    if (imageIndex !== -1) {
                        currentGalleryIndex = imageIndex;
                        openLightbox(galleryImages[imageIndex]);
                    }
                }
                tapCount = 0;
            }, 300);
        });
        
        // Initialize card style
        card.style.cursor = 'grab';
        card.style.userSelect = 'none';
    });
    
    // Lightbox controls
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', showPreviousImage);
    document.getElementById('lightbox-next').addEventListener('click', showNextImage);
    
    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display !== 'none' && !lightbox.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    lightboxImage.src = imageSrc;
    lightbox.classList.remove('hidden');
    lightbox.style.display = 'flex';
    
    gsap.fromTo(lightbox, {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.3
    });
    
    gsap.fromTo(lightboxImage, {
        scale: 0.8,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 0.3
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    gsap.to(lightbox, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            lightbox.style.display = 'none';
            lightbox.classList.add('hidden');
        }
    });
}

function showPreviousImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('lightbox-image').src = galleryImages[currentGalleryIndex];
}

function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    document.getElementById('lightbox-image').src = galleryImages[currentGalleryIndex];
}

// Initialize Forms
function initializeForms() {
    const rsvpForm = document.getElementById('rsvp-form');
    const wishesForm = document.getElementById('wishes-form');
    const wishesList = document.getElementById('wishes-list');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (this.dataset.submitting === 'true') return; // guard
            this.dataset.submitting = 'true';

            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Mengirim...';
            }
            const data = {
                name: document.getElementById('rsvp-name').value.trim(),
                email: document.getElementById('rsvp-email').value.trim(),
                attendance: document.getElementById('rsvp-attendance').value,
                guests: document.getElementById('rsvp-guests').value
            };
            await submitRSVP(data).finally(() => {
                if (submitBtn) submitBtn.disabled = false;
                this.dataset.submitting = 'false';
            });
        });
    }

    if (wishesForm) {
        wishesForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (this.dataset.submitting === 'true') return; // guard
            this.dataset.submitting = 'true';

            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Mengirim...';
            }
            const data = {
                name: document.getElementById('wishes-name').value.trim(),
                message: document.getElementById('wishes-message').value.trim()
            };
            await submitWish(data).finally(() => {
                if (submitBtn) submitBtn.disabled = false;
                this.dataset.submitting = 'false';
            });
        });
    }

    // Live wishes listener
    if (window.firebaseListenWishes && wishesList && !wishesList.dataset.bound) {
        wishesList.dataset.bound = 'true';
        window.firebaseListenWishes((items) => {
            wishesList.innerHTML = '';
            items.forEach(addWishToList);
        });
    }
}

let rsvpSubmitting = false;
async function submitRSVP(data) {
    if (rsvpSubmitting) return; // guard
    rsvpSubmitting = true;
    const btn = document.querySelector('#rsvp-form button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Mengirim...';
    btn.disabled = true;

    try {
        if (!data.name || !data.attendance) throw new Error('Nama dan status hadir wajib diisi');
        if (window.firebaseAddRSVP) {
            await window.firebaseAddRSVP(data);
        }
        btn.textContent = '✓ Terkirim';
        btn.classList.add('bg-green-500');
        document.getElementById('rsvp-form').reset();
        showNotification('Konfirmasi kehadiran berhasil dikirim!', 'success');
    } catch (err) {
        console.error(err);
        showNotification('Gagal mengirim RSVP. Coba lagi.', 'error');
    } finally {
        setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
            btn.classList.remove('bg-green-500');
        }, 2000);
        rsvpSubmitting = false;
    }
}

let wishSubmitting = false;
async function submitWish(data) {
    if (wishSubmitting) return; // guard
    wishSubmitting = true;
    const btn = document.querySelector('#wishes-form button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Mengirim...';
    btn.disabled = true;

    try {
        if (!data.name || !data.message) throw new Error('Nama dan ucapan wajib diisi');
        if (window.firebaseAddWish) {
            await window.firebaseAddWish(data);
        }
        document.getElementById('wishes-form').reset();
        showNotification('Ucapan berhasil dikirim!', 'success');
    } catch (err) {
        console.error(err);
        showNotification('Gagal mengirim ucapan. Coba lagi.', 'error');
    } finally {
        btn.textContent = original;
        btn.disabled = false;
        wishSubmitting = false;
    }
}

function addWishToList(data) {
    const wishesList = document.getElementById('wishes-list');
    const wishElement = document.createElement('div');
    wishElement.className = 'wish-item bg-gray-50 p-4 rounded-lg opacity-0';
    
    wishElement.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="w-10 h-10 bg-rose-gold text-white rounded-full flex items-center justify-center font-semibold">
                ${data.name.charAt(0).toUpperCase()}
            </div>
            <div class="flex-1">
                <h5 class="font-medium text-gray-800">${data.name}</h5>
                <p class="text-sm text-gray-600 mt-1">${data.message || ''}</p>
                <span class="text-xs text-gray-400">${formatTimestamp(data.createdAt)}</span>
            </div>
        </div>
    `;
    
    wishesList.appendChild(wishElement);
    
    // Animate in
    gsap.to(wishElement, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
}

function formatTimestamp(ts) {
    try {
        if (!ts) return 'Baru saja';
        const date = ts.toDate ? ts.toDate() : new Date(ts);
        return date.toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch (_) {
        return 'Baru saja';
    }
}

// Initialize Share Buttons
function initializeShareButtons() {
    // Share buttons are handled by individual functions
    // Called from HTML onclick attributes
}

function shareToWhatsApp() {
    const text = `Undangan Pernikahan Indah & Mario\n\nAnda diundang untuk merayakan hari bahagia kami:\n📅 25 Desember 2024\n📍 Jakarta\n\n`;
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + url)}`;
    window.open(whatsappUrl, '_blank');
}

function shareToFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
}

function shareToTwitter() {
    const text = 'Undangan Pernikahan Indah & Mario - 25 Desember 2024';
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

function copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link berhasil disalin!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link berhasil disalin!', 'success');
    }
}

// Initialize Music Control
function initializeMusicControl() {
    const musicControl = document.getElementById('music-control');
    const audioElement = document.getElementById('background-music');
    const musicAlert = document.getElementById('music-alert');
    const musicAlertClose = document.getElementById('music-alert-close');
    
    if (audioElement) {
        audioElement.volume = 0.1;
        audioElement.loop = true;
        // Ensure src is set and accessible
        if (!audioElement.getAttribute('src')) {
            audioElement.setAttribute('src', 'Music/The%20Way%20You%20Look%20At%20Me%20-%20Christian%20Bautista%20%28Saxophone%20Cover%29%20Saxserenade.mp3');
        }
        // Load metadata early
        audioElement.load();
    }
    
    if (musicControl) {
        musicControl.addEventListener('click', toggleMusic);
    }
    
    // Music alert close button
    if (musicAlertClose) {
        musicAlertClose.addEventListener('click', hideMusicAlert);
    }
    
    // Auto-hide alert after 5 seconds
    let alertTimeout;
    
    window.showMusicAlert = function(isPlaying) {
        if (!musicAlert) return;
        
        const alertIcon = document.getElementById('music-alert-icon');
        const alertTitle = document.getElementById('music-alert-title');
        const alertMessage = document.getElementById('music-alert-message');
        
        if (isPlaying) {
            alertIcon.className = 'fas fa-music music-alert-icon playing';
            alertTitle.textContent = 'Musik Wedding Dimulai';
            alertMessage.innerHTML = 'Musik romantis sedang diputar untuk melengkapi suasana pernikahan kami ♪<br><small>The Way You Look At Me - Christian Bautista</small>';
        } else {
            alertIcon.className = 'fas fa-pause music-alert-icon';
            alertTitle.textContent = 'Musik Dihentikan';
            alertMessage.textContent = 'Musik wedding telah dihentikan. Klik tombol musik untuk memutar kembali.';
        }
        
        // Show alert with animation
        musicAlert.classList.remove('hide');
        musicAlert.classList.add('show');
        
        // Clear previous timeout
        if (alertTimeout) clearTimeout(alertTimeout);
        
        // Auto-hide after 4 seconds
        alertTimeout = setTimeout(() => {
            hideMusicAlert();
        }, 4000);
    };
    
    window.hideMusicAlert = function() {
        if (!musicAlert) return;
        
        musicAlert.classList.remove('show');
        musicAlert.classList.add('hide');
        
        // Remove from DOM after animation
        setTimeout(() => {
            musicAlert.classList.remove('hide');
        }, 400);
        
        if (alertTimeout) clearTimeout(alertTimeout);
    };
}

function toggleMusic() {
    const musicIcon = document.getElementById('music-icon');
    const backgroundMusic = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    
    if (musicPlaying) {
        // Stop music
        if (backgroundMusic && !backgroundMusic.paused) {
            backgroundMusic.pause();
        }
        musicIcon.className = 'fas fa-music text-rose-gold';
        musicControl.classList.remove('playing');
        musicPlaying = false;
        
        // Animate icon
        gsap.to(musicControl, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        // Show music alert for stop
        if (window.showMusicAlert) {
            window.showMusicAlert(false);
        }
    } else {
        // Start music
        if (backgroundMusic) {
            // Attempt play with user gesture
            backgroundMusic.play().then(() => {
                musicIcon.className = 'fas fa-pause text-rose-gold';
                musicControl.classList.add('playing');
                musicPlaying = true;
                
                // Animate icon
                gsap.to(musicControl, {
                    scale: 1.1,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
                
                // Show music alert for play
                if (window.showMusicAlert) {
                    window.showMusicAlert(true);
                }
            }).catch(e => {
                console.log('Audio autoplay prevented:', e);
                showNotification('Klik untuk memulai musik latar', 'info');
            });
        }
    }
}

// Initialize Optimized Cherry Blossoms Effect
function initializeCherryBlossoms() {
    const container = document.getElementById('cherry-blossom-container');
    if (!container) return;

    // Respect reduced motion preferences
    // Allow forced display via data-force or sakura-force-front class
    const forceDisplay = container.classList.contains('sakura-force-front') || container.getAttribute('data-force') === 'true';
    if (!forceDisplay && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // Setup canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'sakura-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    function resizeCanvas() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 200));

    // Petal parameters
    const isMobile = window.innerWidth < 768;
    const isLowEnd = (navigator.hardwareConcurrency || 4) < 4 || isMobile;
    const count = isLowEnd ? (isMobile ? 20 : 28) : (isMobile ? 35 : 55);
    const colors = ['#FDE2E4', '#F9C5D5', '#F8D7DA', '#E8B4B8', '#FFD9E2'];
    // Smaller petal sizes
    const sizeMin = isMobile ? 5 : 6;
    const sizeMax = isMobile ? 12 : 14;

    const petals = [];
    function rand(min, max) { return Math.random() * (max - min) + min; }

    function createPetal(initialY = rand(-window.innerHeight, 0)) {
        const depth = Math.random();
        const size = rand(sizeMin, sizeMax) * (0.4 + depth * 0.6);
        return {
            x: rand(0, window.innerWidth),
            y: initialY,
            size,
            depth,
            color: colors[(Math.random() * colors.length) | 0],
            speedY: rand(0.4, 1.2) * (0.7 + depth),
            swayAmp: rand(12, 28) * (0.5 + depth),
            swayFreq: rand(0.6, 1.2),
            baseAngle: rand(0, Math.PI * 2),
            rot: rand(0, Math.PI * 2),
            rotSpeed: rand(-0.015, 0.015),
            flipPhase: rand(0, Math.PI * 2),
            flipSpeed: rand(0.01, 0.03)
        };
    }

    for (let i = 0; i < count; i++) petals.push(createPetal(rand(-window.innerHeight, window.innerHeight)));

    let t = 0;
    function drawPetal(p) {
        const flip = Math.sin(p.flipPhase) * 0.6 + 0.4; // 0..1 to simulate petal flipping
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot + Math.sin(t * 0.001 + p.baseAngle) * 0.25);
        ctx.scale(flip, 1);

        // Petal teardrop path
        const s = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.8);
        ctx.bezierCurveTo(s * 0.5, -s * 0.2, s * 0.6, s * 0.3, 0, s * 0.9);
        ctx.bezierCurveTo(-s * 0.6, s * 0.3, -s * 0.5, -s * 0.2, 0, -s * 0.8);
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.65 + p.depth * 0.35;
        ctx.shadowColor = 'rgba(0,0,0,0.08)';
        ctx.shadowBlur = 4 * p.depth;
        ctx.fill();
        ctx.restore();
    }

    function step() {
        t += 16;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Gentle global wind
        const wind = Math.sin(t * 0.0006) * 0.4 + Math.sin(t * 0.0013 + 1.7) * 0.2;

        for (let i = 0; i < petals.length; i++) {
            const p = petals[i];
            p.y += p.speedY;
            p.x += Math.sin(t * 0.002 * p.swayFreq + p.baseAngle) * (p.swayAmp * 0.02) + wind * (0.6 + p.depth * 0.8);
            p.rot += p.rotSpeed;
            p.flipPhase += p.flipSpeed;

            // Recycle when out of screen
            if (p.y > window.innerHeight + 30 || p.x < -40 || p.x > window.innerWidth + 40) {
                petals[i] = createPetal(rand(-120, -20));
            }

            drawPetal(p);
        }
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Initialize Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    console.log('Theme Toggle Debug:', {
        themeToggle: !!themeToggle,
        themeIcon: !!themeIcon
    });

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    
    // Apply initial theme
    applyTheme(currentTheme);

    // Add click event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            console.log('Theme changing to:', currentTheme);
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
        
        // Visual feedback for click
        themeToggle.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        themeToggle.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    } else {
        console.error('Theme toggle button not found!');
    }

    function applyTheme(theme) {
        console.log('Applying theme:', theme);
        
        // Set data-theme attribute on html element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Also set on body for backup
        document.body.setAttribute('data-theme', theme);
        
        // Update icon
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-moon text-gold';
            } else {
                themeIcon.className = 'fas fa-sun text-gold';
            }
        }

        // Force body background change immediately
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#1A202C';
            document.body.style.color = '#E2E8F0';
        } else {
            document.body.style.backgroundColor = '#FFF8DC';
            document.body.style.color = '#333';
        }
        
        console.log('Theme applied. HTML data-theme:', document.documentElement.getAttribute('data-theme'));
    }
    
    // Make applyTheme globally accessible for debugging
    window.debugApplyTheme = applyTheme;
    window.debugCurrentTheme = () => currentTheme;
}

// Initialize Optimized Scroll Animations
function initializeScrollAnimations() {
    // Simplified navigation active state
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Use single batch instead of multiple triggers
    ScrollTrigger.batch(sections, {
        onEnter: (elements) => {
            elements.forEach(element => {
                const id = element.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            });
        },
        start: 'top 50%',
        end: 'bottom 50%'
    });
    
    // Navbar show/hide behavior is centralized in initializeNavigation to avoid conflicts
}

// Initialize Optimized Parallax
function initializeParallax() {
    // Check if device supports smooth scrolling/parallax
    const supportsParallax = window.innerWidth > 768 && navigator.hardwareConcurrency >= 4;
    
    if (!supportsParallax) return; // Skip parallax on low-end devices
    
    // Single parallax effect for hero elements only
    gsap.to('.flower-bloom', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 2
        }
    });

    // Subtle cherry blossom movement
    gsap.to('.cherry-blossom-container', {
        y: -10,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 4
        }
    });
}

// Setup Enhanced Responsive Event Listeners
function setupEventListeners() {
    // Google Maps integration with responsive detection
    window.openGoogleMaps = function(location) {
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Use mobile app if available
            const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(location)}`;
            window.open(mapsUrl, '_blank');
        } else {
            // Use web interface for desktop
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
            window.open(mapsUrl, '_blank');
        }
    };
    
    // Enhanced smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const isMobile = window.innerWidth < 768;
                const offset = isMobile ? 60 : 80;
                
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                        offsetY: offset
                    },
                    duration: isMobile ? 0.8 : 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    // Enhanced window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
            
            // Update animations based on new screen size
            const isLowEndDevice = navigator.hardwareConcurrency < 4 || window.innerWidth < 768;
            if (isLowEndDevice && !document.body.classList.contains('reduced-motion')) {
                document.body.classList.add('reduced-motion');
            } else if (!isLowEndDevice && document.body.classList.contains('reduced-motion')) {
                document.body.classList.remove('reduced-motion');
            }
        }, 250);
    });
    
    // Improved touch interactions for all interactive elements
    if ('ontouchstart' in window) {
        const interactiveElements = document.querySelectorAll('button, .cursor-pointer, .share-btn, .event-card');
        
        interactiveElements.forEach(element => {
            // Add touch feedback
            element.addEventListener('touchstart', function(e) {
                if (!this.classList.contains('no-touch-feedback')) {
                    gsap.to(this, { scale: 0.95, duration: 0.1 });
                }
            }, { passive: true });
            
            element.addEventListener('touchend', function(e) {
                if (!this.classList.contains('no-touch-feedback')) {
                    gsap.to(this, { scale: 1, duration: 0.1 });
                }
            }, { passive: true });
            
            element.addEventListener('touchcancel', function(e) {
                if (!this.classList.contains('no-touch-feedback')) {
                    gsap.to(this, { scale: 1, duration: 0.1 });
                }
            }, { passive: true });
        });
    }
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Optimize scroll performance
    let ticking = false;
    function updateScrollElements() {
        // Update any scroll-dependent elements here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform translate-x-full transition-transform duration-300`;
    
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500');
            break;
        case 'error':
            notification.classList.add('bg-red-500');
            break;
        default:
            notification.classList.add('bg-blue-500');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Performance optimization
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

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// (Effects simplified for premium look; removed cursor trails and sparkle bursts)

// Removed advanced parallax for better performance

// Optimized Performance Monitoring
function initializePerformanceOptimizations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency < 4 || window.innerWidth < 768) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        // Disable some heavy animations
        document.body.classList.add('reduced-motion');
    }
    
    // Simple image lazy loading for data-src images only
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Copy to clipboard function for bank accounts
function copyToClipboard(text, bankName) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(`Nomor ${bankName} berhasil disalin!`, 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(`Nomor ${bankName} berhasil disalin!`, 'success');
    }
}

// Removed sample wishes to rely solely on Firebase live data

// Initialize performance optimizations when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializePerformanceOptimizations();
});

