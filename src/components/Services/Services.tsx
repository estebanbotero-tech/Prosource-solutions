"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, X, MessageCircle, CheckCircle2, Sparkles, Send } from 'lucide-react';
import styles from './Services.module.scss';
import { serviceIcons } from '@/data/services';
import { useI18n } from '@/i18n/I18nProvider';
import { prefillContact } from '@/components/Contact/Contact';
import { company } from '@/data/company';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Services() {
  const { lang, dict } = useI18n();
  const t = dict.services;
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (activeModalIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalIndex(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalIndex]);

  const activeService = activeModalIndex !== null ? t.items[activeModalIndex] : null;

  const handleQuoteClick = (serviceTitle: string) => {
    setActiveModalIndex(null);
    prefillContact(`${t.prefill} ${serviceTitle}.`);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getWaUrl = (serviceTitle: string) => {
    const text = lang === 'es'
      ? `Hola Prosource Solutions, deseo más información y cotizar el servicio de: ${serviceTitle}`
      : `Hello Prosource Solutions, I would like more information and a quote for: ${serviceTitle}`;
    return `${company.social.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t.items.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <motion.div key={service.title} className={styles.card} variants={itemVariants}>
                <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.iconWrapper}>
                  <Icon size={28} />
                </div>
                {service.badge && (
                  <span className={styles.badgePill}>{service.badge}</span>
                )}
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                
                <button
                  type="button"
                  className={styles.cardLinkBtn}
                  onClick={() => setActiveModalIndex(i)}
                  aria-label={`${t.more} sobre ${service.title}`}
                >
                  <span>{t.more}</span>
                  <ArrowRight className={styles.arrow} size={16} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {activeService && (
          <div className={styles.modalBackdrop} onClick={() => setActiveModalIndex(null)}>
            <motion.div
              className={styles.modalContainer}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setActiveModalIndex(null)}
                aria-label={t.modalClose}
              >
                <X size={22} />
              </button>

              {/* Modal Header with Title & Badge */}
              <div className={styles.modalHeader}>
                {activeService.badge && (
                  <span className={styles.modalBadgePill}>
                    <Sparkles size={14} /> {activeService.badge}
                  </span>
                )}
                <h2 className={styles.modalTitle}>
                  {activeService.details?.headline || activeService.title}
                </h2>
              </div>

              {/* Modal Body */}
              <div className={styles.modalBody}>
                {/* Intro paragraphs */}
                {activeService.details?.p1 && (
                  <p className={styles.modalPLead}>{activeService.details.p1}</p>
                )}
                {activeService.details?.p2 && (
                  <p className={styles.modalP}>{activeService.details.p2}</p>
                )}

                {/* Optional Representative Image */}
                {activeService.image && (
                  <div className={styles.modalImageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeService.image}
                      alt={activeService.title}
                      className={styles.modalImage}
                    />
                  </div>
                )}

                {/* What we offer (if present) */}
                {activeService.details?.whatWeOffer && (
                  <div className={styles.whatWeOfferBox}>
                    <h4 className={styles.greenSubhead}>
                      {lang === 'es' ? '¿Qué ofrecemos?' : 'What do we offer?'}
                    </h4>
                    <p className={styles.whatWeOfferText}>{activeService.details.whatWeOffer}</p>
                  </div>
                )}

                {/* Characteristics / Differentiation Section Heading */}
                {activeService.details?.sectionTitle && (
                  <h3 className={styles.greenHeading}>
                    {activeService.details.sectionTitle}
                  </h3>
                )}

                {/* 4 Feature Cards */}
                {activeService.details?.features && (
                  <div className={styles.featuresGrid}>
                    {activeService.details.features.map((feat, idx) => (
                      <div key={idx} className={styles.featureCard}>
                        <div className={styles.featIconWrapper}>
                          <CheckCircle2 size={20} />
                        </div>
                        <h4 className={styles.featTitle}>{feat.title}</h4>
                        {feat.desc && <p className={styles.featDesc}>{feat.desc}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom text & Conclusion */}
                {activeService.details?.p3 && (
                  <p className={styles.modalP}>{activeService.details.p3}</p>
                )}
                {activeService.details?.conclusion && (
                  <div className={styles.conclusionCallout}>
                    <p>{activeService.details.conclusion}</p>
                  </div>
                )}
              </div>

              {/* Modal Actions Footer */}
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.btnPrimaryModal}
                  onClick={() => handleQuoteClick(activeService.title)}
                >
                  <Send size={18} />
                  <span>{t.modalQuote}</span>
                </button>

                <a
                  href={getWaUrl(activeService.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnWaModal}
                >
                  <MessageCircle size={18} />
                  <span>{t.modalWa}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
