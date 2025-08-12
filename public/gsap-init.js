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
    if (!window.gsap) return;
  // Toggle ScrollTrigger usage (off for now per request)
  const ST_ENABLED = false;
  if (ST_ENABLED && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Prefers-reduced-motion: disable animations (and Lenis) for accessibility
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      // Ensure nothing is hidden in CSS pre-state when animations are disabled
      document.documentElement.classList.remove('js-anim');
      return;
    }

    // Apply a temporary class to enable pre-animation hidden state
    const root = document.documentElement;
    root.classList.add('js-anim');

    // Global GSAP defaults for premium feel
    gsap.defaults({ duration: 0.9, ease: 'power2.out' });

    // Lenis smooth scroll
    let lenis = null;
  // Lenis smooth scroll (safe settings)
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

  if (ST_ENABLED && window.ScrollTrigger) {
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

        // Keep measurements in sync
        ScrollTrigger.addEventListener('refresh', () => {
          if (lenis && lenis.resize) lenis.resize();
        });
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

  // Initial page load: reveal hero and header only (kept independent of scroll)
  reveal(['header', '[data-hero] .reveal'], { duration: 1.0, ease: 'expo.out', stagger: { each: 0.08 } });
    // Remove the pre-animation class after first frame to prevent FOUC
    requestAnimationFrame(() => root.classList.remove('js-anim'));

    // Section-by-section scroll reveals
    // Section-by-section scroll reveals (disabled while ScrollTrigger is off)
    if (ST_ENABLED && window.ScrollTrigger) {
      // GSAP disabled entirely; file kept for reference.
      sections.forEach((section) => {
