import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    let raf;
    const animate = () => {
      setTrailPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.1,
        y: prev.y + (pos.y - prev.y) * 0.1,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  return (
    <>
      <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-glow-trail" style={{ left: trailPos.x, top: trailPos.y }} />
    </>
  );
}