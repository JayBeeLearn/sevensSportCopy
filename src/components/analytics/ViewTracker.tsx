"use client";

import { useEffect, useRef } from "react";

export function ViewTracker({ postId }: { postId: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    
    // Track view asynchronously without blocking
    fetch("/api/views", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
      // Use keepalive to ensure request completes even if user navigates away quickly
      keepalive: true,
    }).catch(console.error);

    tracked.current = true;
  }, [postId]);

  return null;
}
