import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";

export default function GalleryPage() {
  return <main className="gallery-page"><Header/><div className="container gallery-page-shell"><GalleryClient/></div><Footer/></main>;
}
