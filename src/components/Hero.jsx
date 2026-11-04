import { motion } from 'framer-motion';
import { Phone, Calendar, CheckCircle2, ShieldCheck, Star } from 'lucide-react';

const PHONE = '+17087042830';
const PHONE_DISPLAY = '+1 (708) 704-2830';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero({ onBook }) {
  return (
    <section id="top" style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #081529 0%, #0d1f3c 50%, #1a3560 100%)',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      paddingTop: '80px',
    }}>
      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', top: '-5%', right: '-8%',
        width: 'clamp(280px, 45vw, 640px)', height: 'clamp(280px, 45vw, 640px)',
        background: 'radial-gradient(circle, rgba(26,140,140,0.13) 0%, transparent 68%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-8%',
        width: 'clamp(240px, 38vw, 560px)', height: 'clamp(240px, 38vw, 560px)',
        background: 'radial-gradient(circle, rgba(201,149,42,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(26,140,140,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,140,140,0.04) 1px, transparent 1px)`,
        backgroundSize: '56px 56px', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        padding: 'clamp(48px, 9vh, 110px) 24px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(48px, 7vw, 88px)', alignItems: 'center',
        }}>
          {/* LEFT */}
          <div>
            <motion.div {...fade(0)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(42,181,181,0.12)',
              border: '1px solid rgba(42,181,181,0.28)',
              padding: '6px 14px', borderRadius: '50px',
              color: '#2ab5b5', fontSize: '13px', fontWeight: 600,
              letterSpacing: '0.4px', marginBottom: '22px',
            }}>
              <span style={{
                width: '7px', height: '7px', background: '#2ab5b5',
                borderRadius: '50%', animation: 'blink 2s infinite',
              }} />
              Independent Life Insurance Brokerage
            </motion.div>

            <motion.h1 {...fade(0.1)} style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-1.5px', lineHeight: '1.07', marginBottom: '22px',
            }}>
              Life Insurance<br />
              Doesn't Have to<br />
              <span style={{
                background: 'linear-gradient(90deg, #2ab5b5, #cef0f0)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Be Complicated.
              </span>
            </motion.h1>

            <motion.p {...fade(0.2)} style={{
              fontSize: 'clamp(15px, 1.9vw, 18px)',
              color: 'rgba(255,255,255,0.62)', lineHeight: '1.78',
              maxWidth: '500px', marginBottom: '34px',
            }}>
              Get answers to your life insurance questions, review your existing coverage,
              and explore protection options designed around your family's needs and budget.
            </motion.p>

            <motion.div {...fade(0.3)} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
              <motion.button
                onClick={onBook}
                whileHover={{ translateY: -2, boxShadow: '0 14px 36px rgba(26,140,140,0.48)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '9px',
                  background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                  color: '#fff', padding: '15px 26px', borderRadius: '50px',
                  fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(26,140,140,0.38)',
                }}
              >
                <Calendar size={17} strokeWidth={2.5} />
                Book FREE Policy Review
              </motion.button>
              <a href={`tel:${PHONE}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '9px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#fff', padding: '15px 26px', borderRadius: '50px',
                  fontSize: '15px', fontWeight: 600, transition: 'background .25s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <Phone size={17} strokeWidth={2.5} /> Speak With a Broker
              </a>
            </motion.div>

            <motion.div {...fade(0.4)} style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              {['Clear Answers', 'No Pressure', 'No Obligation', 'Licensed Professionals'].map(t => (
                <span key={t} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 500,
                }}>
                  <CheckCircle2 size={14} color="#2ab5b5" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT card stack */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Mission card */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '22px', padding: 'clamp(24px, 4vw, 38px)',
              backdropFilter: 'blur(12px)',
            }}>
              <ShieldCheck size={32} color="#2ab5b5" strokeWidth={1.5} style={{ marginBottom: '14px' }} />
              <h3 style={{
                fontFamily: 'Syne', fontWeight: 700,
                fontSize: 'clamp(16px, 2vw, 20px)', color: '#fff', marginBottom: '10px',
              }}>
                Your Coverage. Your Questions. Our Guidance.
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(13px, 1.5vw, 14px)', lineHeight: '1.72' }}>
                At PolicyCove, we believe understanding life insurance shouldn't be complicated.
                Education first. Protection with purpose.
              </p>
            </div>

            {/* Stat pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
              {[
                { num: '6+', label: 'Plan Types' },
                { num: 'Free', label: 'Policy Review' },
                { num: '100%', label: 'Independent' },
              ].map(s => (
                <div key={s.num} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px', padding: '18px 10px', textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(17px, 2.2vw, 21px)', color: '#2ab5b5', lineHeight: 1 }}>
                    {s.num}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '12px', marginTop: '5px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Broker card */}
            <div style={{
              background: 'rgba(201,149,42,0.1)',
              border: '1px solid rgba(201,149,42,0.25)',
              borderRadius: '16px', padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                width: '46px', height: '46px', flexShrink: 0,
                background: 'linear-gradient(135deg,#c9952a,#e0b04a)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Star size={22} color="#fff" fill="#fff" strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>Alonzo Carr</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Licensed Insurance Broker · PolicyCove</div>
                <a href={`tel:${PHONE}`} style={{ color: '#e0b04a', fontSize: '12px', fontWeight: 600, marginTop: '2px', display: 'block' }}>
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'clamp(28px,4vw,56px)' }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      <style>{`
        @keyframes blink {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.5; transform:scale(1.3); }
        }
      `}</style>
    </section>
  );
}
