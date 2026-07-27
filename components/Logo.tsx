import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className={`brand ${dark ? "brand--dark" : ""}`} aria-label="Aragon.ai home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__inner">A</span>
      </span>
      <span>Aragon<span className="brand-dot">.ai</span></span>
    </Link>
  );
}
