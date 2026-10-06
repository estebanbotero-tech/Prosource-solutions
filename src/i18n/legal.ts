import { company } from '@/data/company';
import type { Locale } from './config';

// Base legal texts under Colombian law. Must be reviewed by a lawyer before publishing.
export type LegalDoc = { title: string; updated: string; intro: string; sections: { h: string; p: string[] }[] };

const { name, nit, contact, gaId } = company;
const addr = contact.addresses[0].replace('\n', ', ');

export const legal: Record<Locale, { privacy: LegalDoc; terms: LegalDoc }> = {
  es: {
    privacy: {
      title: "Política de Tratamiento de Datos Personales",
      updated: "Última actualización: 5 de octubre de 2026",
      intro: `${name} se compromete con la protección de los datos personales de sus clientes, usuarios y aliados. Esta política explica cómo recolectamos, usamos, almacenamos y protegemos tu información, en cumplimiento del artículo 15 de la Constitución Política, la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013 (compilado en el Decreto Único Reglamentario 1074 de 2015) y demás normas concordantes.`,
      sections: [
        { h: "1. Responsable del tratamiento", p: [
          `Razón social: ${name}. NIT: ${nit}.`,
          `Domicilio: ${addr}, Colombia.`,
          `Correo electrónico: ${contact.email}. Teléfono: ${contact.phone}.`,
        ] },
        { h: "2. Datos que recolectamos", p: [
          "A través del formulario de contacto de este sitio recolectamos: nombre, empresa, correo electrónico, teléfono y el contenido de tu mensaje.",
          "No solicitamos datos sensibles (salud, orientación, creencias, datos biométricos, entre otros) ni recolectamos intencionalmente datos de niñas, niños o adolescentes. Te pedimos no incluir este tipo de información en tus mensajes.",
        ] },
        { h: "3. Finalidades del tratamiento", p: [
          "Tus datos serán tratados para: (a) responder tus solicitudes, preguntas y requerimientos; (b) elaborar y enviar propuestas o cotizaciones; (c) gestionar la relación precontractual y contractual; (d) enviarte información sobre nuestros servicios, cuando lo hayas autorizado; y (e) cumplir obligaciones legales.",
        ] },
        { h: "4. Autorización", p: [
          "El tratamiento de tus datos requiere tu autorización previa, expresa e informada. Al enviar el formulario de contacto y marcar la casilla de autorización, aceptas el tratamiento conforme a esta política. Conservamos prueba de dicha autorización.",
        ] },
        { h: "5. Derechos del titular", p: [
          "De acuerdo con el artículo 8 de la Ley 1581 de 2012, como titular tienes derecho a: (a) conocer, actualizar y rectificar tus datos; (b) solicitar prueba de la autorización otorgada; (c) ser informado sobre el uso dado a tus datos; (d) presentar quejas ante la Superintendencia de Industria y Comercio (SIC); (e) revocar la autorización y/o solicitar la supresión de tus datos cuando no se respeten los principios, derechos y garantías legales; y (f) acceder gratuitamente a tus datos personales.",
        ] },
        { h: "6. Procedimiento para consultas y reclamos", p: [
          `Puedes ejercer tus derechos escribiendo a ${contact.email}, indicando tu nombre, documento de identidad, la descripción de tu solicitud y un medio de respuesta.`,
          "Consultas: serán atendidas en un término máximo de diez (10) días hábiles contados desde su recibo. Si no fuera posible, te informaremos los motivos y la nueva fecha, que no superará cinco (5) días hábiles adicionales.",
          "Reclamos (corrección, actualización, supresión o incumplimiento): serán atendidos en un término máximo de quince (15) días hábiles. Si no fuera posible, te informaremos los motivos y la nueva fecha, que no superará ocho (8) días hábiles adicionales. Si el reclamo está incompleto, te pediremos completarlo dentro de los cinco (5) días siguientes; si pasan dos (2) meses sin respuesta, se entenderá que desististe.",
          "Antes de acudir a la SIC, debes agotar este trámite ante nosotros (artículo 16 de la Ley 1581 de 2012).",
        ] },
        { h: "7. Transmisión y transferencia de datos", p: [
          "Para operar este sitio y el formulario de contacto utilizamos proveedores tecnológicos (alojamiento web y servicio de envío de formularios por correo) que pueden estar ubicados fuera de Colombia. Estos proveedores actúan como encargados del tratamiento y solo usan los datos para prestar el servicio. No vendemos ni cedemos tus datos a terceros con fines comerciales.",
        ] },
        { h: "8. Seguridad y conservación", p: [
          "Adoptamos medidas técnicas, humanas y administrativas razonables para proteger tus datos contra pérdida, consulta, uso o acceso no autorizado.",
          "Conservaremos tus datos durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables.",
        ] },
        { h: "9. Cookies", p: [
          gaId
            ? "Si lo aceptas en el aviso de cookies, este sitio usa Google Analytics, que instala cookies de analítica para medir de forma agregada cómo se usa el sitio. No usamos cookies de publicidad. Puedes bloquear o eliminar las cookies desde la configuración de tu navegador."
            : "Este sitio no utiliza cookies de publicidad ni de analítica de terceros. Solo pueden usarse elementos técnicos estrictamente necesarios para su funcionamiento.",
        ] },
        { h: "10. Vigencia y cambios", p: [
          "Esta política rige desde la fecha de su última actualización. Cualquier cambio sustancial será publicado en este sitio. Las bases de datos permanecerán vigentes mientras se mantengan las finalidades del tratamiento.",
        ] },
      ],
    },
    terms: {
      title: "Términos y Condiciones de Uso",
      updated: "Última actualización: 5 de octubre de 2026",
      intro: `Estos términos regulan el acceso y uso del sitio web de ${name}. Al navegar en el sitio aceptas estos términos. Si no estás de acuerdo, te pedimos no utilizarlo.`,
      sections: [
        { h: "1. Titular del sitio", p: [
          `${name}, NIT ${nit}, con domicilio en ${addr}, Colombia. Correo: ${contact.email}. Teléfono: ${contact.phone}.`,
        ] },
        { h: "2. Objeto del sitio", p: [
          "El sitio tiene fines informativos sobre nuestros servicios. Su contenido no constituye una oferta comercial vinculante; las condiciones, precios y alcances de cada servicio se definen en una propuesta o contrato escrito.",
        ] },
        { h: "3. Uso permitido", p: [
          "Te comprometes a usar el sitio de forma lícita, sin afectar su funcionamiento, sin intentar acceder sin autorización a sistemas o información, y sin enviar contenido falso, ofensivo o que vulnere derechos de terceros.",
        ] },
        { h: "4. Propiedad intelectual", p: [
          `Los textos, logotipos, marcas, diseños e imágenes del sitio pertenecen a ${name} o a sus licenciantes y están protegidos por la Ley 23 de 1982, la Decisión Andina 351 de 1993 y demás normas sobre propiedad intelectual. No está permitida su reproducción, distribución o modificación sin autorización previa y escrita.`,
        ] },
        { h: "5. Responsabilidad", p: [
          "Procuramos que la información sea exacta y esté actualizada, pero no garantizamos la ausencia de errores ni la disponibilidad ininterrumpida del sitio. No somos responsables por daños derivados del uso del sitio ni por el contenido de sitios de terceros enlazados.",
        ] },
        { h: "6. Datos personales", p: [
          "El tratamiento de los datos que nos envíes se rige por nuestra Política de Tratamiento de Datos Personales, conforme a la Ley 1581 de 2012.",
        ] },
        { h: "7. Comunicaciones electrónicas", p: [
          "Los mensajes enviados a través del sitio o por correo electrónico tienen validez como mensajes de datos de acuerdo con la Ley 527 de 1999.",
        ] },
        { h: "8. Derechos del consumidor", p: [
          "Cuando aplique, las relaciones de consumo se regirán por la Ley 1480 de 2011 (Estatuto del Consumidor). Ninguna disposición de estos términos limita los derechos que dicha ley te otorga.",
        ] },
        { h: "9. Modificaciones", p: [
          "Podemos modificar estos términos en cualquier momento. La versión vigente será siempre la publicada en este sitio.",
        ] },
        { h: "10. Ley aplicable y jurisdicción", p: [
          "Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta por los jueces competentes de Colombia.",
        ] },
      ],
    },
  },
  en: {
    privacy: {
      title: "Personal Data Processing Policy",
      updated: "Last updated: October 5, 2026",
      intro: `${name} is committed to protecting the personal data of its clients, users and partners. This policy explains how we collect, use, store, and protect your information in accordance with Article 15 of the Colombian Constitution, Statutory Law 1581 of 2012, Decree 1377 of 2013 (compiled in Decree 1074 of 2015), and related regulations. In case of discrepancy, the Spanish version prevails.`,
      sections: [
        { h: "1. Data controller", p: [
          `Legal name: ${name}. Tax ID (NIT): ${nit}.`,
          `Address: ${addr}, Colombia.`,
          `Email: ${contact.email}. Phone: ${contact.phone}.`,
        ] },
        { h: "2. Data we collect", p: [
          "Through this website's contact form, we collect your name, company, email address, phone number, and the content of your message.",
          "We do not request sensitive data (such as health information, beliefs, or biometric data), and we do not knowingly collect data from minors. Please do not include this type of information in your messages.",
        ] },
        { h: "3. Purposes", p: [
          "We use your data to: (a) respond to your requests and questions; (b) prepare and send proposals or quotes; (c) manage pre-contractual and contractual relationships; (d) send you information about our services, when you have authorized it; and (e) comply with legal obligations.",
        ] },
        { h: "4. Authorization", p: [
          "Processing your data requires your prior, express, and informed authorization. By submitting the contact form and checking the authorization box, you accept processing under this policy. We keep proof of that authorization.",
        ] },
        { h: "5. Your rights", p: [
          "Under Article 8 of Law 1581 of 2012, you have the right to: (a) access, update and correct your data; (b) request proof of your authorization; (c) be informed about how your data is used; (d) file complaints with the Superintendence of Industry and Commerce (SIC); (e) revoke your authorization and/or request deletion of your data; and (f) access your personal data free of charge.",
        ] },
        { h: "6. Requests and claims", p: [
          `You can exercise your rights by writing to ${contact.email}, including your name, ID number, a description of your request, and how you would like us to reply.`,
          "Inquiries will be answered within ten (10) business days, extendable by up to five (5) additional business days. Claims will be answered within fifteen (15) business days, extendable by up to eight (8) additional business days.",
          "Before filing a complaint with the SIC, you must first submit your request to us (Article 16, Law 1581 of 2012).",
        ] },
        { h: "7. Data transmission and transfer", p: [
          "To operate this website and its contact form, we use technology providers (web hosting and form-to-email delivery) that may be located outside Colombia. They act as data processors and only use the data to provide their service. We do not sell or share your data with third parties for commercial purposes.",
        ] },
        { h: "8. Security and retention", p: [
          "We apply reasonable technical, human, and administrative measures to protect your data. We keep it only for as long as necessary to fulfill the purposes described above and to meet applicable legal obligations.",
        ] },
        { h: "9. Cookies", p: [
          gaId
            ? "If you accept it in the cookie notice, this website uses Google Analytics, which sets analytics cookies to measure, in aggregate, how the site is used. We do not use advertising cookies. You can block or delete cookies in your browser settings."
            : "This website does not use third-party advertising or analytics cookies. Only strictly necessary technical elements may be used.",
        ] },
        { h: "10. Validity and changes", p: [
          "This policy is effective as of its last update. Any material changes will be published on this website.",
        ] },
      ],
    },
    terms: {
      title: "Terms and Conditions of Use",
      updated: "Last updated: October 5, 2026",
      intro: `These terms govern access to and use of the ${name} website. By browsing the site you accept these terms. In case of discrepancy, the Spanish version prevails.`,
      sections: [
        { h: "1. Site owner", p: [
          `${name}, Tax ID (NIT) ${nit}, located at ${addr}, Colombia. Email: ${contact.email}. Phone: ${contact.phone}.`,
        ] },
        { h: "2. Purpose", p: [
          "This website provides information about our services. Its content is not a binding commercial offer; the terms, pricing, and scope of each service are set out in a written proposal or contract.",
        ] },
        { h: "3. Acceptable use", p: [
          "You agree to use the site lawfully and not to disrupt its operation, attempt unauthorized access, or submit false, offensive, or infringing content.",
        ] },
        { h: "4. Intellectual property", p: [
          `The text, logos, trademarks, designs, and images on this site belong to ${name} or its licensors and are protected by Colombian Law 23 of 1982, Andean Decision 351 of 1993, and other applicable laws. They may not be reproduced, distributed, or modified without prior written authorization.`,
        ] },
        { h: "5. Liability", p: [
          "We strive to keep the information accurate and up to date, but we do not guarantee that it is error-free or that the site will always be available. We are not liable for damages arising from the use of the site or for the content of linked third-party sites.",
        ] },
        { h: "6. Personal data", p: [
          "Any data you send us is processed under our Personal Data Processing Policy, in accordance with Law 1581 of 2012.",
        ] },
        { h: "7. Electronic communications", p: [
          "Messages sent through the site or by email are legally valid as data messages under Colombian Law 527 of 1999.",
        ] },
        { h: "8. Consumer rights", p: [
          "Where applicable, consumer relationships are governed by Law 1480 of 2011 (Consumer Statute). Nothing in these terms limits your rights under that law.",
        ] },
        { h: "9. Changes", p: [
          "We may update these terms at any time. The version published on this site is always the one in effect.",
        ] },
        { h: "10. Governing law", p: [
          "These terms are governed by the laws of the Republic of Colombia. Any dispute will be settled by the competent courts of Colombia.",
        ] },
      ],
    },
  },
};
