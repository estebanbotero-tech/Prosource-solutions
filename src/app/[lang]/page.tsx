import Hero from "@/components/Hero/Hero";
import TrustBar from "@/components/TrustBar/TrustBar";
import Services from "@/components/Services/Services";
import CaseStudies from "@/components/CaseStudies/CaseStudies";
import Estimator from "@/components/Estimator/Estimator";
import Solutions from "@/components/Solutions/Solutions";
import WhyUs from "@/components/WhyUs/WhyUs";
import About from "@/components/About/About";
import Team from "@/components/Team/Team";
import Process from "@/components/Process/Process";
import CTA from "@/components/CTA/CTA";
import Contact from "@/components/Contact/Contact";
import type { Metadata } from "next";
import { locales } from "@/i18n/config";

// Canonical + hreflang for the home page (subpages keep their own URLs)
export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <CaseStudies />
      <Solutions />
      <WhyUs />
      <About />
      <Team />
      <Process />
      <Estimator />
      <CTA />
      <Contact />
    </>
  );
}
