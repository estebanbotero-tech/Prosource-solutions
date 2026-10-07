"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Mail, Clock, ShieldCheck, Headset, Code, Cloud, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import styles from './Estimator.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { company } from '@/data/company';
import { prefillContact } from '@/components/Contact/Contact';
import { track } from '@/components/Analytics/Analytics';

// Keyed by estimator.services[].id in src/i18n/*.ts
const serviceIcons: Record<string, typeof Headset> = { bpo: Headset, '247': Clock, software: Code, cloud: Cloud };

export default function Estimator() {
  const { lang, dict } = useI18n();
  const t = dict.estimator;

  const [selectedService, setSelectedService] = useState(t.services[0].id);
  const [ideas, setIdeas] = useState('');

  const currentServiceObj = t.services.find((s) => s.id === selectedService) || t.services[0];
  const idea = ideas.trim();

  const summaryText = lang === 'es'
    ? `Hola Prosource Solutions, revisé las soluciones de su sitio web:\n- Servicio: ${currentServiceObj.name}\n- Ahorro de referencia: ${currentServiceObj.savings}${idea ? `\n- Mi idea: ${idea}` : ''}\nMe gustaría recibir una propuesta comercial formal.`
    : `Hi Prosource Solutions, I explored the solutions on your website:\n- Service: ${currentServiceObj.name}\n- Reference savings: ${currentServiceObj.savings}${idea ? `\n- My idea: ${idea}` : ''}\nI'd like to receive a formal proposal.`;

  const waUrl = `${company.social.whatsapp}?text=${encodeURIComponent(summaryText)}`;

  return (
    <section id="estimator" className={`section ${styles.estimatorSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <div className={styles.calculatorCard}>
          <div className={styles.leftCol}>
            {/* Step 1: Service */}
            <div className={styles.stepGroup}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNum} aria-hidden="true">1</span>
                {t.serviceLabel}
              </h3>
              <div className={styles.optionsGrid} role="radiogroup" aria-label={t.serviceLabel}>
                {t.services.map((srv) => {
                  const Icon = serviceIcons[srv.id] ?? Headset;
                  const active = selectedService === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`${styles.optionBtn} ${active ? styles.active : ''}`}
                      onClick={() => setSelectedService(srv.id)}
                    >
                      <span className={styles.optionIcon}><Icon size={20} /></span>
                      <span className={styles.optionName}>{srv.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Free-text ideas, appended to the WhatsApp/email message */}
            <div className={styles.stepGroup}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNum} aria-hidden="true">2</span>
                <label htmlFor="estimator-ideas">{t.ideasLabel}</label>
              </h3>
              <p className={styles.ideasHint}>{t.ideasHint}</p>
              <textarea
                id="estimator-ideas"
                className={styles.ideas}
                rows={4}
                maxLength={1000}
                value={ideas}
                onChange={(e) => setIdeas(e.target.value)}
                placeholder={t.ideasPh}
              />
            </div>
          </div>

          {/* Result panel: values swap with a short slide when the selection changes */}
          <div className={styles.rightCol} aria-live="polite">
            <h3 className={styles.resultTitle}>{t.summaryTitle}</h3>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedService}
                className={styles.resultBody}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.savings}>
                  <span className={styles.impactLabel}><TrendingDown size={14} /> {t.projectedSavings}</span>
                  <span className={styles.savingsValue}>{currentServiceObj.savings}</span>
                </div>

                <dl className={styles.facts}>
                  <div>
                    <dt className={styles.impactLabel}><Clock size={14} /> {t.deploymentTime}</dt>
                    <dd>{currentServiceObj.time}</dd>
                  </div>
                  <div>
                    <dt className={styles.impactLabel}><ShieldCheck size={14} /> {t.slaGuarantee}</dt>
                    <dd>{t.slaValue}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>

            <div className={styles.actionButtons}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waBtn}
                onClick={() => track('contact_whatsapp', { location: 'estimator', service: currentServiceObj.id })}
              >
                <MessageCircle size={18} />
                <span>{t.ctaWhatsapp}</span>
              </a>

              <Link
                href={`/${lang}#contact`}
                className={styles.emailBtn}
                onClick={() => prefillContact(summaryText)}
              >
                <Mail size={16} />
                <span>{t.ctaForm}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
