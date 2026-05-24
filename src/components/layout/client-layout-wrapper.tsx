"use client";

import { useEffect, useState } from "react";
import WarpSpeedLoader from "@/components/canvas/warp-speed-loader";
import CursorTrail from "@/components/layout/cursor-trail";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if system has already booted in this session to prevent loading screens on subpage reloads
    const booted = sessionStorage.getItem("shravan_system_booted");
    if (booted === "true") {
      setLoading(false);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("shravan_system_booted", "true");
    setLoading(false);
  };

  return (
    <>
      {loading && <WarpSpeedLoader onComplete={handleBootComplete} />}
      <CursorTrail />
      {/* High-tech matrix screen overlay scanline utility */}
      <div className="scanlines" />
      <div className={loading ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-1000"}>
        {children}
      </div>
    </>
  );
}
