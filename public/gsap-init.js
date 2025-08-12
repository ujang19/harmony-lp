/* Premium light animations using GSAP + ScrollTrigger */
(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function initGSAP() {
    if (!window.gsap) return;
  // Enable ScrollTrigger for luxury animations
  const ST_ENABLED = true;
  if (ST_ENABLED && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Prefers-reduced-motion: disable animations (and Lenis) for accessibility
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      document.documentElement.classList.remove('js-anim');
      return;
    }

    const root = document.documentElement;
    root.classList.add('js-anim');

    // Global GSAP defaults for premium feel
    gsap.defaults({ duration: 0.9, ease: 'power2.out' });

    // Lenis smooth scroll
    let lenis = null;
    if (window.Lenis) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        smoothTouch: false,
      });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);

      if (ST_ENABLED && window.ScrollTrigger) {
        lenis.on('scroll', ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            if (arguments.length) lenis.scrollTo(value, { immediate: true });
            return window.scrollY || document.documentElement.scrollTop;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
        });
        ScrollTrigger.addEventListener('refresh', () => { if (lenis && lenis.resize) lenis.resize(); });
      }
    }

    // Utility: reveal items with a subtle upward fade/scale
    const reveal = (targets, opts = {}) => {
      const defaults = {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        stagger: { each: 0.08, from: 'start' },
        clearProps: 'transform,opacity',
        onStart: function () {
          const t = this.targets();
          t && t.forEach?.(el => (el.style.willChange = 'transform, opacity'));
        },
        onComplete: function () {
          const t = this.targets();
          t && t.forEach?.(el => (el.style.willChange = ''));
        }
      };
      return gsap.fromTo(targets, { y: defaults.y, opacity: defaults.opacity }, { ...defaults, ...opts, y: 0, opacity: 1 });
    };

    // Luxury: light sweep shimmer utility on elements with [data-shimmer]
    const setupShimmer = () => {
      const shimmers = document.querySelectorAll('[data-shimmer]');
      shimmers.forEach((el) => {
        // ensure relative positioning
        el.style.position = el.style.position || 'relative';
        // create overlay if not exists
        let overlay = el.querySelector(':scope > .shimmer');
        if (!overlay) {
          overlay = document.createElement('span');
          overlay.className = 'shimmer';
          Object.assign(overlay.style, {
            position: 'absolute',
            inset: '-10%',
            background: 'linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0) 60%)',
            transform: 'translateX(-120%) rotate(0.001deg)',
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            filter: 'blur(0.5px)',
          });
          el.appendChild(overlay);
        }
        // animate sweep on scroll enter
        if (ST_ENABLED && window.ScrollTrigger) {
          gsap.fromTo(overlay, { xPercent: -120 }, {
            xPercent: 120,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reset',
            }
          });
        } else {
          // fallback: play once after slight delay
          gsap.fromTo(overlay, { xPercent: -120 }, { xPercent: 120, duration: 1.4, ease: 'power3.out', delay: 0.2 });
        }
      });
    };

    // Parallax subtlety for brand patterns and hero images
    const setupParallax = () => {
      const parallaxEls = document.querySelectorAll('[data-parallax]');
      parallaxEls.forEach((el) => {
        const strength = parseFloat(el.getAttribute('data-parallax')) || 20; // px range
        if (ST_ENABLED && window.ScrollTrigger) {
          gsap.to(el, {
            y: () => strength,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });
        }
      });
    };

    // Initial page load reveals for key sections
    reveal(['header', '[data-hero] .reveal'], { duration: 1.0, ease: 'expo.out', stagger: { each: 0.08 } });
    requestAnimationFrame(() => root.classList.remove('js-anim'));

    // Section reveals on scroll
    if (ST_ENABLED && window.ScrollTrigger) {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((sec) => {
        const items = sec.querySelectorAll('.reveal, h2, h3, p, .colorful-card');
        if (!items.length) return;
        reveal(items, {
          y: 18,
          stagger: { each: 0.06 },
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });
    }

    // Run luxury effects
    setupShimmer();
    setupParallax();

    // Refresh ScrollTrigger to account for dynamically added overlays
    if (ST_ENABLED && window.ScrollTrigger) {
      setTimeout(() => { ScrollTrigger.refresh(); }, 50);
    }

  });
})();
