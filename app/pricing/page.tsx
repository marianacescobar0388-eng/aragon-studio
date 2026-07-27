import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Shield, Sparkles } from "@/components/Icons";

const plans = [
  { name: "Starter", price: "$35", desc: "A polished set for a profile refresh.", features: ["40 generated headshots", "6 curated style combinations", "High-resolution downloads", "Basic background editor"], cta: "Choose Starter" },
  { name: "Standard", price: "$49", desc: "The strongest mix of variety and control.", features: ["60 generated headshots", "12 curated style combinations", "High-fidelity identity matching", "Background and wardrobe edits", "Priority generation"], cta: "Choose Standard", popular: true },
  { name: "Executive", price: "$75", desc: "A full visual library for senior visibility.", features: ["100 generated headshots", "20+ style combinations", "4K-ready upscale", "Full editor access", "Fastest processing", "Redo protection"], cta: "Choose Executive" },
];

export default function PricingPage() {
  return <main><Header/>
    <section className="pricing-hero section-grain"><div className="container"><p className="eyebrow">One-time purchase</p><h1>A photo shoot’s worth of options.<br/><em>Without the photo shoot.</em></h1><p>Pick the size of gallery you need. No subscription, no scheduling, and no surprise retouching fees.</p></div></section>
    <section className="pricing-section"><div className="container pricing-grid">{plans.map(plan => <article className={`pricing-card ${plan.popular ? "pricing-card--popular" : ""}`} key={plan.name}>
      {plan.popular && <div className="popular-ribbon"><Sparkles size={15}/> Most popular</div>}
      <div className="pricing-card__head"><span>{plan.name}</span><div><strong>{plan.price}</strong><small>one time</small></div><p>{plan.desc}</p></div>
      <ul>{plan.features.map(feature => <li key={feature}><Check size={17}/>{feature}</li>)}</ul>
      <Link href="/sign-up" className={`button button--full ${plan.popular ? "button--gradient" : "button--outline"}`}>{plan.cta}<ArrowRight/></Link>
    </article>)}</div>
      <div className="container pricing-note"><Shield/><div><strong>Private by design.</strong><p>Your source images are sent securely to the generation provider and are not displayed publicly by this app.</p></div></div>
    </section>
    <section className="section pricing-faq"><div className="container"><div className="section-heading section-heading--split"><div><p className="eyebrow">Good to know</p><h2>Clear answers before you upload.</h2></div><p>This reconstruction keeps the business model simple: pay once for a gallery, then keep what you create.</p></div><div className="faq-grid">
      <article><h3>How many photos should I upload?</h3><p>One clear selfie is enough for the working studio. Two to four varied angles can improve identity consistency.</p></article>
      <article><h3>How long does generation take?</h3><p>Most API generations complete in under two minutes, though high-demand periods can take longer.</p></article>
      <article><h3>Can I use the result commercially?</h3><p>Check the image-model provider’s current terms and your local rules. You should only upload images you own or have permission to use.</p></article>
      <article><h3>Is this the official Aragon service?</h3><p>No. This is an independent, functional product reconstruction built from public reference material.</p></article>
    </div></div></section>
    <Footer/>
  </main>;
}
