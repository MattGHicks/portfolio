import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Thesis from "@/components/home/Thesis";
import WorkGallery from "@/components/home/WorkGallery";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import "@/styles/home.css";

export default function HomePage() {
  return (
    <div className="home">
      <div className="home-vignette" aria-hidden="true" />
      <Navigation isHomepage />
      <Hero />
      <Thesis />
      <WorkGallery />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
