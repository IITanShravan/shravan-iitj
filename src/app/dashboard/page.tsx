"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs text-zinc-400">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Rerouting kernel paths to `/admin` dashboard control...</span>
      </div>
    </div>
  );
}
