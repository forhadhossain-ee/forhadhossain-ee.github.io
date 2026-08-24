/* ════════════════════════════════════════════════════════
   FORHAD HOSSAIN — MASTER SITE JAVASCRIPT
   Handles: Sliding nav indicator, Scroll Progress Bar,
   Mobile menu, Scroll-reveal, and Project filters.
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── SCROLL PROGRESS BAR: tracks read progress ── */
    var progressBar = document.getElementById('scroll-progress-bar');

    function updateProgressBar() {
        if (!progressBar) return;
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }

    /* ── NAV: condense on scroll ── */
    var nav = document.querySelector('.nav');
    if (nav || progressBar) {
        var onScroll = function () {
            if (nav) nav.classList.toggle('is-condensed', window.scrollY > 40);
            updateProgressBar();
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ── NAV: sliding indicator that tracks hover / active link ── */
    var linksWrap = document.querySelector('.nav__links');
    var indicator = document.querySelector('.nav__indicator');
    if (linksWrap && indicator) {
        var links = Array.prototype.slice.call(linksWrap.querySelectorAll('.nav__link'));

        function moveIndicatorTo(el) {
            if (!el) { indicator.classList.remove('is-visible'); return; }
            var wrapRect = linksWrap.getBoundingClientRect();
            var elRect = el.getBoundingClientRect();
            indicator.style.width = elRect.width + 'px';
            indicator.style.transform = 'translateX(' + (elRect.left - wrapRect.left) + 'px)';
            indicator.classList.add('is-visible');
        }

        function activeLink() {
            return linksWrap.querySelector('.nav__link.is-active');
        }

        links.forEach(function (link) {
            link.addEventListener('mouseenter', function () { moveIndicatorTo(link); });
            link.addEventListener('click', function () {
                links.forEach(function (l) { l.classList.remove('is-active'); });
                link.classList.add('is-active');
                moveIndicatorTo(link);
            });
        });

        linksWrap.addEventListener('mouseleave', function () { moveIndicatorTo(activeLink()); });

        // Position on load and on resize
        window.addEventListener('resize', function () { moveIndicatorTo(activeLink()); });
        setTimeout(function () { moveIndicatorTo(activeLink()); }, 100);
    }

    /* ── NAV: mobile menu toggle ── */
    var burger = document.querySelector('.nav__burger');
    var mobileMenu = document.querySelector('.nav__mobile');
    if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
            mobileMenu.classList.toggle('is-open');
        });
        mobileMenu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () { mobileMenu.classList.remove('is-open'); });
        });
    }

    /* ── SCROLL REVEAL ── */
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
    }

    /* ── PROJECT LOG FILTER (for project-log.html only) ── */
    var filterBar = document.querySelector('.log-filters');
    if (filterBar) {
        var buttons = Array.prototype.slice.call(filterBar.querySelectorAll('[data-filter]'));
        var items = Array.prototype.slice.call(document.querySelectorAll('[data-level]'));

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                buttons.forEach(function (b) { b.classList.remove('is-active'); });
                btn.classList.add('is-active');
                var filter = btn.getAttribute('data-filter');
                items.forEach(function (item) {
                    var show = filter === 'all' || item.getAttribute('data-level') === filter;
                    item.style.display = show ? '' : 'none';
                });
            });
        });
    }

});

// Projects Slideshow Functionality
document.addEventListener('DOMContentLoaded', () => {
    const featuredCard = document.querySelector('.card--featured');
    if (featuredCard) {
        const wrapper = featuredCard.querySelector('.slideshow-wrapper');
        
        // মাউস নিলে স্লাইড হবে (CSS handling)
        // অতিরিক্ত কন্ট্রোল প্রয়োজন হলে এখানে কোড যোগ করা যাবে
        console.log("Slideshow initialized for Featured Project.");
    }
});

/* ============================================================
   PROJECT LOG FILTER
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    const filterContainer = document.querySelector('.log-filters');
    if (!filterContainer) return;

    const buttons = filterContainer.querySelectorAll('button');
    const cards = document.querySelectorAll('.log-grid .card');

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            buttons.forEach(function (b) { b.classList.remove('is-active'); });
            this.classList.add('is-active');

            const filter = this.dataset.filter;

            cards.forEach(function (card) {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

/* ============================================================
   GALLERY TOGGLE — Show/Hide Full Gallery on Homepage
   ============================================================ */
function toggleGallery() {
    var gallery = document.getElementById('fullGallery');
    var btn = document.querySelector('#gallery .btn--on-dark');
    
    if (gallery.style.display === 'none' || gallery.style.display === '') {
        gallery.style.display = 'block';
        if (btn) btn.textContent = '✕ Close Gallery';
        gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        gallery.style.display = 'none';
        if (btn) btn.textContent = '🖼️ Open Gallery';
    }
}
/* ── SCROLL SPY: Active Nav Link on Scroll ── */
function updateActiveNav() {
    const scrollY = window.scrollY + 120; // নিচে একটু অফসেট
    const sections = document.querySelectorAll('section[id], header[id]');
    let currentId = '';

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
            currentId = section.getAttribute('id');
        }
    });

    // একদম উপরে থাকলে Home সেট করবে
    if (window.scrollY < 100) currentId = 'home';

    const linksWrap = document.querySelector('.nav__links');
    const indicator = document.querySelector('.nav__indicator');

    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('is-active');
        const href = link.getAttribute('href');
        // চেক করবে লিংকটি currentId-এর সাথে মেলে কিনা
        if (href === '#' + currentId || href === '../index.html#' + currentId) {
            link.classList.add('is-active');
            
            // Indicator সরিয়ে নেওয়া
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

// ইভেন্ট লিসেনার যোগ করা
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('resize', updateActiveNav);
updateActiveNav(); // পেজ লোড হলে একবার রান করবে