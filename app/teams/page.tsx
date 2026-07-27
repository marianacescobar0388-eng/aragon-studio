import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Building, Check, Shield, Sparkles, Upload, Users } from "@/components/Icons";

export default function TeamsPage() {
  return <main><Header/>
    <section className="teams-hero section-grain"><div className="container teams-hero-grid"><div><p className="eyebrow">Team headshots, coordinated once</p><h1>One company.<br/><em>One visual standard.</em></h1><p>Give every employee a private studio while keeping wardrobe, backdrop, and crop consistent across the company.</p><div className="hero-actions"><Link href="/sign-up" className="button button--gradient">Create a team workspace <ArrowRight/></Link><a href="#workflow" className="text-link">See the workflow <ArrowRight size={17}/></a></div></div><div className="team-dashboard-mock"><div className="team-dashboard-top"><div><span className="dashboard-dot"/><b>Northstar team</b></div><span>24 / 32 complete</span></div><div className="completion-bar"><span/></div><div className="member-list">{[[2,"Amara Singh","Complete"],[1,"Eli Morgan","Complete"],[3,"Noah Park","Generating"],[4,"Sofia Bell","Needs upload"]].map(([n,name,status]) => <div key={name as string}><Image src={`/samples/sample-${n}.jpg`} alt="" width={44} height={44}/><span><b>{name}</b><small>{status}</small></span><i className={`status-dot status-dot--${String(status).toLowerCase().replace(" ", "-")}`}/></div>)}</div><button className="button button--ink button--full">Invite team members <Users size={17}/></button></div></div></section>

    <section className="section team-benefits"><div className="container"><div className="section-heading section-heading--center"><p className="eyebrow">Built for distributed teams</p><h2>Consistency without the coordination tax.</h2><p>Lock the parts that define your brand. Let each person upload privately from wherever they are.</p></div><div className="benefit-grid">
      <article><span><Building/></span><h3>Brand-controlled looks</h3><p>Standardize backdrop, wardrobe direction, framing, and image dimensions.</p></article>
      <article><span><Users/></span><h3>Private member onboarding</h3><p>Each teammate uploads their own photos. Admins see status without handling source files.</p></article>
      <article><span><Shield/></span><h3>Central governance</h3><p>Manage access, completion, and final downloads from one clear dashboard.</p></article>
      <article><span><Sparkles/></span><h3>Built-in editing</h3><p>Regenerate variations and refine a background without booking another session.</p></article>
    </div></div></section>

    <section className="section team-workflow" id="workflow"><div className="container"><div className="section-heading section-heading--split"><div><p className="eyebrow eyebrow--light">The workflow</p><h2>From invite to company directory.</h2></div><p>Designed around four moments that a real people-ops or brand team needs to control.</p></div><div className="workflow-list">
      <article><span>01</span><div><Users/><h3>Invite</h3><p>Send a private link by email or share a QR code at onboarding and events.</p></div></article>
      <article><span>02</span><div><Upload/><h3>Upload</h3><p>Employees add their own images and see clear quality guidance before submitting.</p></div></article>
      <article><span>03</span><div><Sparkles/><h3>Generate</h3><p>The shared visual recipe is applied across every portrait for a coherent result.</p></div></article>
      <article><span>04</span><div><Check/><h3>Approve</h3><p>Admins review completion and export final selections individually or in bulk.</p></div></article>
    </div></div></section>

    <section className="section team-case"><div className="container team-case-grid"><div className="team-case-copy"><p className="eyebrow">The business case</p><h2>Replace scattered photo days with one repeatable system.</h2><p>A traditional multi-location photo program creates travel, vendor, scheduling, retouching, and file-management overhead. A controlled AI workflow converts that into a single onboarding process.</p><ul className="check-list"><li><Check/> New hires can complete headshots asynchronously</li><li><Check/> Remote teams get the same visual treatment</li><li><Check/> Brand updates can be rolled out without reshooting</li></ul><Link href="/pricing" className="button button--outline">View team pricing <ArrowRight/></Link></div><div className="cost-card"><span>Illustrative annual program</span><div className="cost-row"><p>Traditional photo days</p><strong>$18,400</strong></div><div className="cost-row"><p>AI headshot workspace</p><strong>$4,800</strong></div><div className="cost-savings"><p>Potential savings</p><strong>$13,600</strong><span>74%</span></div><small>Example only; actual pricing and savings vary by team size and vendor.</small></div></div></section>
    <Footer/>
  </main>;
}
