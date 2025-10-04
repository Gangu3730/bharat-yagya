import React from "react";
import MainHero from "./MainHero";
import PitruSlider from "./PitruSlider";
import DonationForm from "./DonationForm";
import DonationOptionCards from "./DonationOptionCards";
import Contributors from "./contributors";
import VideoCarousel from "./VideoCarousel";
import FAQSection from "./FAQSection";
import NationPledge from "./NationPledge";
import './index.css';

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <main>
      <Section id="home">
        <MainHero />
      </Section>

      <Section id="pitru-slider" className="bg-orange-50">
        <PitruSlider />
      </Section>

      <Section id="donation-cards" className="bg-orange-50">
        <DonationOptionCards />
      </Section>

      <Section id="contributors" className="bg-orange-100">
        <Contributors />
      </Section>

      <Section id="donation-form" className="bg-orange-50">
        <DonationForm />
      </Section>
         <Section id="donation-form" className="bg-orange-50">
        <VideoCarousel />
      </Section>
       <Section id="donation-form" className="bg-orange-50">
        <FAQSection /> 
      </Section>
       <NationPledge />
      


 

    </main>
  );
}
