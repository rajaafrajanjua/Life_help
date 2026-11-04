import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, Heart, BookOpen } from 'lucide-react';

const values = [
  { icon: Compass, title: 'Clarity', desc: 'We cut through confusing jargon and explain every option in plain language.' },
  { icon: Heart, title: 'Compassion', desc: "We listen first. Every family's situation is unique and deserves real attention." },
  { icon: BookOpen, title: 'Education First', desc: "We're not here to pressure you. We're here to help you understand your options." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  return (
    <section id="about" style={{ padding: 'clamp(72px,10vw,128px) 0', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))',
          gap: 'clamp(44px,7vw,88px)', alignItems: 'center',
        }}>
          {/* Visual left */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            {/* Main card */}
            <div style={{
              background: 'linear-gradient(145deg,#0d1f3c,#1a3560)',
              borderRadius: '28px',
              padding: 'clamp(28px,5vw,52px)',
              color: '#fff',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '200px', height: '200px',
                background: 'radial-gradient(circle,rgba(42,181,181,0.13) 0%,transparent 70%)',
                borderRadius: '50%',
              }} />
              {/* Lighthouse SVG illustration */}
              <svg viewBox="0 0 140 120" style={{ width: 'min(160px, 40%)', marginBottom: '24px', display: 'block' }}>
                <circle cx="70" cy="60" r="55" fill="rgba(42,181,181,0.08)" />
                {/* Lighthouse body */}
                <rect x="58" y="30" width="24" height="52" rx="2" fill="rgba(255,255,255,0.15)" />
                <rect x="62" y="18" width="16" height="14" rx="2" fill="rgba(42,181,181,0.6)" />
                {/* Light beam */}
                <path d="M70 20 L40 50 L70 50 Z" fill="rgba(201,149,42,0.15)" />
                <path d="M70 20 L100 50 L70 50 Z" fill="rgba(201,149,42,0.15)" />
                {/* Light dot */}
                <circle cx="70" cy="22" r="4" fill="#c9952a" />
                {/* Wave */}
                <path d="M20,88 Q35,78 50,88 Q65,98 80,88 Q95,78 110,88 Q125,98 140,88" stroke="rgba(42,181,181,0.4)" strokeWidth="2" fill="none" />
                <path d="M10,98 Q25,88 40,98 Q55,108 70,98 Q85,88 100,98 Q115,108 130,98" stroke="rgba(42,181,181,0.25)" strokeWidth="1.5" fill="none" />
                {/* Windows */}
                <rect x="65" y="40" width="10" height="8" rx="1" fill="rgba(201,149,42,0.4)" />
                <rect x="65" y="55" width="10" height="8" rx="1" fill="rgba(201,149,42,0.3)" />
              </svg>

              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(20px,3vw,28px)', marginBottom: '12px', lineHeight: '1.2' }}>
                A Safe Place for<br />Life Insurance Answers
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(13px,1.5vw,15px)', lineHeight: '1.75' }}>
                Like a lighthouse guiding ships to safe harbor, PolicyCove guides families toward clarity and confidence in their financial protection decisions.
              </p>
            </div>

            {/* Float badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute', bottom: '-18px', right: '-14px',
                background: '#fff',
                border: '1px solid #e8eaf0',
                borderRadius: '16px', padding: '14px 18px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              <div style={{
                width: '38px', height: '38px',
                background: 'linear-gradient(135deg,#c9952a,#e0b04a)',
                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <BookOpen size={18} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '14px', color: '#0d1f3c' }}>Education First</div>
                <div style={{ fontSize: '12px', color: '#6b6b70' }}>Protection with Purpose</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
            >
              <div style={{
                display: 'inline-block',
                background: 'rgba(26,140,140,0.1)', color: '#1a8c8c',
                fontSize: '12px', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                padding: '6px 14px', borderRadius: '50px', marginBottom: '18px',
              }}>
                Welcome to PolicyCove
              </div>
              <h2 style={{
                fontFamily: 'Syne', fontWeight: 800,
                fontSize: 'clamp(27px,4vw,46px)',
                color: '#0d1f3c', letterSpacing: '-0.8px',
                marginBottom: '20px', lineHeight: '1.1',
              }}>
                Independent Guidance<br />
                <span style={{ color: '#1a8c8c' }}>You Can Trust</span>
              </h2>
              <p style={{ color: '#6b6b70', fontSize: 'clamp(14px,1.7vw,16px)', lineHeight: '1.78', marginBottom: '28px' }}>
                As an independent life insurance brokerage, our focus is on helping individuals and families
                understand their protection needs and explore coverage options that align with their goals and budgets.
              </p>
              <p style={{ color: '#6b6b70', fontSize: 'clamp(14px,1.7vw,16px)', lineHeight: '1.78', marginBottom: '36px' }}>
                We're not here to pressure you into buying a policy. We're here to help you understand
                your options so you can decide what's right for you and your loved ones.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, x: 24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
                    style={{
                      display: 'flex', gap: '14px',
                      background: '#f8f9fb', border: '1px solid #e8eaf0',
                      borderRadius: '14px', padding: '16px 20px',
                    }}
                  >
                    <div style={{
                      width: '40px', height: '40px', flexShrink: 0,
                      background: 'rgba(26,140,140,0.1)', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} color="#1a8c8c" strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 'clamp(13px,1.4vw,15px)', color: '#0d1f3c', marginBottom: '3px' }}>{v.title}</div>
                      <div style={{ color: '#6b6b70', fontSize: 'clamp(12px,1.3vw,13px)', lineHeight: '1.6' }}>{v.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
