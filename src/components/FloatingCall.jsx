import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Calendar } from 'lucide-react';

const PHONE = '+17087042830';
const PHONE_DISPLAY = '+1 (708) 704-2830';

export default function FloatingCall({ onBook }) {
  const [popup, setPopup] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { if (!gone) setPopup(true); }, 5000);
    return () => clearTimeout(t);
  }, [gone]);

  if (gone) return null;

  return (
    <>
      {/* FAB */}
      <motion.a
        href={`tel:${PHONE}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: 'spring', stiffness: 200, damping: 14 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Call PolicyCove"
        style={{
          position: 'fixed',
          bottom: 'clamp(20px,4vw,32px)',
          right: 'clamp(16px,4vw,32px)',
          zIndex: 900,
          width: '56px', height: '56px',
          background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 28px rgba(26,140,140,0.45)',
          color: '#fff',
        }}
      >
        <Phone size={22} strokeWidth={2.5} />
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid rgba(42,181,181,0.45)',
          animation: 'ripple1 2.2s ease-out infinite',
        }} />
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid rgba(42,181,181,0.25)',
          animation: 'ripple1 2.2s ease-out infinite .55s',
        }} />
      </motion.a>

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{
              position: 'fixed',
              bottom: 'clamp(88px,16vw,106px)',
              right: 'clamp(16px,4vw,32px)',
              zIndex: 901,
              background: '#0d1f3c',
              borderRadius: '16px',
              padding: '14px 16px',
              maxWidth: '230px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.28)',
              border: '1px solid rgba(42,181,181,0.2)',
            }}
          >
            <button
              onClick={() => { setPopup(false); setGone(true); }}
              aria-label="Dismiss"
              style={{
                position: 'absolute', top: '8px', right: '8px',
                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'rgba(255,255,255,0.55)',
                width: '22px', height: '22px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            ><X size={11} /></button>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
              Free Policy Review
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.5', marginBottom: '10px' }}>
              Speak with Alonzo — no charge, no pressure.
            </div>
            <button
              onClick={() => { setPopup(false); onBook(); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                width: '100%', background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                color: '#fff', padding: '8px 12px', borderRadius: '8px',
                fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer',
                marginBottom: '6px',
              }}
            >
              <Calendar size={13} /> Book Appointment
            </button>
            <a href={`tel:${PHONE}`} style={{
              display: 'block', textAlign: 'center',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)', padding: '7px 12px', borderRadius: '8px',
              fontSize: '12px', fontWeight: 600,
            }}>
              {PHONE_DISPLAY}
            </a>
            {/* Arrow */}
            <div style={{
              position: 'absolute', bottom: '-7px', right: '24px',
              width: '14px', height: '14px',
              background: '#0d1f3c',
              transform: 'rotate(45deg)',
              borderRight: '1px solid rgba(42,181,181,0.2)',
              borderBottom: '1px solid rgba(42,181,181,0.2)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ripple1 {
          0% { transform:scale(1); opacity:1; }
          100% { transform:scale(1.75); opacity:0; }
        }
      `}</style>
    </>
  );
}
