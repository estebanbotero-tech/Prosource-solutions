"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MessageCircle, Mail, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import styles from './Estimator.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { company } from '@/data/company';
import { prefillContact } from '@/components/Contact/Contact';

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
        <div className="text-center">
          <div className={styles.badgeWrapper}>
            <Calculator size={16} />
            <span>{t.badge}</span>
          </div>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <div className={styles.calculatorCard}>
          <div className={styles.leftCol}>
            {/* Step 1: Service */}
            <div className={styles.stepGroup}>
              <h3 className={styles.stepTitle}>{t.serviceLabel}</h3>
              <div className={styles.optionsGrid}>
                {t.services.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    className={`${styles.optionBtn} ${selectedService === srv.id ? styles.active : ''}`}
                    onClick={() => setSelectedService(srv.id)}
                  >
                    <span className={styles.optionRadio}></span>
                    <span className={styles.optionName}>{srv.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size */}
            <div className={styles.stepGroup}>
              <h3 className={styles.stepTitle}>{t.sizeLabel}</h3>
              <div className={styles.sizeGrid}>
                {t.sizes.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    className={`${styles.sizeCard} ${selectedSize === sz.id ? styles.active : ''}`}
                    onClick={() => setSelectedSize(sz.id)}
                  >
                    <span className={styles.sizeTitle}>{sz.name}</span>
                    <span className={styles.sizeDesc}>{sz.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Instant Projected ROI Card */}
          <div className={styles.rightCol}>
            <div className={styles.resultBox}>
              <h3 className={styles.resultTitle}>{t.summaryTitle}</h3>
              
              <div className={styles.impactCard}>
                <div className={styles.impactRow}>
                  <div className={styles.impactIcon}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <span className={styles.impactLabel}>{t.projectedSavings}</span>
                    <span className={styles.impactValueGreen}>{currentServiceObj.savings}</span>
                  </div>
                </div>

                <div className={styles.impactRow}>
                  <div className={styles.impactIcon}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <span className={styles.impactLabel}>{t.deploymentTime}</span>
                    <span className={styles.impactValueBlue}>{currentServiceObj.time}</span>
                  </div>
                </div>

                <div className={styles.impactRow}>
                  <div className={styles.impactIcon}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className={styles.impactLabel}>{t.slaGuarantee}</span>
                    <span className={styles.impactValueDark}>{t.slaValue}</span>
                  </div>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className={styles.actionButtons}>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waBtn}
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
      </div>
    </section>
  );
}
