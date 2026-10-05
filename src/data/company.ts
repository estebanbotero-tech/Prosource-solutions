// Non-translatable company data. Texts live in src/i18n/es.ts and src/i18n/en.ts.
export const company = {
  name: "Prosource Solutions",
  // TODO: replace with the real NIT before publishing (required by Ley 1581 de 2012).
  nit: "[NIT pendiente]",
  // Contact form submissions are delivered here (via formsubmit.co).
  formRecipient: "boteroestebanc13@gmail.com",
  contact: {
    email: "info@prosource.com.co",
    phone: "+57 314 811 4635",
    phoneHref: "+573148114635",
    addresses: [
      "Calle 79B sur #50 150 501\nLa Estrella, Antioquia",
      "Carrera 23 #63-23 1003A\nManizales, Caldas",
    ],
  },
  // Leave a network empty ("") to hide its icon in the footer.
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    whatsapp: "https://wa.me/573148114635",
  },
  stats: ["+15", "+100", "+500", "24/7"],
};

export const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace('\n', ', '))}`;
