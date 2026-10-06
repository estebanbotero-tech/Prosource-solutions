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
  const [selectedSize, setSelectedSize] = useState(t.sizes[0].id);

  const currentServiceObj = t.services.find((s) => s.id === selectedService) || t.services[0];
  const currentSizeObj = t.sizes.find((s) => s.id === selectedSize) || t.sizes[0];

  const summaryText = lang === 'es'
    ? `Hola Prosource Solutions, utilicé el cotizador web para proyectar una solución:\n- Servicio: ${currentServiceObj.name}\n- Alcance: ${currentSizeObj.name}\n- Ahorro esperado: ${currentServiceObj.savings}\nQuisiera recibir una propuesta comercial formal.`
    : `Hello Prosource Solutions, I used your online estimator:\n- Service: ${currentServiceObj.name}\n- Scope: ${currentSizeObj.name}\n- Projected savings: ${currentServiceObj.savings}\nI would like to receive a formal commercial proposal.`;

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
                {t.serviceLabel.replace(/^\d+\.\s*/, '')}
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

            {/* Step 2: Size */}
            <div className={styles.stepGroup}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNum} aria-hidden="true">2</span>
                {t.sizeLabel.replace(/^\d+\.\s*/, '')}
              </h3>
              <div className={styles.sizeGrid} role="radiogroup" aria-label={t.sizeLabel}>
                {t.sizes.map((sz) => {
                  const active = selectedSize === sz.id;
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`${styles.sizeCard} ${active ? styles.active : ''}`}
                      onClick={() => setSelectedSize(sz.id)}
                    >
                      <span className={styles.sizeTitle}>{sz.name}</span>
                      <span className={styles.sizeDesc}>{sz.desc}</span>
                    </button>
                  );
                })}
              </div>
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
