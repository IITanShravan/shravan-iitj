"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Float away in random directions slightly
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 3 + 2;
        this.alpha = 1.0;

        // Alternate colors between cyan and purple glow
        const isCyan = Math.random() > 0.4;
        this.color = isCyan ? "6, 182, 212" : "168, 85, 247"; // rgb of cyan / purple
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size = Math.max(0.1, this.size - 0.05);
        this.alpha -= 0.02; // Fade out slowly
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        // Radial gradient for neon laser glow effect
        const gradient = c.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, `rgba(${this.color}, ${this.alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);
        
        c.fillStyle = gradient;
        c.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn particles on mouse move
      // Add a couple of particles for a nice trail intensity
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    // Initial size setup
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles = particles.filter((p) => {
        p.update();
        if (p.alpha > 0) {
          p.draw(ctx);
          return true;
        }
        return false;
      });

      // Keep particles count in check to avoid memory lag
      if (particles.length > 150) {
        particles.shift();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
