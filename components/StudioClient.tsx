"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Download, Heart, ImageIcon, Lock, Shield, Sparkles, Upload, Wand, X } from "./Icons";
import { saveRecord } from "@/lib/storage";

type UploadItem = { id: string; file: File; url: string };
type Status = "idle" | "generating" | "success" | "error";

const professions = ["Leadership", "Legal", "Medical", "Real estate", "Founder", "Creative"];
const backdrops = [
  { name: "Warm studio", tone: "warm" },
  { name: "Graphite", tone: "graphite" },
  { name: "Modern office", tone: "office" },
  { name: "Limestone", tone: "stone" },
  { name: "Soft sage", tone: "sage" },
  { name: "Pure white", tone: "white" },
];
const wardrobes = ["Dark tailored suit", "Soft neutral blazer", "Smart casual", "Crisp white shirt", "Creative black", "Medical white coat"];
const expressions = ["Confident and approachable", "Calm authority", "Warm and open", "Focused and direct"];

function buildPrompt(profession: string, backdrop: string, wardrobe: string, expression: string, referenceCount: number) {
  const referenceNote = referenceCount > 1 ? `Use all ${referenceCount} uploaded reference photos together to resolve the subject identity across angles.` : "Use the uploaded reference photo as the identity anchor.";
  return `Create a highly photorealistic professional headshot of the same adult person in the uploaded reference image. ${referenceNote} Preserve their identity, facial geometry, skin tone, hair, eye color, age, and distinguishing features with high fidelity. Art direction: ${profession} professional portrait; wardrobe: ${wardrobe}; background: ${backdrop}; expression: ${expression}. Chest-up composition, natural posture, eye-level camera, realistic 85mm portrait lens, controlled studio lighting with believable catchlights, true-to-life skin texture, subtle depth of field, premium editorial photography. Do not beautify excessively, change ethnicity, change age, change gender presentation, add text, add logos, add jewelry that was not requested, or create an illustration. Output one clean vertical headshot.`;
}

async function optimizeReference(file: File) {
  try {
    const bitmap = await createImageBitmap(file);
    const longestEdge = Math.max(bitmap.width, bitmap.height);
    const scale = Math.min(1, 1400 / longestEdge);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Canvas is unavailable.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(value => value ? resolve(value) : reject(new Error("Image compression failed.")), "image/jpeg", .86);
    });
    const stem = file.name.replace(/\.[^.]+$/, "") || "reference";
    return new File([blob], `${stem}.jpg`, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function StudioClient() {
  const [profession, setProfession] = useState(professions[0]);
  const [backdrop, setBackdrop] = useState(backdrops[0].name);
  const [wardrobe, setWardrobe] = useState(wardrobes[0]);
  const [expression, setExpression] = useState(expressions[0]);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<string>("");
  const [favorite, setFavorite] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadUrlsRef = useRef<string[]>([]);

  useEffect(() => { uploadUrlsRef.current = uploads.map(item => item.url); }, [uploads]);
  useEffect(() => () => uploadUrlsRef.current.forEach(url => URL.revokeObjectURL(url)), []);
  useEffect(() => {
    if (status !== "generating") return;
    setProgress(8);
    const steps = [18, 33, 48, 63, 76, 87, 93];
    let i = 0;
    const timer = window.setInterval(() => {
      setProgress(steps[Math.min(i, steps.length - 1)]);
      i += 1;
      if (i >= steps.length) window.clearInterval(timer);
    }, 1600);
    return () => window.clearInterval(timer);
  }, [status]);

  const quality = useMemo(() => {
    if (!uploads.length) return { score: 0, label: "No photos yet" };
    if (uploads.length === 1) return { score: 62, label: "Good starting point" };
    if (uploads.length === 2) return { score: 82, label: "Strong identity match" };
    return { score: 96, label: "Excellent coverage" };
  }, [uploads.length]);

  function addFiles(files: FileList | File[]) {
    const incoming = Array.from(files).filter(file => /^image\/(jpeg|png|webp)$/i.test(file.type) && file.size <= 10 * 1024 * 1024);
    const available = Math.max(0, 4 - uploads.length);
    const additions = incoming.slice(0, available).map(file => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) }));
    if (!additions.length) {
      setMessage("Use JPG, PNG, or WebP images under 10MB.");
      return;
    }
    setMessage("");
    setUploads(prev => [...prev, ...additions]);
  }

  function onInput(event: ChangeEvent<HTMLInputElement>) { if (event.target.files) addFiles(event.target.files); event.target.value = ""; }
  function onDrop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }
  function removeUpload(id: string) {
    setUploads(prev => {
      const target = prev.find(item => item.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter(item => item.id !== id);
    });
  }

  async function generate() {
    if (!uploads.length) return setMessage("Upload at least one clear photo first.");
    if (!consent) return setMessage("Confirm that you own or have permission to use the photo.");
    setStatus("generating"); setMessage(""); setResult(""); setFavorite(false);
    const form = new FormData();
    try {
      const prepared = await Promise.all(uploads.map(item => optimizeReference(item.file)));
      prepared.forEach((file, index) => form.append("image", file, file.name || `reference-${index + 1}.jpg`));
      form.append("prompt", buildPrompt(profession, backdrop, wardrobe, expression, prepared.length));
      const response = await fetch("/api/generate", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The portrait could not be generated.");
      const image = `data:image/png;base64,${data.image}`;
      setResult(image); setStatus("success"); setProgress(100);
      void saveRecord({ id: crypto.randomUUID(), image, createdAt: new Date().toISOString(), profession, backdrop, wardrobe, expression, favorite: false });
      window.setTimeout(() => document.getElementById("result-panel")?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
    } catch (error) {
      setStatus("error"); setProgress(0); setMessage(error instanceof Error ? error.message : "Something went wrong. Try again.");
    }
  }

  function downloadResult() {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result; a.download = `aragon-${profession.toLowerCase().replaceAll(" ", "-")}-headshot.png`; a.click();
  }

  return (
    <div className="studio-app">
      <div className="studio-topbar">
        <div><p className="eyebrow">Private AI portrait studio</p><h1>Build your professional look.</h1></div>
        <div className="studio-topbar__meta"><span><Shield size={16}/> Secure processing</span><Link href="/gallery">View gallery <ArrowRight size={16}/></Link></div>
      </div>

      <div className="studio-grid">
        <aside className="studio-controls">
          <div className="studio-section-heading"><span>01</span><div><h2>Art direction</h2><p>Define the visual language.</p></div></div>
          <fieldset className="control-group"><legend>Profession</legend><div className="chip-grid">{professions.map(item => <button type="button" key={item} onClick={() => setProfession(item)} className={item === profession ? "control-chip active" : "control-chip"}>{item}</button>)}</div></fieldset>
          <fieldset className="control-group"><legend>Backdrop</legend><div className="swatch-grid">{backdrops.map(item => <button type="button" key={item.name} onClick={() => setBackdrop(item.name)} className={item.name === backdrop ? "swatch-choice active" : "swatch-choice"}><span className={`swatch swatch--${item.tone}`}/><b>{item.name}</b>{item.name === backdrop && <Check size={15}/>}</button>)}</div></fieldset>
          <fieldset className="control-group"><legend>Wardrobe</legend><select value={wardrobe} onChange={e => setWardrobe(e.target.value)}>{wardrobes.map(item => <option key={item}>{item}</option>)}</select></fieldset>
          <fieldset className="control-group"><legend>Expression</legend><select value={expression} onChange={e => setExpression(e.target.value)}>{expressions.map(item => <option key={item}>{item}</option>)}</select></fieldset>
        </aside>

        <section className="studio-upload-panel">
          <div className="studio-section-heading"><span>02</span><div><h2>Your reference photos</h2><p>Use a clear, recent photo with your full face visible.</p></div></div>
          <div className={`upload-zone ${dragging ? "dragging" : ""}`} onDragOver={e => {e.preventDefault(); setDragging(true)}} onDragLeave={() => setDragging(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={e => {if(e.key === "Enter" || e.key === " ") inputRef.current?.click()}}>
            <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" multiple hidden onChange={onInput}/>
            <span className="upload-icon"><Upload/></span><h3>Drop your photos here</h3><p>or click to browse · JPG, PNG, WebP · up to 10MB each</p><button type="button" className="button button--outline button--small">Choose photos</button>
          </div>
          {uploads.length > 0 && <div className="upload-preview-grid">{uploads.map((item, i) => <div className="upload-preview" key={item.id}><Image src={item.url} alt={`Uploaded reference ${i+1}`} fill sizes="160px" unoptimized/><span>{i === 0 ? "Identity anchor" : `Angle ${i+1}`}</span><button type="button" onClick={() => removeUpload(item.id)} aria-label={`Remove upload ${i+1}`}><X size={16}/></button></div>)}{uploads.length < 4 && <button className="add-upload" type="button" onClick={() => inputRef.current?.click()}><ImageIcon/><span>Add angle</span></button>}</div>}
          <div className="quality-card"><div className="quality-card__top"><span>Input quality</span><strong>{quality.label}</strong></div><div className="quality-track"><span style={{width: `${quality.score}%`}}/></div><div className="quality-tips"><span className={uploads.length ? "done" : ""}><Check size={14}/> Face visible</span><span className={uploads.length >= 2 ? "done" : ""}><Check size={14}/> Varied angle</span><span className={uploads.length >= 3 ? "done" : ""}><Check size={14}/> Lighting variety</span></div></div>
          <label className="checkbox-row consent-row"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}/><span>I confirm I own these photos or have permission to use them, and the subject is an adult.</span></label>
          {message && <div className={`status-message ${status === "error" ? "error" : ""}`} role="alert">{message}</div>}
        </section>

        <section className="studio-output-panel" id="result-panel">
          <div className="studio-section-heading"><span>03</span><div><h2>Your headshot</h2><p>The result is generated from your actual upload.</p></div></div>
          {status === "generating" ? <div className="generation-state">
            <div className="generation-skeleton"><span/><span/><span/></div>
            <div className="generation-progress"><div><span>Rendering portrait</span><strong>{progress}%</strong></div><div className="quality-track"><span style={{width:`${progress}%`}}/></div><p>{progress < 45 ? "Reading facial structure and features…" : progress < 78 ? "Building wardrobe, light, and background…" : "Refining skin texture and lens detail…"}</p></div>
          </div> : result ? <div className="result-moment">
            <div className="result-image"><Image src={result} alt="Your generated professional headshot" fill sizes="(max-width: 900px) 80vw, 420px" unoptimized/><div className="result-badge"><Sparkles size={15}/> AI generated from your photo</div></div>
            <div className="result-verdict"><div><span className="verdict-label">Art direction</span><h3>{profession} · {backdrop}</h3><p>{wardrobe} with a {expression.toLowerCase()} expression.</p></div><span className="verdict-score"><strong>2:3</strong><small>1024 × 1536 PNG</small></span></div>
            <div className="result-actions"><button type="button" className="button button--ink" onClick={downloadResult}><Download/> Download PNG</button><button type="button" className={`icon-button ${favorite ? "active" : ""}`} aria-label="Favorite result" onClick={() => setFavorite(v => !v)}><Heart fill={favorite ? "currentColor" : "none"}/></button><button type="button" className="button button--outline" onClick={generate}><Wand/> New variation</button></div>
            <p className="result-note">AI-generated image. Review it before using it for identity-sensitive or regulated purposes.</p>
          </div> : <div className="empty-result">
            <div className="empty-result__frame"><div className="empty-face"><span/><span/><span/></div><div className="empty-shimmer"/></div>
            <h3>Your finished portrait appears here.</h3><p>Choose a look, upload a reference, then generate a real AI headshot.</p>
            <button type="button" className="button button--gradient button--full" onClick={generate} disabled={!uploads.length || !consent}><Sparkles/> Generate headshot</button>
            <div className="secure-line"><Lock size={15}/> Your API key stays server-side.</div>
          </div>}
        </section>
      </div>

      <div className="studio-mobile-cta"><button type="button" className="button button--gradient button--full" onClick={generate} disabled={!uploads.length || !consent || status === "generating"}>{status === "generating" ? "Generating…" : <>Generate headshot <Sparkles/></>}</button></div>
    </div>
  );
}
