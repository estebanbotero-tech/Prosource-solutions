import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Legal from "@/components/Legal/Legal";
import { hasLocale } from "@/i18n/config";
import { legal } from "@/i18n/legal";

export async function generateMetadata({ params }: PageProps<'/[lang]/terms'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: `${legal[lang].terms.title} | Prosource Solutions` } : {};
}

export default async function TermsPage({ params }: PageProps<'/[lang]/terms'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Legal doc={legal[lang].terms} />;
}
