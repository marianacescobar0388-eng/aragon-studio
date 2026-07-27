import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Lock, Shield } from "@/components/Icons";

export default function SecurityPage() {
  return <main><Header/><section className="security-hero"><div className="container"><span className="security-icon"><Shield size={34}/></span><p className="eyebrow">Security & privacy</p><h1>Your face is sensitive data.<br/><em>The product should act like it.</em></h1><p>This demo keeps API credentials on the server and stores generated history locally in the browser.</p></div></section><section className="section"><div className="container security-grid"><article><Lock/><h2>Server-side API key</h2><p>The OpenAI key is read from an environment variable in the server route and never sent to the browser.</p></article><article><Shield/><h2>Private local history</h2><p>Generated images and metadata are saved to localStorage on the current device for this reconstruction.</p></article><article><Check/><h2>Consent gate</h2><p>The studio requires confirmation that the uploader owns the image or has permission and that the subject is an adult.</p></article></div></section><Footer/></main>;
}
