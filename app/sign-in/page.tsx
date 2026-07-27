import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import Logo from "@/components/Logo";
import { ArrowRight, Star } from "@/components/Icons";

export default function SignInPage() {
  return <main className="auth-page">
    <section className="auth-panel">
      <div className="auth-panel__top"><Logo/><Link href="/">Back to site <ArrowRight size={16}/></Link></div>
      <div className="auth-panel__body"><p className="eyebrow">Welcome back</p><h1>Return to your best angle.</h1><p>Log in to create a new portrait, revisit your gallery, or download a favorite.</p><AuthForm mode="sign-in"/></div>
    </section>
    <aside className="auth-art">
      <div className="auth-art__quote"><div className="stars">{[1,2,3,4,5].map(n => <Star size={15} key={n}/>)}</div><blockquote>“It looked like me on the most confident day of my career.”</blockquote><p>— Morgan Hale, founder</p></div>
      <div className="auth-art__portraits">
        <div><Image src="/samples/sample-2.jpg" alt="Professional headshot example" fill sizes="380px"/></div>
        <div><Image src="/samples/sample-1.jpg" alt="Professional headshot example" fill sizes="380px"/></div>
      </div>
    </aside>
  </main>;
}
