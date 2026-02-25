/* =============================================
   KAULA TREE - SUBPAGE ANIMATIONS
   Lighter version of animations.js for inner pages
   ============================================= */

gsap.registerPlugin(ScrollTrigger);

// ========================
// NAVBAR (always solid on subpages)
// ========================
const navbar = {
  init() {
    const nav = document.getElementById('navbar');
    if (nav) {
      nav.classList.add('navbar-solid');
    }
  }
};

// ========================
// MOBILE MENU
// ========================
const mobileMenu = {
  init() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    const links = menu.querySelectorAll('.mobile-link');

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
};

// ========================
// SCROLL ANIMATIONS
// ========================
const scrollAnimations = {
  init() {
    gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
      const delay = el.dataset.delay || 0;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: parseFloat(delay),
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }
};

// ========================
// PAGE HERO ANIMATION
// ========================
const pageHero = {
  init() {
    const tag = document.querySelector('.page-hero-tag');
    const title = document.querySelector('.page-hero-title');
    const desc = document.querySelector('.page-hero-desc');
    const breadcrumb = document.querySelector('.breadcrumb');

    const tl = gsap.timeline({ delay: 0.1 });

    if (breadcrumb) {
      tl.from(breadcrumb, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
      }, 0);
    }

    if (tag) {
      tl.from(tag, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
      }, 0.1);
    }

    if (title) {
      tl.from(title, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      }, 0.2);
    }

    if (desc) {
      tl.from(desc, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out'
      }, 0.35);
    }
  }
};

// ========================
// CURSOR FOLLOWER
// ========================
const cursorFollower = {
  init() {
    if (window.innerWidth < 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(render);
    };
    render();

    document.addEventListener('mousemove', e => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const section = el.closest('.section-dark, .page-hero, .footer, .parallax-section');
      cursor.classList.toggle('on-dark', !!section);
    });

    const interactiveEls = document.querySelectorAll('a, button');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '60px';
        cursor.style.height = '60px';
        cursor.style.borderColor = 'rgba(172, 173, 97, 0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = '';
      });
    });
  }
};

// ========================
// MAGNETIC BUTTONS
// ========================
const magneticButtons = {
  init() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }
};

// ========================
// CARD STAGGER
// ========================
const cardStagger = {
  init() {
    const cards = gsap.utils.toArray('.trip-card, .teaching-card, .team-card, .about-value-card');
    if (cards.length) {
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      });
    }
  }
};

// ========================
// TILT CARDS
// ========================
const tiltCards = {
  init() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.trip-card, .teaching-card, .about-value-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: x * 6,
          rotateX: -y * 6,
          transformPerspective: 800,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }
};

// ========================
// INITIALIZE
// ========================
document.addEventListener('DOMContentLoaded', () => {
  navbar.init();
  mobileMenu.init();
  pageHero.init();
  scrollAnimations.init();
  cursorFollower.init();
  magneticButtons.init();
  cardStagger.init();
  tiltCards.init();
});

window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
