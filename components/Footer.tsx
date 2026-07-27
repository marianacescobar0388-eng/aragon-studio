import Link from "next/link";
import Logo from "./Logo";
import { ArrowRight } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-cta">
        <div>
          <p className="eyebrow eyebrow--light">A better first impression</p>
          <h2>Look like you hired the best photographer in town.</h2>
        </div>
        <Link href="/studio" className="button button--cream">Create your headshots <ArrowRight size={18}/></Link>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo dark />
          <p>Photorealistic professional headshots from the photos already on your phone.</p>
        </div>
        <div><h3>Product</h3><Link href="/studio">AI Headshots</Link><Link href="/gallery">Gallery</Link><Link href="/pricing">Pricing</Link></div>
        <div><h3>Teams</h3><Link href="/teams">For business</Link><Link href="/teams#workflow">Workflow</Link><Link href="/security">Security</Link></div>
        <div><h3>Account</h3><Link href="/sign-in">Log in</Link><Link href="/sign-up">Create account</Link><Link href="/gallery">My photos</Link></div>
      </div>
      <div className="container footer-bottom"><span>Independent product reconstruction for demonstration.</span><span>© 2026 Aragon Studio</span></div>
    </footer>
  );
}
