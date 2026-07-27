import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PortraitMosaic from "@/components/PortraitMosaic";
import { ArrowRight, Check, Clock, Shield, Sparkles, Star, Upload, Users, Wand } from "@/components/Icons";

const steps = [
  { n: "01", icon: <Sparkles/>, title: "Choose your look", text: "Set your profession, wardrobe, background, and the energy you want to project." },
  { n: "02", icon: <Upload/>, title: "Upload a clear selfie", text: "One strong photo works. Add a few angles when you want even tighter identity matching." },
  { n: "03", icon: <Wand/>, title: "Generate in minutes", text: "Our image model preserves your facial identity while rebuilding light, wardrobe, and setting." },
  { n: "04", icon: <Check/>, title: "Pick your winner", text: "Download, favorite, and regenerate variations until the portrait feels unmistakably like you." },
];

const gallery = [
  ["/samples/sample-2.jpg", "Legal", "Warm limestone"],
  ["/samples/sample-1.jpg", "Leadership", "Studio graphite"],
  ["/samples/sample-4.jpg", "Founder", "Window light"],
  ["/samples/sample-3.jpg", "Creative", "Soft gray"],
  ["/samples/sample-5.jpg", "Consulting", "Executive office"],
];

export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="hero section-grain">
        <div className="container hero-grid">
          <div className="hero-copy" data-reveal>
            <div className="rank-pill"><span>AI</span> Professional portrait studio, rebuilt</div>
            <h1>Headshots that look <em>photographed,</em> not generated.</h1>
            <p className="hero-lede">Skip the $500 photo shoot. Turn one good selfie into a polished, natural professional portrait—without leaving home.</p>
            <div className="hero-actions">
              <Link href="/studio" className="button button--gradient">Create your headshot <ArrowRight/></Link>
              <Link href="/gallery" className="text-link">See real examples <ArrowRight size={17}/></Link>
            </div>
            <div className="trust-row">
              <div className="avatar-stack" aria-hidden="true">
                {[1,2,4,3].map(n => <Image key={n} src={`/samples/sample-${n}.jpg`} alt="" width={34} height={34}/>)}
              </div>
              <div><div className="stars">{[1,2,3,4,5].map(n => <Star size={14} key={n}/>)}</div><p><strong>Photorealistic by design</strong><br/>Multi-angle input · high-resolution output</p></div>
            </div>
            <p className="privacy-note"><Shield size={16}/> Your images are processed securely and never shown publicly.</p>
          </div>
          <div className="hero-visual" data-reveal><PortraitMosaic /></div>
        </div>
      </section>

      <section className="logo-strip" aria-label="Professional headshot use cases">
        <div className="container"><span>LinkedIn</span><span>Resumes</span><span>Team pages</span><span>Press kits</span><span>Speaker bios</span><span>Directories</span></div>
      </section>

      <section className="section how" id="how-it-works">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">The whole shoot, minus the shoot</p><h2>From camera roll to career-ready.</h2></div>
            <p>Aragon’s defining move is simple: it takes your existing photos and gives you the control of a professional photo session—attire, setting, light, and mood—without scheduling one.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, i) => <article className="step-card" key={step.n} style={{"--delay": `${i*80}ms`} as CSSProperties} data-reveal>
              <div className="step-top"><span className="step-number">{step.n}</span><span className="step-icon">{step.icon}</span></div>
              <h3>{step.title}</h3><p>{step.text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section results-section">
        <div className="container">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">The result is the product</p>
            <h2>Natural skin. Credible light. Your actual face.</h2>
            <p>Not a glossy avatar. A portfolio of believable portraits designed for LinkedIn, resumes, company pages, press, and speaker bios.</p>
          </div>
          <div className="results-rail">
            {gallery.map(([src, role, setting], index) => (
              <figure className={`result-card result-card--${index+1}`} key={src}>
                <Image src={src} alt={`${role} headshot in ${setting} style`} fill sizes="(max-width: 700px) 72vw, 280px"/>
                <figcaption><span>{role}</span><small>{setting}</small></figcaption>
              </figure>
            ))}
          </div>
          <div className="center-action"><Link href="/studio" className="button button--ink">Make yours now <ArrowRight/></Link></div>
        </div>
      </section>

      <section className="section studio-preview-section">
        <div className="container studio-preview">
          <div className="studio-preview__copy">
            <p className="eyebrow eyebrow--light">Craft the frame</p>
            <h2>Your profession has a visual language. Choose it.</h2>
            <p>Build a look from carefully art-directed combinations instead of scrolling through a wall of generic presets.</p>
            <ul className="check-list">
              <li><Check/> Executive, legal, medical, founder, and creative direction</li>
              <li><Check/> Studio, office, architecture, and natural backgrounds</li>
              <li><Check/> Business formal, smart casual, and editorial wardrobe</li>
            </ul>
            <Link href="/studio" className="button button--cream">Open the studio <ArrowRight/></Link>
          </div>
          <div className="style-board" aria-label="Headshot style selector preview">
            <div className="style-board__bar"><span/><span/><span/><b>Look builder</b></div>
            <div className="style-board__content">
              <p className="micro-label">01 · Profession</p>
              <div className="choice-row"><button className="choice active">Leadership</button><button className="choice">Legal</button><button className="choice">Medical</button></div>
              <p className="micro-label">02 · Backdrop</p>
              <div className="backdrop-row"><button className="backdrop swatch-stone active"/><button className="backdrop swatch-ink"/><button className="backdrop swatch-office"/></div>
              <p className="micro-label">03 · Wardrobe</p>
              <div className="choice-row"><button className="choice active">Dark suit</button><button className="choice">Soft tailoring</button></div>
              <div className="style-output"><Image src="/samples/sample-2.jpg" alt="Selected professional headshot preview" fill sizes="360px"/><span>Confident · natural · modern</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section team-teaser">
        <div className="container team-teaser-grid">
          <div className="team-collage">
            {[1,2,3,4].map((n) => <div className={`team-portrait team-portrait--${n}`} key={n}><Image src={`/samples/sample-${n}.jpg`} alt="Team member headshot" fill sizes="240px"/></div>)}
          </div>
          <div>
            <p className="eyebrow">For teams</p>
            <h2>One visual standard. Every person, anywhere.</h2>
            <p>Invite teammates, lock the wardrobe and background, track completion, and export a consistent company gallery without coordinating a photographer.</p>
            <div className="metric-row"><div><strong>100</strong><span>headshots per member</span></div><div><strong>20%</strong><span>bulk savings</span></div><div><strong>1</strong><span>shared visual system</span></div></div>
            <Link href="/teams" className="button button--outline">Explore team headshots <ArrowRight/></Link>
          </div>
        </div>
      </section>

      <section className="section value-grid-section">
        <div className="container value-grid">
          <article className="value-card value-card--orange"><Clock/><p className="eyebrow eyebrow--light">Time</p><h3>Minutes, not calendar weeks.</h3><p>Generate on demand. No travel, scheduling, reshoots, or editing queue.</p></article>
          <article className="value-card value-card--cream"><Shield/><p className="eyebrow">Privacy</p><h3>Your photo stays your photo.</h3><p>Uploads are used only to create your result and are not published in a public gallery.</p></article>
          <article className="value-card value-card--mint"><Users/><p className="eyebrow">Scale</p><h3>Consistent from one person to 10,000.</h3><p>A shared style system keeps a distributed team looking like one company.</p></article>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container testimonial-layout">
          <blockquote>“The first result I saved looked like a very expensive photographer caught me on my best day—still me, just properly lit.”</blockquote>
          <div className="testimonial-person"><Image src="/samples/sample-4.jpg" alt="Portrait of testimonial customer" width={58} height={58}/><div><strong>Jamie Chen</strong><span>VP, Product Marketing</span></div></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
