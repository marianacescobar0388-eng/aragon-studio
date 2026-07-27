import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import Logo from "@/components/Logo";
import { ArrowRight, Check } from "@/components/Icons";

export default function SignUpPage() {
  return <main className="auth-page">
    <section className="auth-panel">
      <div className="auth-panel__top"><Logo/><Link href="/">Back to site <ArrowRight size={16}/></Link></div>
      <div className="auth-panel__body"><p className="eyebrow">Your private studio</p><h1>One selfie. A stronger first impression.</h1><p>Create an account to save your headshots and generation history on this device.</p><AuthForm mode="sign-up"/></div>
    </section>
    <aside className="auth-art auth-art--signup">
      <div className="signup-promise"><p className="eyebrow eyebrow--light">Included</p><h2>Everything you need to make the photo feel right.</h2><ul><li><Check/> Profession-specific art direction</li><li><Check/> High-fidelity face preservation</li><li><Check/> Wardrobe and background control</li><li><Check/> Download-ready 1024px portrait</li></ul></div>
      <div className="signup-portrait"><Image src="/samples/sample-4.jpg" alt="AI professional headshot example" fill sizes="420px"/></div>
    </aside>
  </main>;
}
