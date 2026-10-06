"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import styles from './WhatsAppWidget.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { company } from '@/data/company';
import { track } from '@/components/Analytics/Analytics';

export default function WhatsAppWidget() {
  const { lang, dict } = useI18n();
  const t = dict.whatsappWidget;
  const [isOpen, setIsOpen] = useState(false);

  const getWaLink = (message: string) =>
    `${company.social.whatsapp}?text=${encodeURIComponent(message)}`;

  const quickOptions = [
    { label: t.prompt1, text: lang === 'es' ? 'Hola Prosource Solutions, me interesa cotizar un equipo de Atención al Cliente / BPO para mi empresa.' : 'Hello Prosource Solutions, I would like a quote for a BPO / Customer Care squad.' },
    { label: t.prompt2, text: lang === 'es' ? 'Hola Prosource Solutions, requiero información para una operación crítica o soporte 24/7/365.' : 'Hello Prosource Solutions, I need information regarding 24/7/365 critical operations support.' },
    { label: t.prompt3, text: lang === 'es' ? 'Hola Prosource Solutions, tengo un proyecto de desarrollo de software o app móvil y deseo una cotización.' : 'Hello Prosource Solutions, I have a software or mobile app project and would like a quote.' },
  ];

  return (
    <div className={styles.widgetWrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatPopup}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.agentInfo}>
                <div className={styles.avatar}>
                  <Sparkles size={16} />
                  <span className={styles.onlineBeacon}></span>
                </div>
                <div>
                  <h4 className={styles.agentName}>Prosource Commercial</h4>
                  <span className={styles.agentStatus}>{t.online}</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className={styles.chatBody}>
              <div className={styles.speechBubble}>
                <p className={styles.bubbleTitle}>{t.title}</p>
                <p className={styles.bubbleSub}>{t.subtitle}</p>
              </div>

              <div className={styles.promptsList}>
                {quickOptions.map((opt) => (
                  <a
                    key={opt.label}
                    href={getWaLink(opt.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.promptBtn}
                    onClick={() => track('contact_whatsapp', { location: 'widget' })}
                  >
                    <span>{opt.label}</span>
                    <Send size={14} className={styles.sendIcon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className={styles.chatFooter}>
              <a
                href={getWaLink(lang === 'es' ? 'Hola Prosource Solutions, deseo más información sobre sus servicios.' : 'Hello Prosource Solutions, I would like more information about your services.')}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directChatBtn}
                onClick={() => track('contact_whatsapp', { location: 'widget' })}
              >
                <MessageCircle size={16} />
                <span>{t.promptCustom}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <button
        type="button"
        className={styles.triggerBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir asistente de WhatsApp comercial"
      >
        <span className={styles.beaconRing}></span>
        {isOpen ? <X size={26} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
