/* =============================================
   KAULA TREE - GSAP ANIMATIONS
   ============================================= */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ========================
// PRELOADER
// ========================
const preloader = {
  init() {
    const tl = gsap.timeline();

    tl.to('.preloader-progress', {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut'
    })
    .to('.preloader-logo', {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    }, '-=0.3')
    .to('#preloader', {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        document.getElementById('preloader').style.display = 'none';
        hero.init();
        scrollAnimations.init();
        sectionEnhancements.init();
      }
    }, '-=0.2');
  }
};

// ========================
// HERO ANIMATIONS
// ========================
const hero = {
  init() {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate hero background zoom
    gsap.from('.hero-fallback-img', {
      scale: 1.2,
      duration: 2,
      ease: 'power2.out'
    });

    // Title lines stagger
    tl.from('.hero-line', {
      yPercent: 110,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.15
    }, 0.1);

    // CTA buttons
    tl.to('.hero-cta', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.9);

    // Parallax effect on hero image on scroll (skip on touch devices — scrub causes jank)
    if (window.innerWidth > 1024) {
      gsap.to('.hero-fallback-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Fade hero content on scroll
      gsap.to('.hero-content', {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: '60% top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }
};

// ========================
// NAVBAR
// ========================
const navbar = {
  init() {
    const nav = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }
};

// ========================
// MOBILE MENU
// ========================
const mobileMenu = {
  init() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
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
    // Fade Up animations
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

    // Image reveal animations
    gsap.utils.toArray('[data-animate="reveal"]').forEach(el => {
      const img = el.querySelector('img');

      gsap.fromTo(el,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      if (img) {
        gsap.from(img, {
          scale: 1.3,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // Counter animations
    this.initCounters();

    // Parallax on quote section
    this.initParallax();

    // Stagger card animations
    this.initCardStagger();

    // Text split animation for mission
    this.initMissionText();
  },

  initCounters() {
    const digits = '0123456789';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const slotDuration = 1;

    function buildSlotMachine(el, finalText) {
      el.textContent = '';
      el.style.display = 'flex';
      el.style.justifyContent = 'center';
      el.style.gap = '0';

      const reels = [];

      for (let i = 0; i < finalText.length; i++) {
        const char = finalText[i];
        const isDigit = /[0-9]/.test(char);
        const isLetter = /[A-Za-z]/.test(char);

        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.height = '1.1em';
        wrapper.style.verticalAlign = 'bottom';

        if (!isDigit && !isLetter) {
          // Static characters (apostrophe, space, etc)
          wrapper.style.width = char === ' ' ? '0.3em' : 'auto';
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'block';
          wrapper.appendChild(span);
          el.appendChild(wrapper);
          reels.push(null);
          continue;
        }

        const pool = isDigit ? digits : letters;
        const spins = 6 + Math.floor(Math.random() * 3);
        let reelText = '';
        for (let s = 0; s < spins; s++) {
          reelText += pool;
        }
        // End on the target character
        const targetIndex = pool.indexOf(char.toUpperCase());
        reelText += pool.substring(0, targetIndex + 1);

        const strip = document.createElement('span');
        strip.style.display = 'block';
        strip.style.whiteSpace = 'pre';
        strip.style.lineHeight = '1.1em';
        strip.innerHTML = reelText.split('').map(c => `<span style="display:block;text-align:center">${c}</span>`).join('');

        wrapper.appendChild(strip);
        el.appendChild(wrapper);

        const totalChars = reelText.length;
        const totalDistance = -(totalChars - 1) * 1.1;

        reels.push({ strip, totalDistance, index: i, totalChars });
      }

      return reels;
    }

    function spinReels(reels, el, finalText) {
      const totalReelCount = reels.filter(r => r !== null).length;
      let completed = 0;
      reels.forEach((reel, i) => {
        if (!reel) return;

        const reelIndex = reels.slice(0, i).filter(r => r !== null).length;
        const staggerDelay = (reelIndex / totalReelCount) * 0.3;

        gsap.fromTo(reel.strip,
          { y: 0 },
          {
            y: `${reel.totalDistance}em`,
            duration: slotDuration - staggerDelay,
            delay: staggerDelay,
            ease: 'power2.inOut',
            onComplete: function() {
              completed++;
              if (completed === totalReelCount && el && finalText) {
                el.textContent = finalText;
                el.style.display = '';
                el.style.gap = '';
              }
            }
          }
        );
      });
    }

    const isMobile = window.innerWidth <= 768;

    // All stat items with counters
    gsap.utils.toArray('[data-animate="counter"]').forEach(el => {
      const numberEl = el.querySelector('.stat-number');
      if (!numberEl || numberEl.classList.contains('text-special')) return;

      const target = parseInt(numberEl.dataset.count);
      const suffix = numberEl.dataset.suffix || '';
      const finalText = String(target) + suffix;

      if (isMobile) {
        numberEl.textContent = finalText;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true
          }
        });
        return;
      }

      const reels = buildSlotMachine(numberEl, finalText);

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          once: true,
          onEnter: () => spinReels(reels, numberEl, finalText)
        }
      });
    });

    // Text-special stat items
    gsap.utils.toArray('.stat-number.text-special').forEach(el => {
      const parent = el.closest('.stat-item');
      const finalText = el.textContent;

      if (isMobile) {
        gsap.to(parent, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 95%',
            once: true
          }
        });
        return;
      }

      const reels = buildSlotMachine(el, finalText);

      gsap.to(parent, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 95%',
          once: true,
          onEnter: () => spinReels(reels, el, finalText)
        }
      });
    });
  },

  initParallax() {
    if (window.innerWidth <= 1024) return;
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
      gsap.to('.parallax-bg img', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  },

  initCardStagger() {
    const isMobile = window.innerWidth <= 900;

    // Trip cards stagger
    const tripCards = gsap.utils.toArray('.trip-card');
    if (tripCards.length) {
      if (isMobile) {
        tripCards.forEach(card => gsap.set(card, { opacity: 1, y: 0 }));
      } else {
        tripCards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
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

    // Teaching cards stagger
    const teachingCards = gsap.utils.toArray('.teaching-card');
    if (teachingCards.length) {
      if (isMobile) {
        teachingCards.forEach(card => gsap.set(card, { opacity: 1, y: 0 }));
      } else {
        teachingCards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
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

    // Team cards
    const teamCards = gsap.utils.toArray('.team-card');
    if (teamCards.length) {
      if (isMobile) {
        teamCards.forEach(card => gsap.set(card, { opacity: 1, y: 0 }));
      } else {
        teamCards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
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
  },

  initMissionText() {
    const missionText = document.querySelector('.mission-text');
    if (!missionText) return;

    // Skip word-split animation on mobile/tablet — causes bad line breaks
    if (window.innerWidth <= 900) {
      gsap.set(missionText, { opacity: 1, y: 0 });
      return;
    }

    // Split into words and wrap
    const text = missionText.textContent;
    const words = text.split(' ');
    missionText.innerHTML = words.map(word =>
      `<span class="word-wrap"><span class="word">${word}</span></span>`
    ).join(' ');

    // Add styles for word wrap
    const style = document.createElement('style');
    style.textContent = `
      .word-wrap {
        display: inline-block;
        overflow: hidden;
        vertical-align: top;
        padding-bottom: 4px;
      }
      .word {
        display: inline-block;
      }
    `;
    document.head.appendChild(style);

    // Animate words
    gsap.from('.mission-text .word', {
      yPercent: 100,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.03,
      scrollTrigger: {
        trigger: '.mission-text',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Also set the parent to visible
    gsap.set('.mission-text', { opacity: 1, y: 0 });
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

    // Detect if cursor is over dark sections
    document.addEventListener('mousemove', e => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const section = el.closest('.section-dark, .hero, .footer, .parallax-section');
      cursor.classList.toggle('on-dark', !!section);
    });

    // Scale effect on hovering buttons and links
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
// SMOOTH SCROLL
// ========================
const smoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
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
// SECTION TRANSITIONS
// ========================
const sectionTransitions = {
  init() {
    const isMobile = window.innerWidth <= 900;

    if (!isMobile) {
      gsap.utils.toArray('.section').forEach(section => {
        // Animated line at bottom of each section
        const line = document.createElement('div');
        line.style.cssText = 'position:absolute;bottom:0;left:50%;width:0;height:1px;transform:translateX(-50%);transition:width 1.2s cubic-bezier(0.16,1,0.3,1);';
        line.style.background = section.classList.contains('section-dark')
          ? 'rgba(172,173,97,0.15)' : 'rgba(113,84,66,0.1)';
        section.style.position = 'relative';
        section.appendChild(line);

        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          onEnter: () => { line.style.width = '80%'; }
        });
      });
    }

    // Section tag line reveal
    gsap.utils.toArray('.section-tag').forEach(tag => {
      ScrollTrigger.create({
        trigger: tag,
        start: 'top 90%',
        onEnter: () => tag.classList.add('is-visible')
      });
    });
  }
};

// ========================
// HOMEPAGE SECTION ENHANCEMENTS
// ========================
const sectionEnhancements = {
  init() {
    const isMobile = window.innerWidth <= 900;

    // --- STAT DIVIDERS: grow height (no data-animate on these) ---
    if (!isMobile) {
      const dividers = gsap.utils.toArray('.stat-divider');
      dividers.forEach(div => {
        gsap.from(div, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: div,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });
    }

    // --- SCRIPTURE: parallax text drift on scroll (skip on touch devices) ---
    if (window.innerWidth > 1024) {
      const parallaxContent = document.querySelector('.parallax-content');
      if (parallaxContent) {
        gsap.to(parallaxContent, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.parallax-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }

    // --- TRIP HERO CARD: add slide-in on top of fade-up ---
    const tripHeroCard = document.querySelector('.trip-hero-card');
    if (tripHeroCard) {
      // This adds an x offset — the existing fade-up handles opacity+y
      gsap.set(tripHeroCard, { x: -40 });
      ScrollTrigger.create({
        trigger: tripHeroCard,
        start: 'top 85%',
        onEnter: () => gsap.to(tripHeroCard, { x: 0, duration: 1, ease: 'power3.out' })
      });
    }

    // Skip per-element ScrollTriggers on mobile to reduce scroll listener overhead
    if (!isMobile) {
      // --- APP FEATURES: stagger list items (no data-animate on li's) ---
      const appLis = gsap.utils.toArray('.app-features li');
      if (appLis.length) {
        appLis.forEach((li, i) => {
          gsap.from(li, {
            x: -30,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: li,
              start: 'top 92%',
              toggleActions: 'play none none none'
            }
          });
        });
      }

      // --- APP STORE BUTTONS: bounce in (no data-animate on these) ---
      const appBtns = gsap.utils.toArray('.app-store-btn');
      if (appBtns.length) {
        appBtns.forEach((btn, i) => {
          gsap.from(btn, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.2 + i * 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: btn,
              start: 'top 92%',
              toggleActions: 'play none none none'
            }
          });
        });
      }

      // --- FOOTER: stagger link groups (no data-animate) ---
      const footerGroups = gsap.utils.toArray('.footer-links-group');
      if (footerGroups.length) {
        footerGroups.forEach((group, i) => {
          gsap.from(group, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 95%',
              toggleActions: 'play none none none'
            }
          });
        });
      }

      // --- FOOTER BRAND: fade in (no data-animate) ---
      const footerBrand = document.querySelector('.footer-brand');
      if (footerBrand) {
        gsap.from(footerBrand, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerBrand,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        });
      }
    }
  }
};

// ========================
// PHONE MOCKUP ANIMATION
// ========================
const phoneMockup = {
  init() {
    const phone = document.querySelector('.phone-frame');
    if (!phone) return;

    gsap.from('.phone-frame', {
      y: 80,
      rotation: 5,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.app-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    // Floating animation
    gsap.to('.phone-frame', {
      y: -15,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: '.app-section',
        start: 'top 70%',
        toggleActions: 'play pause resume pause'
      }
    });

    // Animate screenshot image
    gsap.from('.phone-screen-img', {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.app-section',
        start: 'top 60%',
        toggleActions: 'play none none none'
      }
    });
  }
};

// ========================
// TILT EFFECT ON CARDS
// ========================
const tiltCards = {
  init() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.trip-card, .teaching-card').forEach(card => {
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
// INITIALIZE EVERYTHING
// ========================
document.addEventListener('DOMContentLoaded', () => {
  navbar.init();
  mobileMenu.init();
  smoothScroll.init();
  cursorFollower.init();
  magneticButtons.init();
  sectionTransitions.init();
  phoneMockup.init();
  tiltCards.init();

  // Start preloader (which triggers hero and scroll animations)
  preloader.init();
});

// Refresh ScrollTrigger on resize (debounced, width-only to avoid mobile address bar triggers)
let lastWidth = window.innerWidth;
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      ScrollTrigger.refresh();
    }
  }, 200);
});

// ========================
// VIDEO MODAL
// ========================
(function() {
  const trigger = document.getElementById('videoTrigger');
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const closeBtn = document.getElementById('videoClose');
  const backdrop = document.getElementById('videoModalBackdrop');

  if (!trigger || !modal) return;

  const videoId = trigger.dataset.videoId;

  function openModal() {
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
})();
