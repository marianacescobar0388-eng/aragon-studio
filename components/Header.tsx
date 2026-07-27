"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ArrowRight, Menu, X } from "./Icons";

const links = [
  ["/studio", "AI Headshots"],
  ["/teams", "For teams"],
  ["/pricing", "Pricing"],
  ["/gallery", "Gallery"],
] as const;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href="/sign-in" className="nav-login">Log in</Link>
          <Link href="/studio" className="button button--small button--ink">Create headshots <ArrowRight size={16}/></Link>
          <button className="menu-button" type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="container">
            {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/sign-in">Log in</Link>
            <Link href="/sign-up" className="button button--ink">Create an account <ArrowRight size={16}/></Link>
          </div>
        </nav>
      )}
    </header>
  );
}
