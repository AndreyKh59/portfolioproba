/* ═══════════════════════════════════════════════════
   ANDREY HARIN — PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initTypingEffect();
    initStatCounters();
    initSkillRings();
    initProjectFilter();
    initContactForm();
    initCursorFollower();
});


/* ═══════════════════════════════════════════════════
   1. THEME TOGGLE
   ═══════════════════════════════════════════════════ */
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check saved theme or default to dark
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        body.classList.remove('dark');
    } else {
        body.classList.add('dark');
    }

    toggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    });
}


/* ═══════════════════════════════════════════════════
   2. NAVBAR SCROLL EFFECT
   ═══════════════════════════════════════════════════ */
function initNavbar() {
    const navbar = document.getElementById('navbar');

    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}


/* ═══════════════════════════════════════════════════
   3. MOBILE MENU
   ═══════════════════════════════════════════════════ */
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const panel = document.getElementById('mobileMenu');
    const links = panel.querySelectorAll('a');

    toggle.addEventListener('click', () => {
        const isOpen = panel.classList.contains('open');
        panel.classList.toggle('open');
        toggle.classList.toggle('active');
        document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            panel.classList.remove('open');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}


/* ═══════════════════════════════════════════════════
   4. SCROLL ANIMATIONS (Intersection Observer)
   ═══════════════════════════════════════════════════ */
function initScrollAnimations() {
    const targets = document.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    targets.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════════════
   5. TYPING EFFECT
   ═══════════════════════════════════════════════════ */
function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const texts = ['Digital Designer', 'Полиграфия', 'Медиа', 'Веб-дизайн'];
    let textIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function type() {
        const current = texts[textIdx];

        if (!deleting) {
            el.textContent = current.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                setTimeout(() => { deleting = true; type(); }, 2200);
                return;
            }
            setTimeout(type, 90);
        } else {
            el.textContent = current.slice(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                textIdx = (textIdx + 1) % texts.length;
                setTimeout(type, 300);
                return;
            }
            setTimeout(type, 45);
        }
    }

    type();
}


/* ═══════════════════════════════════════════════════
   6. ANIMATED STAT COUNTERS
   ═══════════════════════════════════════════════════ */
function initStatCounters() {
    const cards = document.querySelectorAll('.stat-card');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    animateCounter(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    cards.forEach(card => observer.observe(card));
}

function animateCounter(card) {
    const target = parseInt(card.dataset.target);
    const suffix = card.dataset.suffix;
    const countEl = card.querySelector('.stat-count');
    const suffixEl = card.querySelector('.stat-suffix');
    const duration = 2000;
    const start = performance.now();

    suffixEl.textContent = suffix;

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        countEl.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}


/* ═══════════════════════════════════════════════════
   7. SKILL RINGS ANIMATION
   ═══════════════════════════════════════════════════ */
function initSkillRings() {
    const rings = document.querySelectorAll('.skill-ring-item');

    // Desktop rings
    const ringObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    const level = parseInt(entry.target.dataset.level);
                    const circle = entry.target.querySelector('.ring-progress');
                    if (circle) {
                        const circumference = 2 * Math.PI * 36; // r=36
                        const offset = circumference - (level / 100) * circumference;
                        circle.style.strokeDashoffset = offset;
                    }
                }
            });
        },
        { threshold: 0.3 }
    );

    rings.forEach(ring => ringObserver.observe(ring));

    // Mobile pill bars
    const pills = document.querySelectorAll('.pill-bar-fill');

    const pillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.dataset.width + '%';
                }
            });
        },
        { threshold: 0.2 }
    );

    pills.forEach(pill => pillObserver.observe(pill));
}


/* ═══════════════════════════════════════════════════
   8. PROJECT FILTER
   ═══════════════════════════════════════════════════ */
function initProjectFilter() {
    const tabs = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter cards
            cards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'Все' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}


/* ═══════════════════════════════════════════════════
   9. CONTACT FORM VALIDATION
   ═══════════════════════════════════════════════════ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        let valid = true;

        // Reset
        [nameError, emailError, messageError].forEach(el => el.textContent = '');
        [name, email, message].forEach(el => el.classList.remove('error'));

        // Validate name
        if (!name.value.trim()) {
            nameError.textContent = 'Введите ваше имя';
            name.classList.add('error');
            valid = false;
        } else if (name.value.trim().length < 2) {
            nameError.textContent = 'Минимум 2 символа';
            name.classList.add('error');
            valid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            emailError.textContent = 'Введите email';
            email.classList.add('error');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            emailError.textContent = 'Некорректный email';
            email.classList.add('error');
            valid = false;
        }

        // Validate message
        if (!message.value.trim()) {
            messageError.textContent = 'Введите сообщение';
            message.classList.add('error');
            valid = false;
        } else if (message.value.trim().length < 10) {
            messageError.textContent = 'Минимум 10 символов';
            message.classList.add('error');
            valid = false;
        }

        if (!valid) return;

        // Simulate sending
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('show');
        }, 1200);
    });
}


/* ═══════════════════════════════════════════════════
   10. CURSOR FOLLOWER (desktop only)
   ═══════════════════════════════════════════════════ */
function initCursorFollower() {
    const cursor = document.getElementById('cursorFollower');
    if (!cursor || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    const onMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('visible');
    };

    const onLeave = () => {
        cursor.classList.remove('visible');
    };

    const animate = () => {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;
        cursor.style.left = (currentX - 10) + 'px';
        cursor.style.top = (currentY - 10) + 'px';
        requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    // Hide on touch
    window.addEventListener('touchstart', () => {
        cursor.style.display = 'none';
    }, { once: true });

    requestAnimationFrame(animate);
}


/* ═══════════════════════════════════════════════════
   11. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ═══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
