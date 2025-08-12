/* Lightweight, classy reveal animations using GSAP + ScrollTrigger */
(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function initGSAP() {
  // Apply a temporary class to enable pre-animation hidden state
  const root = document.documentElement;
  root.classList.add('js-anim');
    if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Prefers-reduced-motion: disable animations for accessibility
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    // Lenis smooth scroll
    let lenis = null;
    if (window.Lenis) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3), // cubic out
        smoothWheel: true,
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      if (window.ScrollTrigger) {
        lenis.on('scroll', ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            if (arguments.length) lenis.scrollTo(value, { immediate: true });
            return window.scrollY || document.documentElement.scrollTop;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          }
        });
      }
    }

    // Utility: reveal items with a subtle upward fade
    const reveal = (targets, opts = {}) => {
      const defaults = {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: { each: 0.08, from: 'start' },
        clearProps: 'transform,opacity'
      };
      return gsap.fromTo(targets, { y: defaults.y, opacity: defaults.opacity }, { ...defaults, ...opts, y: 0, opacity: 1 });
    };

  // Initial page load: reveal hero and header quickly
  reveal(['header', '[data-hero] .reveal'], { duration: 0.9, stagger: { each: 0.06 } });
  // Remove the pre-animation class after first frame to prevent FOUC
  requestAnimationFrame(() => root.classList.remove('js-anim'));

    // Section-by-section scroll reveals
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      let items = section.querySelectorAll('.reveal');
      if (!items.length) {
        // Fallback: pick common content nodes for a tasteful reveal
        items = section.querySelectorAll('h2, h3, p, ul li, img, a, .colorful-card');
      }
      if (!items.length) return;

      // Limit to first N to avoid over-animating large sections
      const max = 8;
      const targets = Array.from(items).slice(0, max);

      reveal(targets, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 35%',
          toggleActions: 'play none none reverse',
        }
      });
    });

  // Fancy subtle parallax for KV banners if present
    const kvs = document.querySelectorAll('.kv-banner');
    kvs.forEach((kv) => {
      gsap.to(kv, {
        backgroundPositionY: '+=20',
        ease: 'none',
        scrollTrigger: {
          trigger: kv,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
    });

    // Trophy gentle float on scroll into view
    const trophy = document.querySelector('#trophy img');
    if (trophy) {
      gsap.fromTo(trophy,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#trophy',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
    // Smooth anchor navigation for internal links when Lenis is active
    if (lenis) {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (!href || href === '#') return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80 });
        });
      });
    }

  });
})();
