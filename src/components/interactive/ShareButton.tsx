"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        if ((err as Error).name !== "AbortError") {
          fallbackCopy(url);
        }
      }
    } else {
      fallbackCopy(url);
    }
  };

  const fallbackCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <button 
      onClick={handleShare}
      className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all group"
    >
      <div className="h-11 w-11 rounded-xl glass flex items-center justify-center group-hover:border-primary/30 transition-all">
        <Share2 className="h-4.5 w-4.5" />
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider">Share</span>
    </button>
  );
}
