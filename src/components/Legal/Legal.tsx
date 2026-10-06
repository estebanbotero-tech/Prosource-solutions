import styles from './Legal.module.scss';
import type { LegalDoc } from '@/i18n/legal';

export default function Legal({ doc }: { doc: LegalDoc }) {
  return (
    <article className={styles.legal}>
      <h1>{doc.title}</h1>
      <p className={styles.updated}>{doc.updated}</p>
      <p>{doc.intro}</p>
      {doc.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p.map((text) => <p key={text}>{text}</p>)}
        </section>
      ))}
    </article>
  );
}
