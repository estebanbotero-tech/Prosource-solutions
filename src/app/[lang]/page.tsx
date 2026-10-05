import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Solutions from "@/components/Solutions/Solutions";
import WhyUs from "@/components/WhyUs/WhyUs";
import Process from "@/components/Process/Process";
import CTA from "@/components/CTA/CTA";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Solutions />
      <WhyUs />
      <Process />
      <CTA />
      <Contact />
    </>
  );
}
