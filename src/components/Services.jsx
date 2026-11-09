import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileSearch, Flower2, Heart, Clock, Users, BookOpen, ArrowUpRight, Phone, Calendar } from 'lucide-react';

import { PHONE_RAW, PHONE_DISPLAY } from '../constants';

const PHONE = PHONE_RAW;
const services = [
  {
    icon: FileSearch,
    tag: 'Complimentary',
    title: 'Free Policy Review',
    desc: "Already have life insurance? Let us help you understand your coverage, beneficiaries, premiums, and policy provisions so you can make informed decisions.",
    accent: '#1a8c8c',
    bg: 'linear-gradient(135deg,#f0fafa,#e0f5f5)',
    featured: true,
  },
  {
    icon: Flower2,
    tag: 'Final Expense',
    title: 'Final Expense Insurance',
    desc: "Explore coverage options intended to help your loved ones manage funeral costs and other final expenses without financial burden.",
    accent: '#c9952a',
    bg: 'linear-gradient(135deg,#fdf8ef,#faefd8)',
    featured: false,
  },
  {
    icon: Heart,
    tag: 'Permanent',
    title: 'Whole Life Insurance',
    desc: "Learn about permanent life insurance options that may provide lifelong protection and build cash value, subject to policy terms.",
    accent: '#1a3560',
    bg: 'linear-gradient(135deg,#f0f4fb,#e2eaf8)',
    featured: false,
  },
  {
    icon: Clock,
    tag: 'Affordable',
    title: 'Term Life Insurance',
    desc: "Explore affordable coverage options for a specified period to help protect your family's financial responsibilities.",
    accent: '#1a8c8c',
    bg: 'linear-gradient(135deg,#f0fafa,#e0f5f5)',
    featured: false,
  },
  {
    icon: Users,
    tag: 'Family Focus',
    title: 'Family Protection Planning',
    desc: "Evaluate your family's needs and explore life insurance options designed to help provide financial security for everyone you love.",
    accent: '#c9952a',
    bg: 'linear-gradient(135deg,#fdf8ef,#faefd8)',
    featured: false,
  },
  {
    icon: BookOpen,
    tag: 'Education',
    title: 'Life Insurance Education',
    desc: "Not sure where to start? Ask questions and receive straightforward explanations from licensed professionals — zero pressure.",
    accent: '#1a3560',
    bg: 'linear-gradient(135deg,#f0f4fb,#e2eaf8)',
    featured: false,
  },
];

export default function Services({ onBook }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" style={{ padding: 'clamp(72px,10vw,128px) 0', background: '#f8f9fb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(44px,6vw,68px)' }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(26,140,140,0.1)', color: '#1a8c8c',
            fontSize: '12px', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            padding: '6px 14px', borderRadius: '50px', marginBottom: '16px',
          }}>Our Services</div>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(28px,4vw,48px)',
            color: '#0d1f3c', letterSpacing: '-0.8px', marginBottom: '16px',
          }}>
            Coverage Solutions for<br />
            <span style={{ color: '#1a8c8c' }}>Every Stage of Life</span>
          </h2>
          <p style={{
            color: '#6b6b70', fontSize: 'clamp(14px,1.8vw,17px)',
            maxWidth: '540px', margin: '0 auto', lineHeight: '1.72',
          }}>
            From reviewing an existing policy to exploring new coverage options, we offer personalized guidance with no obligation to purchase.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))',
          gap: '20px',
        }}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.09 }}
                whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(13,31,60,0.1)' }}
                style={{
                  background: '#fff', borderRadius: '22px',
                  border: s.featured ? '1.5px solid rgba(26,140,140,0.35)' : '1px solid #e8eaf0',
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  boxShadow: s.featured ? '0 8px 32px rgba(26,140,140,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'all .3s',
                  position: 'relative',
                }}
              >
                {s.featured && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                    color: '#fff', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: '50px',
                  }}>
                    Start Here
                  </div>
                )}
                {/* Card top */}
                <div style={{ background: s.bg, padding: 'clamp(24px,3.5vw,36px)', paddingBottom: '20px' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: 'rgba(255,255,255,0.7)',
                    color: s.accent, fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.4px', textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: '50px', marginBottom: '18px',
                  }}>{s.tag}</div>
                  <div style={{
                    width: '50px', height: '50px',
                    background: '#fff', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '16px',
                  }}>
                    <Icon size={23} color={s.accent} strokeWidth={2} />
                  </div>
                  <h3 style={{
                    fontFamily: 'Syne', fontWeight: 800,
                    fontSize: 'clamp(17px,2.2vw,21px)',
                    color: '#0d1f3c', lineHeight: '1.2',
                  }}>{s.title}</h3>
                </div>
                {/* Card bottom */}
                <div style={{ padding: 'clamp(18px,3vw,26px)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '18px' }}>
                  <p style={{ color: '#6b6b70', fontSize: 'clamp(13px,1.5vw,14px)', lineHeight: '1.72' }}>{s.desc}</p>
                  <a href={`tel:${PHONE}`}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: '#0d1f3c', color: '#fff',
                      padding: '12px 18px', borderRadius: '12px',
                      fontSize: '14px', fontWeight: 600, transition: 'background .25s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a3560'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0d1f3c'}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={14} /> Learn More
                    </span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 'clamp(40px,5vw,56px)' }}
        >
          <motion.button
            onClick={onBook}
            whileHover={{ scale: 1.03, boxShadow: '0 14px 40px rgba(26,140,140,0.38)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
              color: '#fff', padding: '16px 36px', borderRadius: '50px',
              fontSize: '16px', fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0 8px 28px rgba(26,140,140,0.3)',
            }}
          >
            <Calendar size={18} strokeWidth={2.5} />
            Book Your Free Policy Review
          </motion.button>
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#9999a5' }}>
            No charge · No obligation · Speak with a licensed broker
          </p>
        </motion.div>
      </div>
    </section>
  );
}
