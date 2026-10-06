import type { Dict } from './es';

const en: Dict = {
  meta: {
    title: "Prosource Solutions | BPO, 24/7 Operations & Custom Technology",
    description: "Scale your business and reduce operational costs by up to 40% with specialized BPO teams, 24/7 support, and high-impact custom software development.",
  },
  nav: {
    home: "Home",
    services: "Services",
    cases: "Case Studies",
    estimator: "Savings calculator",
    about: "About Us",
    solutions: "Technology",
    contact: "Contact",
    cta: "Get Quote in 24h",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLang: "Ver en español",
  },
  hero: {
    indicator: "Strategic BPO • 24/7 Operations • Cloud & Software Engineering",
    title: "Scale your operations and",
    titleEnd: "cut up to 40% in costs with",
    highlight: "top talent and technology.",
    description: "Prosource Solutions delivers dedicated BPO squads, 24/7/365 operational coverage, and custom software for companies looking for higher margins, zero downtime, and accelerated growth.",
    primary: "Get Quote in 24h",
    reassurance: "We reply within 24h · No commitment",
    secondary: "Chat on WhatsApp",
    badge1: "Guaranteed 99.9% SLA",
    badge2: "24/7/365 Full Coverage",
    badge3: "-40% Operational Overhead",
    clocks: {
      you: "Your time",
      team: "Team in Colombia",
      live: "Operating now",
    },
    globeHint: "Running your operation from Colombia",
  },
  trustBar: {
    title: "Industries that trust our operational infrastructure and engineering talent",
    items: [
      { name: "Logistics & Transport", tag: "24/7 fleet dispatch & monitoring" },
      { name: "Fintech & Banking", tag: "Mission-critical support & compliance" },
      { name: "E-Commerce & Retail", tag: "Omnichannel customer care & post-sale" },
      { name: "Healthcare & Assistance", tag: "Immediate hotline & triage" },
      { name: "SaaS & Tech Companies", tag: "Tier 1-3 support & engineering" },
    ],
  },
  about: {
    missionTitle: "Mission",
    mission: "Prosource Solutions S.A.S. provides outsourcing services with a human touch, technology backing and industry experience, focused on international companies in the BPO call center channel.",
    visionTitle: "Vision",
    vision: "To become a consolidated competitor in the BPO call center channel, with nationwide operations serving international companies, by 2026.",
    howWeWork: "See how we work",
    title: "The operational and technology extension your business needs",
    p1: "At Prosource Solutions, we eliminate the headache of recruiting, training, and maintaining expensive in-house infrastructure. We build high-performing operational squads and develop the software your company needs to dominate your industry.",
    p2: "We operate as your dedicated strategic partner: backed by strict Service Level Agreements (SLAs), real-time visibility, and a results-driven culture focused on boosting your bottom line.",
    stats: ["Years of track record", "Companies served", "Delivered projects", "365-day availability"],
  },
  services: {
    title: "Our High-Impact Services",
    subtitle: "Turnkey solutions designed to bulletproof your operations, delight your customers, and accelerate your revenue.",
    more: "Learn more",
    prefill: "Hi, I'm interested in receiving a commercial proposal for:",
    modalClose: "Close",
    modalQuote: "Quote this service",
    modalWa: "Inquire on WhatsApp",
    items: [
      { 
        title: "Omnichannel Customer Care", 
        badge: "Retention + Sales",
        description: "Bilingual, dedicated teams trained to handle calls, WhatsApp, live chat, and support tickets with record-breaking response times and high CSAT (> 95%).",
        image: "/services/customer-service.jpg",
        details: {
          headline: "Customer Care Services",
          p1: "At Prosource Solutions, our commitment to client satisfaction is our highest priority.",
          p2: "That's why we have built a customer service solution combining exceptional quality and years of proven operational experience to deliver fast, effective, and tailored outcomes.",
          sectionTitle: "What defines us?",
          whatWeOffer: "",
          features: [
            { 
              title: "Personalized attention", 
              desc: "Tailored customer interactions matching your brand tone, empathy, and professional excellence." 
            },
            { 
              title: "Efficient resolution", 
              desc: "Specialists focused on high first-contact resolution (FCR) rates and minimal wait times." 
            },
            { 
              title: "Continuous availability", 
              desc: "Omnichannel coverage across phone, WhatsApp, live chat, and email wherever your users need you." 
            },
            { 
              title: "Ongoing commitment", 
              desc: "Rigorous quality monitoring, active feedback loops, and continuous operational improvement." 
            }
          ],
          p3: "Our team of trained specialists is ready to provide fast and effective solutions without compromising the excellence that sets us apart. Furthermore, we are accessible across multiple communication channels, ensuring you always have the support you need, exactly when you need it. We constantly strive to listen to your feedback and improve every single day, because we don't just solve problems—we build long-lasting relationships of trust.",
          conclusion: "At Prosource Solutions, we don't just resolve issues; we build enduring relationships. Contact us today and experience a customer service solution built to exceed your expectations."
        }
      },
      { 
        title: "BPO / Back Office", 
        badge: "Cost Reduction",
        description: "Outsource administrative workflows, document processing, data validation, and billing so your core team can stay 100% focused on revenue.",
        image: "/services/bpo-backoffice.jpg",
        details: {
          headline: "BPO / Back Office",
          p1: "At Prosource Solutions, we understand that optimizing internal workflows is paramount to business success. That is why we provide BPO (Business Process Outsourcing) and Back Office solutions engineered to streamline operations, reduce overhead, and allow you to focus on what truly matters: growing your business.",
          p2: "",
          sectionTitle: "Why choose us?",
          whatWeOffer: "We specialize in the end-to-end management of administrative and operational workflows, delivering customized solutions tailored to each client's specific demands. From document management and data processing to customer care, we guarantee accuracy, confidentiality, and exceptional results.",
          features: [
            { 
              title: "Proven experience", 
              desc: "Highly trained team members equipped with cutting-edge tools and robust industry methodologies." 
            },
            { 
              title: "Scalability", 
              desc: "We adapt our teams to your growth velocity, guaranteeing operational elasticity and business continuity." 
            },
            { 
              title: "Operational efficiency", 
              desc: "Process optimization engineered to maximize output and minimize cycle times." 
            },
            { 
              title: "Uncompromising quality", 
              desc: "Every task is audited under strict quality benchmarks, ensuring consistent and dependable deliverables." 
            }
          ],
          p3: "At Prosource Solutions, we are not just a vendor—we are your strategic ally. By delegating back office operations to our teams, you can focus on core strategic goals while we manage the operational details.",
          conclusion: "Contact us today and discover how our BPO and Back Office solutions can transform your business."
        }
      },
      { 
        title: "24/7 - 365 Service", 
        badge: "Zero Downtime",
        description: "Night shifts, weekend dispatch, and non-stop operational monitoring. Your company never sleeps and never loses customer opportunities.",
        image: "/services/service-247.jpg",
        details: {
          headline: "24/7 - 365 Operations",
          p1: "At Prosource Solutions, we recognize that business never stops—and your customer demands don't either. That's why we deliver support and operational coverage available 24 hours a day, 7 days a week, 365 days a year.",
          p2: "Our mission is to be constantly at your disposal, guaranteeing you have the mission-critical backing you require at any given moment, regardless of the hour or day.",
          sectionTitle: "What sets us apart?",
          whatWeOffer: "",
          features: [
            { 
              title: "Immediate response", 
              desc: "Our active squads are ready to answer queries or resolve operational alerts in real time." 
            },
            { 
              title: "Global coverage", 
              desc: "We adapt smoothly to global timezones to support customers and fleets anywhere in the world." 
            },
            { 
              title: "Continuous operation", 
              desc: "Whether you need tech support, customer care, or logistics dispatch, your business never halts." 
            },
            { 
              title: "Highly trained talent", 
              desc: "Skilled specialists delivering rapid resolutions focused on customer satisfaction and quality." 
            }
          ],
          p3: "Your peace of mind is our priority. With our 24/7 - 365 service, you have the absolute certainty of a dependable partner by your side. At Prosource Solutions, we transform 24/7 availability into your distinct competitive advantage.",
          conclusion: "Contact us today and discover how we provide continuous operational peace of mind, year-round, without interruptions."
        }
      },
      { 
        title: "Software & Mobile Engineering", 
        badge: "Tailored Innovation",
        description: "Custom digital solutions built to scale: web platforms, native/hybrid apps, API integrations, and robust corporate cloud software.",
        image: "/services/software-dev.jpg",
        details: {
          headline: "Software Development",
          p1: "At Prosource Solutions, we design and build tailor-made digital solutions that accelerate your company's transformation and scalability.",
          p2: "We combine agile frameworks, modern architectures, and rigorous engineering quality standards to deliver stable, blazing-fast, and secure software.",
          sectionTitle: "What defines us?",
          whatWeOffer: "We engineer complete digital ecosystems: responsive web platforms, native and cross-platform mobile apps, workflow automations, and hardened API integrations connecting your existing infrastructure.",
          features: [
            { 
              title: "Scalable architecture", 
              desc: "Cloud-native system design engineered to handle traffic spikes and heavy concurrent transactions." 
            },
            { 
              title: "Bespoke development", 
              desc: "Web and mobile apps built 100% around your specific business model and workflows." 
            },
            { 
              title: "Agile methodology", 
              desc: "Continuous sprints, iterative delivery, and clear reporting to witness concrete progress from week one." 
            },
            { 
              title: "Security and quality", 
              desc: "Clean code, automated tests, and strict data security protocols to protect your operational assets." 
            }
          ],
          p3: "At Prosource Solutions, your technological vision becomes a tangible market advantage. We operate as an engineering extension committed to your commercial success.",
          conclusion: "Contact us today and discover how to accelerate your software roadmap with a dedicated engineering squad."
        }
      },
    ],
  },
  caseStudies: {
    featured: {
      label: "Featured case",
      client: "OK Taxi, LLC",
      location: "Atlanta, Georgia · DeKalb and Gwinnett counties",
      title: "We built their website and Android app, and run their 24/7 care",
      description: "OK Taxi has connected riders with drivers across metro Atlanta since 2014. It is one of our largest projects: we designed and built their website and Android app, and we run the customer care and dispatch operation that supports their growth.",
      metrics: [
        { val: "200,000+", label: "Rides completed" },
        { val: "45,000+", label: "Customers" },
        { val: "560+", label: "Taxi units" },
        { val: "10+", label: "Cities covered" },
      ],
      tags: ["Operating since 2014", "24/7 care and dispatch", "Website + Android app built by Prosource"],
      cta: "Visit OK Taxi",
      url: "https://oktaxiatlanta.com",
    },
    similar: "I want a similar outcome",
    similarPrefill: "Hello Prosource Solutions, I am interested in a case similar to:",
    title: "How we transform numbers and operations",
    subtitle: "Real stories of operational efficiency and revenue growth delivered by Prosource Solutions.",
  },
  estimator: {
    badge: "Interactive Estimator",
    title: "Calculate your estimated impact & savings",
    subtitle: "Select what your business needs to project operational savings, deployment timeline, and guaranteed SLA.",
    serviceLabel: "1. What type of solution do you need?",
    services: [
      { id: "bpo", name: "Customer Care / BPO Squad", savings: "35% - 45% vs in-house hiring", time: "7 to 10 business days" },
      { id: "247", name: "24/7/365 Critical Operations", savings: "40% - 55% in overtime & night shifts", time: "5 to 8 business days" },
      { id: "software", name: "Custom Software / App Dev", savings: "Ship 3x faster with ready squad", time: "Immediate sprint kick-off" },
      { id: "cloud", name: "Cloud Infrastructure & Data", savings: "30% reduction on cloud spend", time: "Audit within 48 hours" },
    ],
    sizeLabel: "2. Scope / team size required:",
    sizes: [
      { id: "small", name: "Starter / 1 to 3 agents or devs", desc: "For agile projects or initial launch" },
      { id: "medium", name: "Growth / 4 to 10 agents or devs", desc: "For scaling operations and volume spikes" },
      { id: "large", name: "Enterprise / 10+ dedicated squad", desc: "For large enterprise ops with dedicated SLAs" },
    ],
    summaryTitle: "Estimated Solution Projection:",
    projectedSavings: "Projected Cost Savings:",
    deploymentTime: "Estimated Go-Live Time:",
    slaGuarantee: "SLA Guarantee:",
    slaValue: "99.9% Uptime & contractually guaranteed KPIs",
    ctaWhatsapp: "Request this quote on WhatsApp",
    ctaForm: "Or request detailed proposal by email",
  },
  solutions: {
    title: "Robust technology designed to solve real business bottlenecks",
    subtitle: "We deploy modern architectures and enterprise-grade tools to keep your business agile, secure, and ready to scale.",
    more: "View details",
    less: "Show less",
    includes: "What's included",
    quote: "Quote this service",
    items: [
      { title: "Cloud Infrastructure", description: "We migrate and maintain your AWS/GCP/Azure setup, ensuring high availability, security hardening, and billing optimization.",
        details: ["Migration to AWS, GCP or Azure with no downtime", "24/7 monitoring, automated backups and security", "Cost optimization so you only pay for what you use"] },
      { title: "Data Management & BI", description: "Transform scattered data into real-time executive dashboards with Big Data and Business Intelligence tools for faster revenue decisions.",
        details: ["Power BI or Looker dashboards connected to your systems", "Integration and cleanup of sales, CRM and ERP data", "Automated reports for leadership"] },
      { title: "Mobile & Web Engineering", description: "High-conversion UX/UI and blazing-fast code engineered for iOS, Android, and modern web platforms.",
        details: ["Custom iOS and Android apps and websites", "Conversion-focused UX/UI design", "Maintenance and support after launch"] },
      { title: "Process Automation", description: "Automate manual and repetitive workflows with integrations that cut up to 80% of human error.",
        details: ["Automation of repetitive and back-office tasks", "Integrations across CRM, ERP, WhatsApp and email", "Workflows with approvals and full traceability"] },
    ],
  },
  whyUs: {
    title: "Why leading companies choose Prosource as their strategic partner",
    subtitle: "We unite technical depth, rapid onboarding, and contractual commitment to safeguard your company's growth.",
    items: [
      { title: "Proven Cost Reduction", description: "Save on heavy recruitment fees, payroll taxes, physical office space, and tooling while securing top-tier talent ready to produce." },
      { title: "Real 24/7/365 Coverage", description: "Our operations never sleep. Zero disruptions on nights, weekends, or holidays for your clients." },
      { title: "Transparent Real-Time Metrics", description: "Full access to live dashboards, call logs, ticket metrics, response times, and SLA adherence reports." },
      { title: "Enterprise Security & Compliance", description: "Total compliance with international data privacy regulations, NDAs, and enterprise-grade operational standards." },
    ],
  },
  process: {
    title: "Our Agile Implementation Process",
    subtitle: "From initial discovery to a fully functioning team in record time.",
    steps: [
      { title: "Discovery", desc: "We analyze bottlenecks, volumes, and commercial goals." },
      { title: "Proposal & SLA", desc: "We define target KPIs, team structure, and transparent pricing." },
      { title: "Onboarding & Setup", desc: "We train the squad or configure technical environments." },
      { title: "Go-Live", desc: "Launch with rigorous quality assurance and real-time monitoring." },
      { title: "Scale & Optimize", desc: "Continuous improvement cycles to maximize your operational ROI." },
    ],
  },
  cta: {
    badge: "Ready to scale?",
    title: "Don't let operational bottlenecks slow down your company's growth",
    subtitle: "Schedule a free 15-minute consultation call today or get an instant quote on WhatsApp.",
    button: "Request a custom quote",
    whatsappBtn: "Chat on WhatsApp",
  },
  whatsappWidget: {
    online: "Online now",
    title: "Need a quick quotation?",
    subtitle: "We usually reply within 5 minutes.",
    prompt1: "Quote BPO / Customer Care Squad",
    prompt2: "Quote 24/7 Critical Operations",
    prompt3: "Quote Custom Software / App Dev",
    promptCustom: "Ask another question...",
  },
  contact: {
    mapTitle: "Map of our office in La Estrella, Antioquia",
    follow: "Follow us",
    directions: "Get directions",
    infoTitle: "Direct Contact Information",
    email: "Corporate email",
    phone: "Direct line",
    locations: "Operating offices",
    hours: "Office hours",
    hoursValue: "Monday to Friday 8:00 AM – 5:00 PM (BPO Operations available 24/7)",
    formTitle: "Request a Commercial Proposal",
    formSubtitle: "Fill in your details and a senior specialist will reach out within 2 business hours.",
    name: "Full Name",
    namePh: "e.g. Laura Gómez",
    company: "Company",
    companyPh: "Company or organization name",
    emailPh: "you@company.com",
    phoneField: "Phone / WhatsApp",
    phonePh: "+1 555 000 0000",
    message: "Requirement details",
    messagePh: "Tell us about your needs: number of agents, technical scope, or process to optimize...",
    consentPre: "I authorize Prosource Solutions to process my personal data in accordance with its",
    consentLink: "Privacy policy",
    errName: "Please enter your name.",
    errEmail: "Please enter a valid email address.",
    errMessage: "Please specify your requirement.",
    errConsent: "We need your authorization to be able to reply.",
    send: "Submit quote request",
    sending: "Submitting request...",
    success: "Request received successfully! A specialist will contact you shortly.",
    error: "Could not send message. Please reach out to us directly on WhatsApp.",
    emailSubject: "New commercial request from website (EN)",
  },
  footer: {
    ctaTitle: "Let’s talk about your operation",
    ctaText: "Tell us what you need and we’ll reply within 24h, no commitment.",
    offices: "Offices",
    backToTop: "Back to top",
    inColombia: "in Colombia",
    description: "Accelerating enterprise profitability and scale with high-performance BPO squads, 24/7/365 operations, and modern technology solutions.",
    navigation: "Navigation",
    services: "Services",
    contact: "Contact",
    rights: "All rights reserved.",
    privacy: "Privacy policy",
    terms: "Terms and conditions",
  },
};

export default en;
