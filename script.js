/* ═══════════════════════════════════════════════════
   ANDREY WHITE — PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initProjectFilter();
    initContactForm();
});


/* ═══════════════════════════════════════════════════
   1. THEME TOGGLE
   ═══════════════════════════════════════════════════ */
function initTheme() {
    const toggle = document.getElementById('themeToggle');

    const saved = localStorage.getItem('theme-white');
    if (saved === 'light') {
        document.body.classList.remove('dark');
    } else {
        document.body.classList.add('dark');
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme-white', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
}


/* ═══════════════════════════════════════════════════
   2. NAVBAR
   ═══════════════════════════════════════════════════ */
function initNavbar() {
    const navbar = document.getElementById('navbar');

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
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
   4. SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════ */
function initScrollAnimations() {
    const targets = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    targets.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════════════
   5. PROJECT FILTER
   ═══════════════════════════════════════════════════ */
function initProjectFilter() {
    const tabs = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            cards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'Все' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => card.classList.add('hidden'), 300);
                }
            });
        });
    });
}


/* ═══════════════════════════════════════════════════
   6. CONTACT FORM
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

        [nameError, emailError, messageError].forEach(el => el.textContent = '');
        [name, email, message].forEach(el => el.classList.remove('error'));

        if (!name.value.trim()) {
            nameError.textContent = 'Введите имя';
            name.classList.add('error');
            valid = false;
        } else if (name.value.trim().length < 2) {
            nameError.textContent = 'Минимум 2 символа';
            name.classList.add('error');
            valid = false;
        }

        if (!email.value.trim()) {
            emailError.textContent = 'Введите email';
            email.classList.add('error');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            emailError.textContent = 'Некорректный email';
            email.classList.add('error');
            valid = false;
        }

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

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('show');
        }, 1200);
    });
}


/* ═══════════════════════════════════════════════════
   7. SMOOTH SCROLL
   ═══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const offset = 64;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
