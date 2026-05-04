import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global defaults
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

// ScrollTrigger defaults
ScrollTrigger.defaults({ toggleActions: 'play none none none' });

export { gsap, ScrollTrigger };
