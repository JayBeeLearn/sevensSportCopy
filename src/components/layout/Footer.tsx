import Link from "next/link";
import { Trophy, Globe, MessageCircle, Tv } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 mt-20">
      {/* Gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px animated-border" />
      
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary glow-primary">
                <Trophy className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-extrabold tracking-tight text-xl">
                Sevens<span className="gradient-text">Arena</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your ultimate destination for high-performance, real-time sports news, insights, and interactive discussions.
            </p>
            <div className="flex gap-3 pt-2">
              {[MessageCircle, Tv, Globe].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-lg flex items-center justify-center border border-border hover:bg-white/5 hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Sports</h3>
              <ul className="space-y-3">
                {[
                  { href: "/european-football", label: "European Football" },
                  { href: "/nigerian-football", label: "Nigerian Football" },
                  { href: "/nba", label: "NBA" },
                  { href: "/athletics", label: "Athletics" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact" },
                  { href: "/careers", label: "Careers" },
                  { href: "/advertise", label: "Advertise" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Legal</h3>
              <ul className="space-y-3">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/cookies", label: "Cookie Policy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Sevens Sports Arena. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built for speed <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Designed for fans
          </p>
        </div>
      </div>
    </footer>
  );
}
