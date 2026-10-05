import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Legal from "@/components/Legal/Legal";
import { hasLocale } from "@/i18n/config";
import { legal } from "@/i18n/legal";

export async function generateMetadata({ params }: PageProps<'/[lang]/privacy'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: `${legal[lang].privacy.title} | Prosource Solutions` } : {};
}

export default async function PrivacyPage({ params }: PageProps<'/[lang]/privacy'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Legal doc={legal[lang].privacy} />;
}
