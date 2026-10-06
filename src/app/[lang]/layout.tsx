import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.scss";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget/WhatsAppWidget";
import { locales, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/I18nProvider";
import Analytics from "@/components/Analytics/Analytics";
import { company } from "@/data/company";

const inter = Inter({ subsets: ["latin"] });
// Display face for headings (variable font, exposed as --font-display)
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const [street, city] = company.contact.addresses[0].split("\n");
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: company.siteUrl,
  logo: `${company.siteUrl}/logo.webp`,
  email: company.contact.email,
  telephone: company.contact.phoneHref,
  address: { "@type": "PostalAddress", streetAddress: street, addressLocality: city, addressCountry: "CO" },
  sameAs: [company.social.instagram, company.social.facebook, company.social.linkedin].filter(Boolean),
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    metadataBase: new URL(company.siteUrl),
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description, type: "website", locale: lang === "es" ? "es_CO" : "en_US" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    // suppressHydrationWarning: the inline script sets data-theme before React hydrates
    <html lang={lang} className={display.variable} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint (no flash); no saved choice = follow the OS */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body className={inter.className}>
        <I18nProvider lang={lang} dict={getDictionary(lang)}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
          <Analytics />
        </I18nProvider>
        <script
          type="application/ld+json"
          // Organization data for Google (address, contact, social profiles)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
