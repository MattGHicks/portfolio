import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import FlagshipWork from "@/components/home/FlagshipWork";
import PracticeIndex from "@/components/home/PracticeIndex";
import HowIWork from "@/components/home/HowIWork";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import "@/styles/home.css";

export default function Home() {
  return (
    <>
      <Navigation isHomepage />
      <main id="main">
        <Hero />
        <FlagshipWork />
        <PracticeIndex />
        <HowIWork />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
