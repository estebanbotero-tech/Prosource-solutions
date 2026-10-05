import Hero from "@/components/Hero/Hero";
import TrustBar from "@/components/TrustBar/TrustBar";
import Services from "@/components/Services/Services";
import CaseStudies from "@/components/CaseStudies/CaseStudies";
import Estimator from "@/components/Estimator/Estimator";
import Solutions from "@/components/Solutions/Solutions";
import WhyUs from "@/components/WhyUs/WhyUs";
import About from "@/components/About/About";
import Process from "@/components/Process/Process";
import CTA from "@/components/CTA/CTA";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <CaseStudies />
      <Estimator />
      <Solutions />
      <WhyUs />
      <About />
      <Process />
      <CTA />
      <Contact />
    </>
  );
}
