import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, Gift, UserCheck, Building2, MessageSquare, BadgeCheck, ThumbsUp, Scale, Calendar } from 'lucide-react';

const reasons = [
  { icon: GitBranch, title: 'Independent Guidance', desc: 'We work for you, not for any single insurance carrier.' },
  { icon: Gift, title: 'Complimentary Policy Reviews', desc: 'Review your existing coverage at no charge, no strings attached.' },
  { icon: UserCheck, title: 'Personalized Recommendations', desc: 'Coverage options matched to your specific family and financial goals.' },
  { icon: Building2, title: 'Multiple Carrier Access', desc: 'Options from multiple insurance carriers, subject to state availability.' },
  { icon: MessageSquare, title: 'No Confusing Jargon', desc: 'Clear explanations from licensed professionals every step of the way.' },
  { icon: BadgeCheck, title: 'Licensed Professionals', desc: 'Every consultation handled by licensed insurance professionals.' },
  { icon: ThumbsUp, title: 'No Obligation to Purchase', desc: "We educate and guide. The decision is always entirely yours." },
  { icon: Scale, title: 'Transparency & Compliance', desc: 'All guidance follows insurance regulatory standards and best practices.' },
];

export default function WhyUs({ onBook }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="why-us" style={{
      padding: 'clamp(72px,10vw,128px) 0',
      background: 'linear-gradient(150deg,#081529 0%,#0d1f3c 55%,#1a3560 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(42,181,181,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(42,181,181,0.04) 1px,transparent 1px)`,
        backgroundSize: '52px 52px', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: 'clamp(260px,42vw,580px)', height: 'clamp(260px,42vw,580px)',
        background: 'radial-gradient(circle,rgba(42,181,181,0.07) 0%,transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(44px,6vw,68px)' }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(42,181,181,0.12)',
            border: '1px solid rgba(42,181,181,0.28)',
            color: '#2ab5b5', fontSize: '12px', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            padding: '6px 14px', borderRadius: '50px', marginBottom: '16px',
          }}>Why PolicyCove</div>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(28px,4vw,48px)',
            color: '#fff', letterSpacing: '-0.8px',
          }}>
            The PolicyCove Difference
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,250px),1fr))',
          gap: '16px',
        }}>
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.44, delay: 0.06 + i * 0.06 }}
                whileHover={{ y: -4, background: 'rgba(42,181,181,0.1)' }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '18px', padding: 'clamp(20px,3vw,28px)',
                  transition: 'all .25s',
                }}
              >
                <div style={{
                  width: '42px', height: '42px',
                  background: 'rgba(42,181,181,0.15)',
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '14px',
                }}>
                  <Icon size={20} color="#2ab5b5" strokeWidth={2} />
                </div>
                <h4 style={{
                  fontFamily: 'Syne', fontWeight: 700,
                  fontSize: 'clamp(13px,1.4vw,15px)',
                  color: '#fff', marginBottom: '7px', lineHeight: '1.3',
                }}>{r.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 'clamp(11px,1.2vw,13px)', lineHeight: '1.62' }}>
                  {r.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Promise bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 'clamp(40px,6vw,64px)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '22px', padding: 'clamp(24px,4vw,40px)',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontFamily: 'Syne', fontWeight: 700,
            fontSize: 'clamp(16px,2.5vw,24px)', color: '#fff', lineHeight: '1.4',
          }}>
            "At PolicyCove, you're more than a policy number.<br />
            <span style={{ color: '#2ab5b5' }}>You're a person, a family, and a future worth protecting.</span>"
          </p>
          <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            — Alonzo Carr, Licensed Insurance Broker & Owner, PolicyCove
          </div>
          <motion.button
            onClick={onBook}
            whileHover={{ scale: 1.03, boxShadow: '0 14px 36px rgba(42,181,181,0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
              color: '#fff', padding: '14px 32px', borderRadius: '50px',
              fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(42,181,181,0.25)',
              marginTop: '24px',
            }}
          >
            <Calendar size={17} strokeWidth={2.5} />
            Book Your Free Appointment
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
