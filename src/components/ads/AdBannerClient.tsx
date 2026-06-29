"use client";

import { useEffect, useRef, useState } from "react";
import { trackAdImpression, trackAdClick } from "@/app/actions/ads";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdPlacement } from "@prisma/client";

interface AdBannerClientProps {
  adId: string;
  placement: AdPlacement;
  imageUrl: string;
  targetUrl: string;
  altText: string;
}

export function AdBannerClient({ adId, placement, imageUrl, targetUrl, altText }: AdBannerClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTrackedImpression, setHasTrackedImpression] = useState(false);

  useEffect(() => {
    if (hasTrackedImpression) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          trackAdImpression(adId, placement);
          setHasTrackedImpression(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [adId, placement, hasTrackedImpression]);

  const handleClick = () => {
    trackAdClick(adId, placement);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl bg-muted/30 border border-border group"
    >
      <div className="absolute top-2 right-2 z-10 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
        SPONSORED
      </div>
      <Link
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onClick={handleClick}
      >
        <div className="aspect-[21/9] md:aspect-[4/1] w-full relative">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
              Learn More <ExternalLink className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
