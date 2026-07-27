"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Download, Heart, ImageIcon, Sparkles, Wand } from "./Icons";
import { getHistory, HeadshotRecord, setHistory } from "@/lib/storage";

const seeded = [
  { id: "seed-1", image: "/samples/sample-1.jpg", createdAt: "2026-07-20T12:00:00Z", profession: "Leadership", backdrop: "Graphite", wardrobe: "Dark tailored suit", expression: "Calm authority", favorite: true },
  { id: "seed-2", image: "/samples/sample-2.jpg", createdAt: "2026-07-19T12:00:00Z", profession: "Legal", backdrop: "Warm studio", wardrobe: "Soft neutral blazer", expression: "Confident and approachable", favorite: false },
  { id: "seed-3", image: "/samples/sample-3.jpg", createdAt: "2026-07-18T12:00:00Z", profession: "Founder", backdrop: "Modern office", wardrobe: "Smart casual", expression: "Warm and open", favorite: false },
  { id: "seed-4", image: "/samples/sample-4.jpg", createdAt: "2026-07-16T12:00:00Z", profession: "Creative", backdrop: "Soft sage", wardrobe: "Creative black", expression: "Focused and direct", favorite: true },
] satisfies HeadshotRecord[];

export default function GalleryClient() {
  const [items, setItems] = useState<HeadshotRecord[]>(seeded);
  const [filter, setFilter] = useState<"all"|"favorites">("all");
  useEffect(() => { void getHistory().then(live => { if (live.length) setItems([...live, ...seeded]); }); }, []);
  const shown = useMemo(() => filter === "favorites" ? items.filter(item => item.favorite) : items, [items, filter]);

  function toggleFavorite(id: string) {
    setItems(prev => {
      const next = prev.map(item => item.id === id ? {...item, favorite: !item.favorite} : item);
      void setHistory(next.filter(item => !item.id.startsWith("seed-")));
      return next;
    });
  }
  function download(item: HeadshotRecord) {
    const a = document.createElement("a"); a.href = item.image; a.download = `aragon-${item.profession.toLowerCase()}-${item.id}.png`; a.click();
  }

  return <div className="gallery-app">
    <div className="gallery-toolbar">
      <div><p className="eyebrow">Your portrait library</p><h1>Headshots worth keeping.</h1><p>Generated portraits are saved in this browser. Favorite, download, or make a new variation.</p></div>
      <Link className="button button--gradient" href="/studio"><Wand/> New headshot</Link>
    </div>
    <div className="gallery-filter" role="tablist" aria-label="Gallery filter"><button role="tab" aria-selected={filter === "all"} className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All portraits <span>{items.length}</span></button><button role="tab" aria-selected={filter === "favorites"} className={filter === "favorites" ? "active" : ""} onClick={() => setFilter("favorites")}>Favorites <span>{items.filter(item => item.favorite).length}</span></button></div>
    {shown.length ? <div className="gallery-grid">{shown.map((item, index) => <article className="gallery-card" key={`${item.id}-${index}`}>
      <div className="gallery-card__image"><Image src={item.image} alt={`${item.profession} AI headshot`} fill sizes="(max-width: 700px) 92vw, 320px" unoptimized={item.image.startsWith("data:")}/><button className={`gallery-favorite ${item.favorite ? "active" : ""}`} onClick={() => toggleFavorite(item.id)} aria-label={item.favorite ? "Remove from favorites" : "Add to favorites"}><Heart size={18} fill={item.favorite ? "currentColor" : "none"}/></button><span className="gallery-ai"><Sparkles size={13}/> AI portrait</span></div>
      <div className="gallery-card__body"><div><h2>{item.profession}</h2><p>{item.backdrop} · {item.wardrobe}</p></div><button onClick={() => download(item)} aria-label="Download portrait"><Download size={18}/></button></div>
    </article>)}</div> : <div className="gallery-empty"><ImageIcon size={34}/><h2>No favorites yet.</h2><p>Tap the heart on a portrait to keep your strongest options together.</p><button className="button button--outline" onClick={() => setFilter("all")}>View all portraits <ArrowRight/></button></div>}
  </div>;
}
