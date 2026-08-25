/* ════════════════════════════════════════════════════════
   FORHAD HOSSAIN — MASTER SITE JAVASCRIPT (CONFLICT-FREE)
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── SCROLL PROGRESS BAR ── */
    const progressBar = document.getElementById('scroll-progress-bar');
    function updateProgressBar() {
        if (!progressBar) return;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }

    /* ── NAV: condense on scroll ── */
    const nav = document.querySelector('.nav');
    const onScroll = function () {
        if (nav) nav.classList.toggle('is-condensed', window.scrollY > 40);
        updateProgressBar();
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── NAV: sliding indicator ── */
    const linksWrap = document.querySelector('.nav__links');
    const indicator = document.querySelector('.nav__indicator');
    if (linksWrap && indicator) {
        const links = Array.from(linksWrap.querySelectorAll('.nav__link'));

        function moveIndicatorTo(el) {
            if (!el) { indicator.classList.remove('is-visible'); return; }
            const wrapRect = linksWrap.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            indicator.style.width = elRect.width + 'px';
            indicator.style.transform = 'translateX(' + (elRect.left - wrapRect.left) + 'px)';
            indicator.classList.add('is-visible');
        }

        function activeLink() {
            return linksWrap.querySelector('.nav__link.is-active');
        }

        links.forEach(link => {
            link.addEventListener('mouseenter', () => moveIndicatorTo(link));
            link.addEventListener('click', function () {
                links.forEach(l => l.classList.remove('is-active'));
                this.classList.add('is-active');
                moveIndicatorTo(this);
            });
        });

        linksWrap.addEventListener('mouseleave', () => moveIndicatorTo(activeLink()));
        window.addEventListener('resize', () => moveIndicatorTo(activeLink()));
        setTimeout(() => moveIndicatorTo(activeLink()), 100);
    }

    /* ── MOBILE MENU ── */
    const burger = document.querySelector('.nav__burger');
    const mobileMenu = document.querySelector('.nav__mobile');
    if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
            mobileMenu.classList.toggle('is-open');
        });
        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', function () {
                mobileMenu.classList.remove('is-open');
            });
        });
    }

    /* ── SCROLL REVEAL ── */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
    }

    /* ── SCROLL SPY ── */
    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        const sections = document.querySelectorAll('section[id], header[id]');
        let currentId = '';

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        if (window.scrollY < 100) currentId = 'home';

        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('is-active');
            const href = link.getAttribute('href');
            if (href === '#' + currentId || href === '../index.html#' + currentId) {
                link.classList.add('is-active');
                if (linksWrap && indicator) {
                    const wrapRect = linksWrap.getBoundingClientRect();
                    const elRect = link.getBoundingClientRect();
                    indicator.style.width = elRect.width + 'px';
                    indicator.style.transform = 'translateX(' + (elRect.left - wrapRect.left) + 'px)';
                    indicator.classList.add('is-visible');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();

    /* ── PROJECT FILTER (projects.html) ── */
    const filterContainer = document.querySelector('.log-filters');
    if (filterContainer) {
        const buttons = filterContainer.querySelectorAll('button');
        const cards = document.querySelectorAll('.log-grid .card');

        buttons.forEach(btn => {
            btn.addEventListener('click', function () {
                buttons.forEach(b => b.classList.remove('is-active'));
                this.classList.add('is-active');
                const filter = this.dataset.filter;
                cards.forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
                });
            });
        });
    }

    /* ── PROJECT SLIDESHOW (Homepage IoT) ── */
    const featuredCard = document.querySelector('.card--featured');
    if (featuredCard) {
        const wrapper = featuredCard.querySelector('.slideshow-wrapper');
        if (wrapper) {
            console.log("Slideshow ready");
        }
    }

    /* ── GALLERY: FADE SLIDESHOW ── */
    const wrapper = document.getElementById('gallerySlideshow');
    const dotsContainer = document.getElementById('galleryDots');
    let currentIndex = 0;
    let fadeInterval;

    const imagePaths = [
        'assets/gallery/pic-01.jpg',
        'assets/gallery/pic-02.jpg',
        'assets/gallery/pic-03.jpg',
        'assets/gallery/pic-04.jpg',
        'assets/gallery/pic-05.jpg',
        'assets/gallery/pic-06.jpg',
        'assets/gallery/pic-07.jpg',
        'assets/gallery/pic-08.jpg',
        'assets/gallery/pic-09.jpg',
        'assets/gallery/pic-10.jpg'
    ];

    function initFadeSlideshow() {
        if (!wrapper) return;
        wrapper.innerHTML = '';
        if (dotsContainer) dotsContainer.innerHTML = '';

        imagePaths.forEach((path, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide-item' + (index === 0 ? ' active' : '');
            slide.innerHTML = `<img src="${path}" alt="Gallery ${index + 1}" loading="lazy" />`;
            wrapper.appendChild(slide);

            if (dotsContainer) {
                const dot = document.createElement('button');
                dot.className = 'dot' + (index === 0 ? ' active' : '');
                dot.setAttribute('data-index', index);
                dot.addEventListener('click', function () {
                    goToFadeSlide(parseInt(this.dataset.index));
                });
                dotsContainer.appendChild(dot);
            }
        });
        startFadeAutoPlay();
    }

    function goToFadeSlide(index) {
        const slides = wrapper.querySelectorAll('.slide-item');
        const total = slides.length;
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        slides[currentIndex].classList.remove('active');
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        if (dotsContainer) {
            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        resetFadeAutoPlay();
    }

    function startFadeAutoPlay() {
        if (fadeInterval) clearInterval(fadeInterval);
        fadeInterval = setInterval(() => {
            const slides = wrapper.querySelectorAll('.slide-item');
            const total = slides.length;
            const nextIndex = (currentIndex + 1) % total;
            goToFadeSlide(nextIndex);
        }, 2000);
    }

    function resetFadeAutoPlay() {
        clearInterval(fadeInterval);
        startFadeAutoPlay();
    }

    window.goToFadeSlide = goToFadeSlide;
    window.changeSlide = function (direction) {
        const slides = wrapper.querySelectorAll('.slide-item');
        const total = slides.length;
        const newIndex = currentIndex + direction;
        goToFadeSlide(newIndex);
    };

    const container = document.querySelector('.slideshow-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(fadeInterval));
        container.addEventListener('mouseleave', startFadeAutoPlay);
    }

    function toggleGallery() {
        const gallery = document.getElementById('fullGallery');
        const btn = document.querySelector('.gallery-toggle-btn');

        if (!gallery) return;

        if (gallery.style.display === 'none' || gallery.style.display === '') {
            gallery.style.display = 'block';
            if (btn) btn.textContent = '✕ Close Gallery';
            if (wrapper && wrapper.children.length === 0) {
                initFadeSlideshow();
            }
            gallery.scrollIntoView({ behavior: 'smooth', block: 'center' });
            startFadeAutoPlay();
        } else {
            gallery.style.display = 'none';
            if (btn) btn.textContent = '🖼️ Open Gallery';
            clearInterval(fadeInterval);
        }
    }

    window.toggleGallery = toggleGallery;

});