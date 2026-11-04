import { Phone, Mail, Clock, Shield } from 'lucide-react';

const PHONE = '+17087042830';
const PHONE_DISPLAY = '+1 (708) 704-2830';
const EMAIL = 'alcarr33@yahoo.com';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#081529',
      borderTop: '1px solid rgba(42,181,181,0.12)',
      padding: 'clamp(48px,8vw,80px) 0 clamp(24px,4vw,36px)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
          gap: 'clamp(32px,5vw,52px)',
          marginBottom: 'clamp(32px,5vw,52px)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="10" fill="url(#flg)"/>
                <rect x="15" y="8" width="6" height="12" rx="1" fill="white" opacity="0.9"/>
                <polygon points="13,20 23,20 21,28 15,28" fill="white" opacity="0.7"/>
                <rect x="17" y="5" width="2" height="3" rx="1" fill="#c9952a"/>
                <path d="M10 30 Q18 24 26 30" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5"/>
                <defs>
                  <linearGradient id="flg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1a8c8c"/>
                    <stop offset="1" stopColor="#0d1f3c"/>
                  </linearGradient>
                </defs>
              </svg>
              <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '18px', color: '#fff' }}>
                Policy<span style={{ color: '#2ab5b5' }}>Cove</span>
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '1.75', maxWidth: '220px', marginBottom: '20px' }}>
              Your Coverage. Your Questions. Our Guidance.
            </p>
            <a href={`tel:${PHONE}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                background: 'rgba(42,181,181,0.1)',
                border: '1px solid rgba(42,181,181,0.22)',
                color: '#2ab5b5', padding: '9px 15px', borderRadius: '50px',
                fontSize: '13px', fontWeight: 600, transition: 'background .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(42,181,181,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(42,181,181,0.1)'}
            >
              <Phone size={13} /> {PHONE_DISPLAY}
            </a>
          </div>

          {/* Services */}
          <div>
            <h5 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '18px' }}>
              Our Services
            </h5>
            {[
              'Free Policy Review',
              'Final Expense Insurance',
              'Whole Life Insurance',
              'Term Life Insurance',
              'Family Protection Planning',
              'Life Insurance Education',
            ].map(item => (
              <a key={item} href="#services"
                style={{ display: 'block', color: 'rgba(255,255,255,0.42)', fontSize: '13px', padding: '5px 0', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = '#2ab5b5'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.42)'}
              >{item}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h5 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '18px' }}>
              Company
            </h5>
            {[
              { label: 'About Us', href: '#about' },
              { label: 'Why PolicyCove', href: '#why-us' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Contact Us', href: '#contact' },
              { label: 'Schedule Review', href: '#contact' },
            ].map(item => (
              <a key={item.label} href={item.href}
                style={{ display: 'block', color: 'rgba(255,255,255,0.42)', fontSize: '13px', padding: '5px 0', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = '#2ab5b5'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.42)'}
              >{item.label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '18px' }}>
              Contact
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Phone size={14} color="#2ab5b5" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href={`tel:${PHONE}`} style={{ color: '#fff', fontSize: '13px', fontWeight: 600, display: 'block' }}>{PHONE_DISPLAY}</a>
                  <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px' }}>Call or text anytime</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Mail size={14} color="#2ab5b5" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href={`mailto:${EMAIL}`} style={{ color: '#fff', fontSize: '13px', fontWeight: 600, display: 'block', wordBreak: 'break-all' }}>{EMAIL}</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Clock size={14} color="#2ab5b5" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px' }}>Mon–Fri: 9 AM – 6 PM CST</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Shield size={14} color="#2ab5b5" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px' }}>Licensed & Independent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 'clamp(18px,3vw,26px)',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: '10px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px' }}>
            © {year} PolicyCove. Independent Life Insurance Brokerage. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(item => (
              <a key={item} href="#top"
                style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = '#2ab5b5'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.28)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
