import Link from "next/link";
import { Trophy, Search, Menu, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary glow-primary transition-all duration-300 group-hover:scale-110">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold tracking-tight text-xl">
              Sevens<span className="gradient-text">Arena</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/european-football", label: "European Football" },
              { href: "/nigerian-football", label: "Nigerian Football" },
              { href: "/nba", label: "NBA" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
            <Search className="h-4.5 w-4.5" />
            <span className="sr-only">Search</span>
          </button>
          <Link
            href="/admin/login"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-border hover:bg-white/5 transition-all"
          >
            <Zap className="h-4 w-4 text-primary" />
            Dashboard
          </Link>
          <button className="md:hidden h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
