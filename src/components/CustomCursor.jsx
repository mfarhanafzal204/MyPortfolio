import { useEffect, useRef } from 'react';
import { lerp } from '../utils/lerp';

export default function CustomCursor() {
  const dotRef = useRef();
  const ringRef = useRef();
  const rafRef = useRef();
  const pos = useRef({ mouseX: 0, mouseY: 0, dotX: 0, dotY: 0 });

  useEffect(() => {
    // Only on pointer devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      pos.current.mouseX = e.clientX;
      pos.current.mouseY = e.clientY;
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const onMouseEnterInteractive = () => ring.classList.add('hovered');
    const onMouseLeaveInteractive = () => ring.classList.remove('hovered');

    const onMouseDown = () => {
      ring.style.transform = ring.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(0.5)';
    };
    const onMouseUp = () => {
      ring.style.transform = ring.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(1)';
    };

    const animate = () => {
      pos.current.dotX = lerp(pos.current.dotX, pos.current.mouseX, 0.15);
      pos.current.dotY = lerp(pos.current.dotY, pos.current.mouseY, 0.15);
      ring.style.transform = `translate(${pos.current.dotX - 20}px, ${pos.current.dotY - 20}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Interactive elements
    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
