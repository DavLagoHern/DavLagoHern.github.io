const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealNodes = [...document.querySelectorAll('[data-reveal]')];

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealNodes.forEach((node) => observer.observe(node));

  const depth = document.querySelector('[data-depth]');
  if (depth) {
    window.addEventListener('scroll', () => {
      depth.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.08, 42)}px, 0)`;
    }, { passive: true });
  }
}

const header = document.querySelector('[data-header]');
if (header) {
  window.addEventListener('scroll', () => header.classList.toggle('solid', window.scrollY > 24), { passive: true });
}
