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
    estimator: "ROI Estimator",
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
    primary: "Request a custom quote",
    secondary: "Chat on WhatsApp",
    badge1: "Guaranteed 99.9% SLA",
    badge2: "24/7/365 Full Coverage",
    badge3: "-40% Operational Overhead",
    liveDashboard: {
      title: "Real-Time Operational KPIs",
      uptime: "99.98% Uptime",
      activeAgents: "24/7 Squad Active",
      efficiency: "+42%",
      efficiencyLabel: "Process Efficiency",
      resolution: "< 90s",
      resolutionLabel: "Avg. First Response Time",
      csat: "98.6%",
      csatLabel: "Customer Satisfaction (CSAT)",
      pill1: "Ticket solved in 42s",
      pill2: "Cloud Backup Synced",
      pill3: "BPO Dispatch Online",
    }
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
    title: "The operational and technology extension your business needs",
    p1: "At Prosource Solutions, we eliminate the headache of recruiting, training, and maintaining expensive in-house infrastructure. We build high-performing operational squads and develop the software your company needs to dominate your industry.",
    p2: "We operate as your dedicated strategic partner: backed by strict Service Level Agreements (SLAs), real-time visibility, and a results-driven culture focused on boosting your bottom line.",
    stats: ["Years of track record", "Companies served", "Delivered projects", "365-day availability"],
  },
  services: {
    title: "Our High-Impact Services",
    subtitle: "Turnkey solutions designed to bulletproof your operations, delight your customers, and accelerate your revenue.",
    more: "Get quote for this service",
    prefill: "Hi, I'm interested in receiving a commercial proposal for:",
    items: [
      { 
        title: "Omnichannel Customer Care", 
        badge: "Retention + Sales",
        description: "Bilingual, dedicated teams trained to handle calls, WhatsApp, live chat, and support tickets with record-breaking response times and high CSAT (> 95%)." 
      },
      { 
        title: "BPO & Back-Office Management", 
        badge: "Cost Reduction",
        description: "Outsource administrative workflows, document processing, data validation, and billing so your core team can stay 100% focused on revenue." 
      },
      { 
        title: "24/7 - 365 Mission Critical Ops", 
        badge: "Zero Downtime",
        description: "Night shifts, weekend dispatch, and non-stop operational monitoring. Your company never sleeps and never loses customer opportunities." 
      },
      { 
        title: "Software & Mobile Engineering", 
        badge: "Tailored Innovation",
        description: "Custom digital solutions built to scale: web platforms, native/hybrid apps, API integrations, and robust corporate cloud software." 
      },
    ],
  },
  caseStudies: {
    badge: "Proven Results",
    title: "How we transform numbers and operations",
    subtitle: "Real stories of operational efficiency and revenue growth delivered by Prosource Solutions.",
    items: [
      {
        tag: "Logistics & Fleet Dispatch",
        title: "24/7 driver dispatch and carrier support optimization",
        problem: "Lost dispatch capacity and phone line congestion during peak hours and overnight weekends.",
        solution: "Deployed a dedicated 24/7 BPO dispatch squad with real-time routing protocols and integrated WhatsApp channels.",
        metrics: [
          { val: "-68%", label: "Wait time reduction" },
          { val: "+34%", label: "Dispatch volume capacity" },
          { val: "24/7", label: "Uninterrupted coverage" },
        ]
      },
      {
        tag: "Fintech & Digital Services",
        title: "Tier 1 support squad & Serverless Cloud modernization",
        problem: "Spike in infrastructure bills and slow KYC verification during nighttime customer signups.",
        solution: "Architected AWS serverless backend + 24/7 bilingual verification squad with guaranteed SLA.",
        metrics: [
          { val: "-35%", label: "Monthly cloud expenses" },
          { val: "99.2%", label: "First contact resolution" },
          { val: "< 60s", label: "Initial response SLA" },
        ]
      },
      {
        tag: "E-Commerce & Retail",
        title: "Automated back-office & real-time sales recovery",
        problem: "Cart abandonment due to lack of live assistance and post-purchase ticket backlog.",
        solution: "Omnichannel sales assistance agents trained in conversion and inventory synchronization.",
        metrics: [
          { val: "+26%", label: "Conversion rate increase" },
          { val: "98.7%", label: "CSAT satisfaction score" },
          { val: "0", label: "Pending tickets over 24h" },
        ]
      }
    ]
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
    items: [
      { title: "Cloud Infrastructure", description: "We migrate and maintain your AWS/GCP/Azure setup, ensuring high availability, security hardening, and billing optimization." },
      { title: "Data Management & BI", description: "Transform scattered data into real-time executive dashboards with Big Data and Business Intelligence tools for faster revenue decisions." },
      { title: "Mobile & Web Engineering", description: "High-conversion UX/UI and blazing-fast code engineered for iOS, Android, and modern web platforms." },
      { title: "Process Automation", description: "Automate manual and repetitive workflows with integrations that cut up to 80% of human error." },
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
      { title: "1. Discovery", desc: "We analyze bottlenecks, volumes, and commercial goals." },
      { title: "2. Proposal & SLA", desc: "We define target KPIs, team structure, and transparent pricing." },
      { title: "3. Onboarding & Setup", desc: "We train the squad or configure technical environments." },
      { title: "4. Go-Live", desc: "Launch with rigorous quality assurance and real-time monitoring." },
      { title: "5. Scale & Optimize", desc: "Continuous improvement cycles to maximize your operational ROI." },
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
    infoTitle: "Direct Contact Information",
    email: "Corporate email",
    phone: "Direct line / WhatsApp",
    locations: "Operating offices",
    hours: "Office hours",
    hoursValue: "Monday to Friday 8:00 AM – 5:00 PM (BPO Operations available 24/7)",
    formTitle: "Request a Commercial Proposal",
    formSubtitle: "Fill in your details and a senior specialist will reach out within 2 business hours.",
    name: "Full Name",
    namePh: "e.g. Esteban Botero",
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
