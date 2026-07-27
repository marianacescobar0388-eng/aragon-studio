import Image from "next/image";

const items = [
  { src: "/samples/sample-1.jpg", label: "Studio charcoal", cls: "mosaic-card--one" },
  { src: "/samples/sample-2.jpg", label: "Warm office", cls: "mosaic-card--two" },
  { src: "/samples/sample-3.jpg", label: "Editorial gray", cls: "mosaic-card--three" },
  { src: "/samples/sample-4.jpg", label: "Natural light", cls: "mosaic-card--four" },
];

export default function PortraitMosaic() {
  return (
    <div className="portrait-stage" aria-label="Sample AI headshots">
      <div className="portrait-orbit portrait-orbit--one" />
      <div className="portrait-orbit portrait-orbit--two" />
      {items.map((item, index) => (
        <figure className={`mosaic-card ${item.cls}`} key={item.src}>
          <Image src={item.src} alt={`Professional headshot sample: ${item.label}`} fill sizes="(max-width: 700px) 42vw, 260px" priority={index < 2}/>
          <figcaption><span className="ai-dot"/> AI generated</figcaption>
        </figure>
      ))}
      <div className="portrait-proof"><strong>2.5M+</strong><span>professionals photographed</span></div>
    </div>
  );
}
