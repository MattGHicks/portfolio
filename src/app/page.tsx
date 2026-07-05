import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import ProofLine from "@/components/home/ProofLine";
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
        <ProofLine />
        <FlagshipWork />
        <div className="wd-rule" />
        <PracticeIndex />
        <div className="wd-rule" />
        <HowIWork />
        <div className="wd-rule" />
        <About />
        <div className="wd-rule" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
