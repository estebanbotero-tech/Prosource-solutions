"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, X, MessageCircle, Sparkles, Send } from 'lucide-react';
import styles from './Services.module.scss';
import { serviceIcons } from '@/data/services';
import { useI18n } from '@/i18n/I18nProvider';
import { prefillContact } from '@/components/Contact/Contact';
import { company } from '@/data/company';
import { track } from '@/components/Analytics/Analytics';
import { useModal } from '@/components/useModal';

type ServiceCardProps = {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  badge?: string;
  description: string;
  image?: string;
  moreLabel: string;
  onOpen: () => void;
};

// Sticky card that shrinks slightly as the next one slides over it
function ServiceCard({ index, total, progress, title, badge, description, image, moreLabel, onOpen }: ServiceCardProps) {
  const Icon = serviceIcons[index];
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.04]);

  return (
    <div className={styles.cardShell} style={{ ['--i' as string]: index }}>
      <motion.article className={styles.card} style={{ scale }}>
        <div className={styles.cardBody}>
          <div className={styles.cardTop}>
            <span className={styles.iconWrapper}><Icon size={24} /></span>
            {badge && <span className={styles.badgePill}>{badge}</span>}
          </div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDesc}>{description}</p>
          <button type="button" className={styles.cardLinkBtn} onClick={onOpen} aria-haspopup="dialog">
            <span>{moreLabel}</span>
            <ArrowRight className={styles.arrow} size={16} />
          </button>
        </div>
        {image && (
          <div className={styles.cardMedia}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" loading="lazy" />
          </div>
        )}
      </motion.article>
    </div>
  );
}

export default function Services() {
  const { lang, dict } = useI18n();
  const t = dict.services;
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  useModal(modalRef, activeModalIndex !== null, () => setActiveModalIndex(null));

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
      : `Hi Prosource Solutions, I'd like more information and a quote for: ${serviceTitle}`;
    return `${company.social.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <div ref={stackRef} className={styles.stack}>
          {t.items.map((service, i) => (
            <ServiceCard
              key={service.title}
              index={i}
              total={t.items.length}
              progress={scrollYProgress}
              title={service.title}
              badge={service.badge}
              description={service.description}
              image={service.image}
              moreLabel={t.more}
              onOpen={() => setActiveModalIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {activeService && (
          <div className={styles.modalBackdrop} onClick={() => setActiveModalIndex(null)}>
            <motion.div
              ref={modalRef}
              className={styles.modalContainer}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
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

              <div className={styles.modalScroll}>
              {/* Hero: image with title overlaid */}
              <div className={`${styles.modalHero} ${activeService.image ? '' : styles.modalHeroPlain}`}>
                {activeService.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={activeService.image} alt="" className={styles.modalHeroImg} />
                )}
                <div className={styles.modalHeroContent}>
                  {activeService.badge && (
                    <span className={styles.modalBadgePill}>
                      <Sparkles size={14} /> {activeService.badge}
                    </span>
                  )}
                  <h2 id="service-modal-title" className={styles.modalTitle}>
                    {activeService.details?.headline || activeService.title}
                  </h2>
                </div>
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

                {/* What we offer (if present) */}
                {activeService.details?.whatWeOffer && (
                  <div className={styles.whatWeOfferBox}>
                    <h4 className={styles.greenSubhead}>
                      {t.whatWeOffer}
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
                        <span className={styles.featNum}>{String(idx + 1).padStart(2, '0')}</span>
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
                  onClick={() => track('contact_whatsapp', { location: 'service_modal' })}
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
