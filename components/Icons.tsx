import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function ArrowRight({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
}
export function Sparkles({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m12 3-1.2 3.2L7.5 7.5l3.3 1.3L12 12l1.2-3.2 3.3-1.3-3.3-1.3L12 3Z"/><path d="m18.5 13-.7 1.8-1.8.7 1.8.7.7 1.8.7-1.8 1.8-.7-1.8-.7-.7-1.8Z"/><path d="m5.5 13.5-.8 2.2-2.2.8 2.2.8.8 2.2.8-2.2 2.2-.8-2.2-.8-.8-2.2Z"/></svg>;
}
export function Shield({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
}
export function Upload({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 20h14"/></svg>;
}
export function Download({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>;
}
export function Heart({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/></svg>;
}
export function Wand({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m15 4 5 5L8 21H3v-5L15 4Z"/><path d="m13 6 5 5"/><path d="M6 4V2"/><path d="M5 3h2"/><path d="M20 16v-2"/><path d="M19 15h2"/></svg>;
}
export function Check({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m5 12 4 4L19 6"/></svg>;
}
export function Lock({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;
}
export function Users({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>;
}
export function Building({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M3 21h18"/><path d="M6 21V5l6-2v18"/><path d="M18 21V9l-6-2"/><path d="M9 9h.01"/><path d="M9 13h.01"/><path d="M9 17h.01"/><path d="M15 13h.01"/><path d="M15 17h.01"/></svg>;
}
export function ImageIcon({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>;
}
export function Menu({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>;
}
export function X({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m6 6 12 12"/><path d="M18 6 6 18"/></svg>;
}
export function Star({ size, ...props }: IconProps) {
  return <svg {...base(size)} fill="currentColor" strokeWidth="0" {...props}><path d="m12 2.6 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.2l6.2-.9L12 2.6Z"/></svg>;
}
export function Clock({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}
export function Eye({ size, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>;
}
