import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Calendar } from 'lucide-react';

import { PHONE_RAW as PHONE, PHONE_DISPLAY } from '../constants';

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '10px 0' : '18px 0',
          background: scrolled ? 'rgba(8,21,41,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,140,140,0.15)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Lighthouse / cove mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="10" fill="url(#lg)"/>
              {/* Simple lighthouse silhouette */}
              <rect x="15" y="8" width="6" height="12" rx="1" fill="white" opacity="0.9"/>
              <polygon points="13,20 23,20 21,28 15,28" fill="white" opacity="0.7"/>
              <rect x="17" y="5" width="2" height="3" rx="1" fill="#c9952a"/>
              <path d="M10 30 Q18 24 26 30" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5"/>
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1a8c8c"/>
                  <stop offset="1" stopColor="#0d1f3c"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: '20px', color: '#fff', letterSpacing: '-0.4px',
            }}>
              All Generations<span style={{ color: '#2ab5b5' }}> Life</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {links.map((l) => (
              <a key={l.label} href={l.href}
                style={{ color: 'rgba(255,255,255,0.72)', fontSize: '14px', fontWeight: 500, transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = '#2ab5b5'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.72)'}
              >{l.label}</a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Book button — desktop only */}
            <button
              onClick={onBook}
              className="nav-book-btn"
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: 'rgba(201,149,42,0.18)',
                border: '1px solid rgba(201,149,42,0.35)',
                color: '#e0b04a', padding: '9px 18px', borderRadius: '50px',
                fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,149,42,0.28)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,149,42,0.18)'; }}
            >
              <Calendar size={13} strokeWidth={2.5} />
              Book Appointment
            </button>
            <a href={`tel:${PHONE}`}
              className="nav-cta"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                color: '#fff', padding: '10px 20px', borderRadius: '50px',
                fontSize: '14px', fontWeight: 600,
                boxShadow: '0 4px 18px rgba(26,140,140,0.35)',
                transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,140,140,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(26,140,140,0.35)'; }}
            >
              <Phone size={14} strokeWidth={2.5} />
            <span className="cta-num">{PHONE_DISPLAY}</span>
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn"
              style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', width: '40px', height: '40px',
                borderRadius: '8px', display: 'none', alignItems: 'center', justifyContent: 'center',
              }}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: '66px', left: 0, right: 0, zIndex: 999,
              background: 'rgba(8,21,41,0.98)', backdropFilter: 'blur(16px)',
              padding: '16px 24px 28px',
              borderBottom: '1px solid rgba(26,140,140,0.2)',
            }}
          >
            {links.map((l, i) => (
              <motion.a key={l.label} href={l.href}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '16px',
                  fontWeight: 500, padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >{l.label}</motion.a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onBook(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
                background: 'rgba(201,149,42,0.18)',
                border: '1px solid rgba(201,149,42,0.35)',
                color: '#e0b04a', padding: '13px 20px', borderRadius: '50px',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer', marginTop: '16px', width: '100%',
              }}
            ><Calendar size={16} /> Book Appointment</button>
            <a href={`tel:${PHONE}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
                background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                color: '#fff', padding: '14px 20px', borderRadius: '50px',
                fontSize: '15px', fontWeight: 600, marginTop: '10px',
              }}
            ><Phone size={16} /> {PHONE_DISPLAY}</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .nav-book-btn { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .cta-num { display: none; }
          .nav-cta { padding: 10px 14px !important; }
        }
      `}</style>
    </>
  );
}
