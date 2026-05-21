"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor if mobile/touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Track when hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive") ||
        target.closest(".interactive")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Smooth trailing effect for the larger ring
  useEffect(() => {
    if (!isVisible) return;
    
    let animationId: number;
    const lerp = (start: number, end: number, speed: number) => {
      return start + (end - start) * speed;
    };

    const updateTrail = () => {
      setTrail((prev) => ({
        x: lerp(prev.x, position.x, 0.15),
        y: lerp(prev.y, position.y, 0.15),
      }));
      animationId = requestAnimationFrame(updateTrail);
    };

    updateTrail();

    return () => cancelAnimationFrame(animationId);
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision inner dot */}
      <div
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${clicked ? 0.8 : hovered ? 1.5 : 1})`,
        }}
      />
      {/* Glowing trailing aura */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 border border-cyan-400/40 bg-cyan-400/5`}
        style={{
          width: hovered ? "48px" : "24px",
          height: hovered ? "48px" : "24px",
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) scale(${clicked ? 0.9 : 1})`,
          opacity: clicked ? 0.8 : hovered ? 0.4 : 0.2,
          boxShadow: hovered ? "0 0 15px rgba(6, 182, 212, 0.3)" : "none",
        }}
      />
    </>
  );
}
