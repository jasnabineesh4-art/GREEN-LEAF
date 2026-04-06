document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════
    //  PAGE LOADER
    // ══════════════════════════════════════════
    const loader = document.getElementById('page-loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            setTimeout(() => loader.remove(), 700);
        }, 800);
    });

    // ══════════════════════════════════════════
    //  CUSTOM CURSOR
    // ══════════════════════════════════════════
    const cursor     = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
    });

    const lerpCursor = () => {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top  = ry + 'px';
        requestAnimationFrame(lerpCursor);
    };
    lerpCursor();

    document.querySelectorAll('a, button, .gallery-item, .feature-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });

    // ══════════════════════════════════════════
    //  NAVBAR SCROLL EFFECT
    // ══════════════════════════════════════════
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ══════════════════════════════════════════
    //  MOBILE MENU
    // ══════════════════════════════════════════
    const menuBtn  = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }
    document.querySelectorAll('.nav-links li a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // ══════════════════════════════════════════
    //  TYPING EFFECT IN HERO
    // ══════════════════════════════════════════
    const typingEl = document.getElementById('typing-text');
    if (typingEl) {
        const words = ['Tranquility', 'Adventure', 'Luxury', 'Nature', 'Memories'];
        let wi = 0, ci = 0, deleting = false;
        const type = () => {
            const word = words[wi];
            typingEl.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
            let delay = deleting ? 60 : 110;
            if (!deleting && ci === word.length + 1) { deleting = true; delay = 1800; }
            else if (deleting && ci === 0)            { deleting = false; wi = (wi + 1) % words.length; delay = 400; }
            setTimeout(type, delay);
        };
        setTimeout(type, 1500);
    }

    // ══════════════════════════════════════════
    //  PARALLAX HERO
    // ══════════════════════════════════════════
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = `calc(center + ${scrolled * 0.4}px)`;
        });
    }

    // ══════════════════════════════════════════
    //  SCROLL REVEAL — stagger & directional
    // ══════════════════════════════════════════
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    const observeReveals = () => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            revealObserver.observe(el);
        });
    };
    observeReveals();

    // ══════════════════════════════════════════
    //  ANIMATED COUNTERS
    // ══════════════════════════════════════════
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el    = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                let current = 0;
                const step  = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current + suffix;
                }, 25);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

    // ══════════════════════════════════════════
    //  MAGNETIC BUTTONS
    // ══════════════════════════════════════════
    document.querySelectorAll('.btn-primary-large, .btn-secondary-large, .btn-outline').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const dx   = e.clientX - (rect.left + rect.width  / 2);
            const dy   = e.clientY - (rect.top  + rect.height / 2);
            btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px) scale(1.06)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ══════════════════════════════════════════
    //  TILT CARDS
    // ══════════════════════════════════════════
    document.querySelectorAll('.feature-card, .room-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ══════════════════════════════════════════
    //  GALLERY — build grid with stagger
    // ══════════════════════════════════════════
    const galleryContainer = document.getElementById('gallery-container');
    const galleryImages = [
        "1a282303-176c-4ea0-a82b-f810bb25c038.jfif",
        "29c67359-4e0b-45db-a06a-a42f3333bce0.jfif",
        "32b7ec7d-d155-42a9-a65d-9995d1b3ff13.jfif",
        "38f94a3c-3f06-4f2b-ba06-7277f696fc0d.jfif",
        "4539635e-1a5f-43c4-81b3-52c848ae3db7.jfif",
        "4eb6adc9-dc35-4864-aaba-375bda2a3b1b.jfif",
        "53eae7c2-aa5d-47c5-96f1-9f68b716d91c.jfif",
        "59494cec-f4ea-4af8-b3f3-b8fb373dc752.jfif",
        "655e2b5c-bff4-47d8-8509-8cf3a9445a97.jfif",
        "6c7fcea4-0c01-4d8b-8d66-5c57f46c208f.jfif",
        "7390d7c2-1c6f-4a18-92cb-ae487ed8d35c.jfif",
        "80f13459-a5f5-4299-ab9f-62e5172e069b.jfif",
        "9441ec56-44ae-4ed3-829e-ada70a761727.jfif",
        "ac4855d3-44e1-42ea-90f3-f1937c099949.jfif",
        "af8030eb-4d4a-4e5b-bc2a-d26f08cc9b37.jfif",
        "be66f44f-0888-4a30-a47d-3c79b285f859.jfif",
        "c527c2e4-9297-49ac-9648-e98af856a8a4.jfif",
        "c95ffd24-747e-4394-a298-93cdc8b6f702.jfif",
        "e6ae6c00-55a3-4b08-a00a-57440bc5839d.jfif",
        "e6ee41e7-cc0d-45e9-b1fc-516bee8f6d97.jfif",
        "e84081aa-19cc-42c1-9997-31fb81c29e8b.jfif",
        "ef1c6ea6-37ff-40de-8e9c-5a61f6e510a9.jfif",
        "f761a848-bafa-469a-9bce-4fae6cd5c550.jfif"
    ];

    if (galleryContainer) {
        galleryImages.forEach((img, i) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal';
            item.style.animationDelay = `${i * 0.05}s`;
            item.innerHTML = `
                <img src="image/${img}" alt="Green Leaf Homestay Photo ${i + 1}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>`;
            item.addEventListener('click', () => openLightbox(`image/${img}`));
            galleryContainer.appendChild(item);
        });
        observeReveals(); // re-observe newly added elements
    }

    // ══════════════════════════════════════════
    //  LIGHTBOX
    // ══════════════════════════════════════════
    const lightbox      = document.getElementById('lightbox');
    const lightboxImg   = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    const openLightbox = (src) => {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ══════════════════════════════════════════
    //  FLOATING PARTICLES IN HERO
    // ══════════════════════════════════════════
    const particlesContainer = document.getElementById('hero-particles');
    if (particlesContainer) {
        for (let i = 0; i < 22; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.cssText = `
                left: ${Math.random() * 100}%;
                width: ${Math.random() * 6 + 3}px;
                height: ${Math.random() * 6 + 3}px;
                animation-delay: ${Math.random() * 8}s;
                animation-duration: ${Math.random() * 6 + 7}s;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            particlesContainer.appendChild(p);
        }
    }

    // ══════════════════════════════════════════
    //  SMOOTH ACTIVE NAV LINK
    // ══════════════════════════════════════════
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links li a');
    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(a => a.classList.remove('nav-active'));
                const active = document.querySelector(`.nav-links li a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('nav-active');
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => activeNavObserver.observe(s));

});
