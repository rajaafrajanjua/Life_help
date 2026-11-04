import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Phone } from 'lucide-react';

const PHONE = '+17087042830';
const PHONE_DISPLAY = '+1 (708) 704-2830';

const faqs = [
  {
    q: 'What is a Free Policy Review?',
    a: "A free policy review is a complimentary consultation where we examine your existing life insurance coverage — including your beneficiaries, premiums, policy provisions, and death benefit — and explain it to you in plain language. There's no charge and no obligation to make any changes.",
  },
  {
    q: 'What types of life insurance does PolicyCove offer guidance on?',
    a: "We help clients understand and explore final expense insurance, whole life insurance, term life insurance, and family protection plans. As an independent brokerage, we work with multiple carriers to find options that fit your goals and budget.",
  },
  {
    q: 'Do I need a medical exam to qualify?',
    a: "It depends on the policy type and carrier. Some policies — such as simplified-issue final expense plans — require only a few health questions. Others may require a more detailed health review. We'll walk you through what's required for any option you're considering.",
  },
  {
    q: 'How much life insurance coverage do I need?',
    a: "Coverage needs vary by individual and family. Key factors include income replacement, outstanding debts (mortgage, loans), childcare costs, final expenses, and future goals. Our licensed brokers will help you evaluate these factors to find a coverage amount that makes sense for your situation.",
  },
  {
    q: 'What is the difference between term and whole life insurance?',
    a: "Term life insurance provides coverage for a set period (e.g., 10, 20, or 30 years) and is typically more affordable. Whole life insurance is permanent, lasts your entire lifetime, and may build cash value over time, subject to policy terms. We'll explain both options clearly so you can choose what fits your needs.",
  },
  {
    q: 'What is Final Expense Insurance?',
    a: "Final expense insurance is a type of whole life insurance designed to help cover end-of-life costs like funeral and burial expenses, medical bills, and outstanding debts. It typically offers smaller coverage amounts (often $5,000–$40,000) and may not require a medical exam.",
  },
  {
    q: "Will PolicyCove pressure me to buy a policy?",
    a: "Absolutely not. Our philosophy is education first, protection with purpose. We believe informed clients make better decisions. We're here to answer questions and present options — the choice is always yours, with no pressure or obligation.",
  },
  {
    q: "Is PolicyCove an insurance company?",
    a: "No. PolicyCove is an independent life insurance brokerage. We are not an insurance carrier. We help clients understand their options and connect them with coverage from multiple insurance carriers, subject to state availability and carrier approval.",
  },
];

function FAQItem({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      style={{
        border: `1px solid ${open ? 'rgba(26,140,140,0.35)' : '#e8eaf0'}`,
        borderRadius: '16px', overflow: 'hidden',
        background: open ? '#f0fafa' : '#fff', transition: 'all .3s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '16px',
          padding: 'clamp(16px,2.5vw,22px) clamp(18px,3vw,26px)',
          background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'Syne', fontWeight: 700,
          fontSize: 'clamp(13px,1.7vw,16px)',
          color: '#0d1f3c', lineHeight: '1.3', flex: 1,
        }}>{item.q}</span>
        <div style={{
          width: '30px', height: '30px', flexShrink: 0,
          background: open ? '#0d1f3c' : '#f0f4fb',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .3s',
        }}>
          {open
            ? <Minus size={14} color="#2ab5b5" strokeWidth={2.5} />
            : <Plus size={14} color="#1a3560" strokeWidth={2.5} />
          }
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{
              padding: '0 clamp(18px,3vw,26px) clamp(16px,2.5vw,22px)',
              color: '#6b6b70', fontSize: 'clamp(13px,1.5vw,15px)', lineHeight: '1.75',
            }}>{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="faq" style={{ padding: 'clamp(72px,10vw,128px) 0', background: '#f8f9fb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(44px,6vw,64px)' }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(26,140,140,0.1)', color: '#1a8c8c',
            fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
            padding: '6px 14px', borderRadius: '50px', marginBottom: '16px',
          }}>Life Insurance FAQ</div>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(28px,4vw,48px)',
            color: '#0d1f3c', letterSpacing: '-0.8px', marginBottom: '14px',
          }}>
            Common Questions,<br />
            <span style={{ color: '#1a8c8c' }}>Clear Answers</span>
          </h2>
          <p style={{ color: '#6b6b70', fontSize: 'clamp(14px,1.8vw,17px)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.72' }}>
            Not sure where to start? Here are the questions we hear most from families exploring life insurance.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,480px),1fr))',
          gap: 'clamp(40px,6vw,72px)', alignItems: 'start',
        }}>
          {/* Left accordion */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {faqs.slice(0, 4).map((item, i) => <FAQItem key={i} item={item} i={i} />)}
          </motion.div>

          {/* Right accordion + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {faqs.slice(4).map((item, i) => <FAQItem key={i} item={item} i={i + 4} />)}
            </div>

            {/* Still have questions card */}
            <div style={{
              background: 'linear-gradient(145deg,#0d1f3c,#1a3560)',
              borderRadius: '20px', padding: 'clamp(22px,4vw,36px)',
              color: '#fff', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '160px', height: '160px',
                background: 'radial-gradient(circle,rgba(42,181,181,0.12) 0%,transparent 70%)',
                borderRadius: '50%',
              }} />
              <h4 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(16px,2vw,20px)', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
                Still have questions?
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(13px,1.5vw,14px)', marginBottom: '20px', lineHeight: '1.65', position: 'relative', zIndex: 1 }}>
                Speak directly with Alonzo Carr, licensed insurance broker, at no charge.
              </p>
              <a href={`tel:${PHONE}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                  color: '#fff', padding: '12px 22px', borderRadius: '50px',
                  fontSize: '14px', fontWeight: 600, transition: 'opacity .2s',
                  position: 'relative', zIndex: 1,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Phone size={15} strokeWidth={2.5} /> {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
