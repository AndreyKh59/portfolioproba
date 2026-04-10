/* ═══════════════════════════════════════════════════
   ANDREY WHITE — PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    initTextScramble();
    initScrollAnimations();
    initSkillTabs();
    initSkillBars();
    initCounters();
    initAccordion();
    initProjectFilter();
    initProjectModal();
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
   4. TEXT SCRAMBLE EFFECT
   ═══════════════════════════════════════════════════ */
function initTextScramble() {
    const elFirst = document.querySelector('.hero-first');
    const elLast = document.querySelector('.hero-last');
    if (!elFirst || !elLast) return;

    const finalFirst = elFirst.textContent.trim();
    const finalLast = elLast.textContent.trim();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';

    function randomChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function scramble(el, finalText, delay) {
        const len = finalText.length;
        let iterations = 0;
        const maxIterations = 24;

        setTimeout(() => {
            const interval = setInterval(() => {
                iterations++;
                let display = '';

                for (let i = 0; i < len; i++) {
                    if (finalText[i] === ' ') {
                        display += ' ';
                        continue;
                    }
                    const freezeAt = Math.floor((iterations / maxIterations) * len);
                    if (i < freezeAt || iterations >= maxIterations) {
                        display += finalText[i];
                    } else {
                        display += randomChar();
                    }
                }

                el.textContent = display;

                if (iterations >= maxIterations) {
                    el.textContent = finalText;
                    clearInterval(interval);
                }
            }, 80);
        }, delay);
    }

    elFirst.textContent = '';
    elLast.textContent = '';

    scramble(elFirst, finalFirst, 300);
    scramble(elLast, finalLast, 800);
}


/* ═══════════════════════════════════════════════════
   5. SCROLL ANIMATIONS
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
   6. SKILL TABS
   ═══════════════════════════════════════════════════ */
function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const panels = document.querySelectorAll('.skill-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const skill = tab.dataset.skill;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            panels.forEach(panel => {
                if (panel.dataset.skill === skill) {
                    panel.classList.add('active');
                    // Re-animate skill bars after panel is visible
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            const fills = panel.querySelectorAll('.skill-fill');
                            fills.forEach(fill => {
                                fill.style.transition = 'none';
                                fill.style.width = '0';
                                void fill.offsetWidth; // force reflow
                                fill.style.transition = '';
                                fill.classList.remove('animate');
                                void fill.offsetWidth;
                                fill.classList.add('animate');
                            });
                        });
                    });
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
}


/* ═══════════════════════════════════════════════════
   7. SKILL BARS ANIMATION
   ═══════════════════════════════════════════════════ */
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    fills.forEach(fill => observer.observe(fill));
}


/* ═══════════════════════════════════════════════════
   8. ANIMATED COUNTERS
   ═══════════════════════════════════════════════════ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-num[data-target]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        el.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}


/* ═══════════════════════════════════════════════════
   9. ACCORDION (SERVICES)
   ═══════════════════════════════════════════════════ */
function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const body = item.querySelector('.accordion-body');

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            items.forEach(otherItem => {
                otherItem.classList.remove('open');
                const otherBody = otherItem.querySelector('.accordion-body');
                otherBody.style.maxHeight = '0';
            });

            // Open clicked (if it was closed)
            if (!isOpen) {
                item.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
}


/* ═══════════════════════════════════════════════════
   10. PROJECT FILTER
   ═══════════════════════════════════════════════════ */
function initProjectFilter() {
    const tabs = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    const grid = document.getElementById('projectsGrid');

    // Initially show only active tab (Брендинг)
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    cards.forEach(card => {
        if (card.dataset.category !== activeFilter) {
            card.style.display = 'none';
        }
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Fade out all first
            grid.style.opacity = '0';
            grid.style.transform = 'translateY(8px)';

            setTimeout(() => {
                cards.forEach(card => {
                    if (card.dataset.category === filter) {
                        card.style.display = '';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(12px)';
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Fade in
                requestAnimationFrame(() => {
                    grid.style.opacity = '1';
                    grid.style.transform = 'translateY(0)';

                    cards.forEach((card, i) => {
                        if (card.dataset.category === filter) {
                            setTimeout(() => {
                                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, i * 60);
                        }
                    });
                });
            }, 250);
        });
    });

    // Add transition to grid
    grid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
}


/* ═══════════════════════════════════════════════════
   11. PROJECT MODAL + CAROUSEL
   ═══════════════════════════════════════════════════ */
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalClose');
    const backdrop = modal.querySelector('.modal-backdrop');
    const track = document.getElementById('carouselTrack');
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    // Данные проектов (текст-рыба, серые плейсхолдеры)
    const projectData = {
        'branding-1': {
            title: 'Бивни — Боевой клуб',
            desc: 'Полный цикл брендинга для боевого клуба «Бивни». Разработка логотипа, фирменного стиля, иконографии. Создание рекламных материалов: плакаты, шоперы, баннеры. Интеграция QR-маркетинга в офлайн-материалы. Мерч для участников клуба.',
            tags: ['Брендинг', 'Полиграфия', 'Мерч', 'QR-маркетинг'],
            slides: ['Макет логотипа', 'Фирменный стиль', 'Плакат', 'Мерч']
        },
        'branding-2': {
            title: 'Кофейня «Зерно»',
            desc: 'Создание айдентики для specialty-кофейни. Логотип, палитра, типографика. Дизайн меню, стаканчиков, упаковки для зёрен и мерча. Единый визуальный язык для всех точек контакта с клиентом.',
            tags: ['Айдентика', 'Упаковка', 'Типографика'],
            slides: ['Логотип', 'Меню', 'Упаковка', 'Стаканчики']
        },
        'branding-3': {
            title: 'Логотипы 2024',
            desc: 'Подборка логотипов для различных клиентов из разных сфер: от IT-стартапов до ресторанов и фитнес-клубов. Разнообразные подходы: минимализм, геометрия, hand-drawn, буквенные знаки.',
            tags: ['Логотип', 'Illustrator', 'Векторная графика'],
            slides: ['Логотип 1', 'Логотип 2', 'Логотип 3', 'Логотип 4']
        },
        'web-1': {
            title: 'Корпоративный сайт',
            desc: 'UI/UX дизайн и вёрстка корпоративного сайта для IT-компании. Адаптивный дизайн, анимации при скролле, интерактивные элементы. Прототипирование в Figma, тестирование на пользователях.',
            tags: ['UI/UX', 'Figma', 'HTML/CSS', 'Анимации'],
            slides: ['Главная', 'О компании', 'Услуги', 'Контакты']
        },
        'web-2': {
            title: 'Лендинг приложения',
            desc: 'Лендинг для мобильного приложения. Визуальная концепция: градиенты, иконки, 3D-элементы. Экраны приложения, адаптация под iOS и Android гайдлайны.',
            tags: ['Лендинг', 'Мобайл', 'UI'],
            slides: ['Hero-секция', 'Фичи', 'Экраны приложения', 'CTA']
        },
        'web-3': {
            title: 'Онлайн-магазин',
            desc: 'Дизайн интернет-магазина одежды. Карточки товаров, каталог с фильтрами, корзина, личный кабинет, чекаут. Микроанимации и hover-эффекты для лучшего UX.',
            tags: ['E-commerce', 'UX', 'Figma'],
            slides: ['Главная', 'Каталог', 'Карточка товара', 'Корзина']
        },
        'media-1': {
            title: 'Моушн-пакет',
            desc: 'Анимированные элементы для digital-проектов: анимация логотипов, transitions для интерфейсов, Lottie-анимации для мобильных приложений. Сочетание 2D и 3D подходов.',
            tags: ['Моушн', 'After Effects', 'Lottie'],
            slides: ['Анимация логотипа', 'Transitions', 'Lottie', 'Интерфейс']
        },
        'media-2': {
            title: 'Промо-ролик',
            desc: 'Съёмка и монтаж промо-ролика для бренда одежды. Работа с оператором, цветокоррекция, kinetic-тайпографика, саунд-дизайн. Форматы: 16:9 для YouTube, 9:16 для Reels.',
            tags: ['Видео', 'Premiere', 'Тайпографика'],
            slides: ['Кадр 1', 'Кадр 2', 'Кадр 3', 'Финал']
        },
        'media-3': {
            title: 'Заставка для игры',
            desc: 'Дизайн стартового экрана для игровой платформы. 3D-элементы созданы в Blender, композитинг и пост-обработка в After Effects. Атмосферный, кинематографичный результат.',
            tags: ['Игры', 'Blender', 'After Effects', '3D'],
            slides: ['Концепт', '3D-моделинг', 'Композитинг', 'Финал']
        },
        'media-4': {
            title: 'Social media pack',
            desc: 'Полное оформление соцсетей для бренда: шаблоны сторис, посты, хайлайтсы, обложки. Единый визуальный стиль, адаптированный для Instagram и VK. Более 50 шаблонов для регулярного контента.',
            tags: ['SMM', 'Photoshop', 'Figma', 'Шаблоны'],
            slides: ['Шаблоны сторис', 'Посты', 'Хайлайтсы', 'Обложки']
        }
    };

    let currentSlide = 0;
    let totalSlides = 0;

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        currentSlide = 0;
        totalSlides = data.slides.length;

        // Заполняем карусель
        track.innerHTML = data.slides.map((slide, i) => `
            <div class="carousel-slide">
                <div class="carousel-slide-inner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>${slide}</span>
                </div>
            </div>
        `).join('');

        // Dots
        dotsWrap.innerHTML = data.slides.map((_, i) =>
            `<div class="carousel-dot${i === 0 ? ' active' : ''}"></div>`
        ).join('');

        // Info
        document.querySelector('.modal-title').textContent = data.title;
        document.querySelector('.modal-desc').textContent = data.desc;
        document.querySelector('.modal-tags').innerHTML = data.tags.map(t =>
            `<span>${t}</span>`
        ).join('');

        updateCarousel();

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        const dots = dotsWrap.querySelectorAll('.carousel-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    function goSlide(dir) {
        currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Click on cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(card.dataset.project);
        });
    });

    // Close
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') goSlide(-1);
        if (e.key === 'ArrowRight') goSlide(1);
    });

    prevBtn.addEventListener('click', () => goSlide(-1));
    nextBtn.addEventListener('click', () => goSlide(1));

    // Swipe support
    let touchStartX = 0;
    const carousel = document.getElementById('modalCarousel');

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            goSlide(diff > 0 ? 1 : -1);
        }
    }, { passive: true });
}


/* ═══════════════════════════════════════════════════
   12. CONTACT FORM
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
   13. SMOOTH SCROLL
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
