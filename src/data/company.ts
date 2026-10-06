// Non-translatable company data. Texts live in src/i18n/es.ts and src/i18n/en.ts.
export const company = {
  name: "Prosource Solutions",
  legalName: "Prosource Solutions S.A.S.",
  // Public site URL (canonical links, sitemap, social previews). Override with NEXT_PUBLIC_SITE_URL.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://prosource.com.co",
  // Google Analytics 4 measurement ID (G-XXXXXXX). Analytics stays off until it's set.
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  // TODO: replace with the real NIT before publishing (required by Ley 1581 de 2012).
  nit: "[NIT pendiente]",
  // Contact form submissions are delivered here (via formsubmit.co).
  formRecipient: "boteroestebanc13@gmail.com",
  contact: {
    email: "info@prosource.com.co",
    phone: "+57 314 841 4635",
    phoneHref: "+573148414635",
    addresses: [
      "Calle 79B sur #50-150 501\nLa Estrella, Antioquia",
      "Carrera 23 #63-23 1003A\nManizales, Caldas",
    ],
  },
  // Leave a network empty ("") to hide its icon in the footer.
  social: {
    instagram: "https://www.instagram.com/prosourcesolutions",
    facebook: "https://www.facebook.com/ProsourceSolutionsSAS",
    linkedin: "https://www.linkedin.com/company/prosource-solutions-sas",
    whatsapp: "https://wa.me/573148414635",
  },
  stats: ["+15", "+100", "+500", "24/7"],
};

// Keyless Google Maps embed for the contact mini map. Uses the building address without the
// office number ("501"), which otherwise makes Google pin a neighbouring business.
export const mapQuery = "Calle 79B Sur #50-150, La Estrella, Antioquia, Colombia";
export const mapEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

export const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace('\n', ', '))}`;
