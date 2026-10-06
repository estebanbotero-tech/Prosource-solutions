import { MessageCircle } from 'lucide-react';
import { company } from '@/data/company';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// Networks with an empty URL in company.social are hidden
const links = [
  { href: company.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: company.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: company.social.whatsapp, label: 'WhatsApp', Icon: () => <MessageCircle size={20} /> },
  { href: company.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
].filter((s) => s.href);

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {links.map(({ href, label, Icon }) => (
        <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"><Icon /></a>
      ))}
    </div>
  );
}
