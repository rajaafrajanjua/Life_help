import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Clock, Send, CheckCircle2, Calendar } from 'lucide-react';
import { PHONE_RAW, PHONE_DISPLAY, EMAIL, ADDRESS_LINE1, ADDRESS_LINE2, BRAND_NAME } from '../constants';

const PHONE = PHONE_RAW;

const states = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

const interests = [
  'Free Policy Review',
  'Final Expense Insurance',
  'Whole Life Insurance',
  'Term Life Insurance',
  'Family Protection Planning',
  'General Life Insurance Question',
];

const times = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 3 PM)',
  'Late Afternoon (3 PM – 6 PM)',
];

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  border: '1px solid #e8eaf0',
  borderRadius: '10px',
  fontSize: '14px',
  color: '#1c1c1e',
  background: '#fff',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  fontFamily: 'Inter, sans-serif',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#1a3560',
  marginBottom: '6px',
};

export default function Contact({ onBook }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    state: '', interest: '', time: '', consent: false,
  });

  const set = (k) => (e) => setForm(prev => ({
    ...prev,
    [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    // On localhost skip the API call — test UI only. Real emails send on Vercel.
    const isLocalhost = window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
      setTimeout(() => { setSending(false); setSubmitted(true); }, 800);
      return;
    }

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name:  `${form.firstName} ${form.lastName}`.trim(),
          client_phone: form.phone,
          client_email: form.email,
          topic:        form.interest || 'General Life Insurance Question',
          date:         form.time || 'To be scheduled',
          time:         form.time || 'Flexible',
          state:        form.state,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please call us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: 'clamp(72px,10vw,128px) 0', background: '#fff' }}>
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
            fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
            padding: '6px 14px', borderRadius: '50px', marginBottom: '16px',
          }}>Free Policy Review</div>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(28px,4vw,48px)',
            color: '#0d1f3c', letterSpacing: '-0.8px', marginBottom: '14px',
          }}>
            Schedule Your Free<br />
            <span style={{ color: '#1a8c8c' }}>Policy Review</span>
          </h2>
          <p style={{ color: '#6b6b70', fontSize: 'clamp(14px,1.8vw,17px)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.72' }}>
            No charge. No obligation. Just clear, honest guidance from a licensed insurance professional.
          </p>
          <motion.button
            onClick={onBook}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03, boxShadow: '0 14px 36px rgba(26,140,140,0.38)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
              color: '#fff', padding: '15px 32px', borderRadius: '50px',
              fontSize: '16px', fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0 8px 28px rgba(26,140,140,0.3)',
              marginTop: '24px',
            }}
          >
            <Calendar size={18} strokeWidth={2.5} />
            Book Appointment Now
          </motion.button>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: 'clamp(44px,6vw,72px)', alignItems: 'start',
        }}>
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Dark broker card */}
            <div style={{
              background: 'linear-gradient(150deg,#0d1f3c,#1a3560)',
              borderRadius: '24px', padding: 'clamp(28px,5vw,44px)',
              color: '#fff', marginBottom: '24px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '180px', height: '180px',
                background: 'radial-gradient(circle,rgba(42,181,181,0.1) 0%,transparent 70%)',
                borderRadius: '50%',
              }} />
              <div style={{
                width: '52px', height: '52px',
                background: 'linear-gradient(135deg,#c9952a,#e0b04a)',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '18px',
              }}>
                <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '18px', color: '#fff' }}>AC</span>
              </div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(18px,2.5vw,24px)', marginBottom: '4px' }}>
                All Generations Life Brokers LLC
              </h3>
              <p style={{ color: '#2ab5b5', fontSize: '13px', fontWeight: 600, marginBottom: '18px' }}>
                Independent Life Insurance Brokerage · Bluffton, SC
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(13px,1.5vw,14px)', lineHeight: '1.72', position: 'relative', zIndex: 1 }}>
                "We started All Generations Life Brokers to help families get clear, honest answers about life insurance — without the pressure or confusion. We're here to guide you, not sell you."
              </p>
            </div>

            {/* Contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: Phone, label: 'Call or Text', value: PHONE_DISPLAY, href: `tel:${PHONE}` },
                { icon: Mail, label: 'Email Us', value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: Clock, label: 'Hours', value: 'Mon–Fri: 9 AM – 6 PM CST', href: null },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} style={{
                    display: 'flex', gap: '14px', alignItems: 'center',
                    background: '#f8f9fb', border: '1px solid #e8eaf0',
                    borderRadius: '14px', padding: '16px 20px',
                  }}>
                    <div style={{
                      width: '40px', height: '40px', flexShrink: 0,
                      background: 'rgba(26,140,140,0.1)', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} color="#1a8c8c" strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b6b70', marginBottom: '2px' }}>{c.label}</div>
                      {c.href
                        ? <a href={c.href} style={{ fontSize: '14px', fontWeight: 600, color: '#0d1f3c', transition: 'color .2s' }}
                            onMouseEnter={e => e.target.style.color = '#1a8c8c'}
                            onMouseLeave={e => e.target.style.color = '#0d1f3c'}
                          >{c.value}</a>
                        : <div style={{ fontSize: '14px', fontWeight: 600, color: '#0d1f3c' }}>{c.value}</div>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: '#f0fafa',
                  border: '1.5px solid rgba(26,140,140,0.3)',
                  borderRadius: '22px',
                  padding: 'clamp(36px,6vw,60px)',
                  textAlign: 'center',
                }}
              >
                <CheckCircle2 size={52} color="#1a8c8c" strokeWidth={1.5} style={{ margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(20px,3vw,26px)', color: '#0d1f3c', marginBottom: '12px' }}>
                  Request Received!
                </h3>
                <p style={{ color: '#6b6b70', fontSize: 'clamp(14px,1.6vw,16px)', lineHeight: '1.72', maxWidth: '360px', margin: '0 auto 24px' }}>
                  Thank you for reaching out to All Generations Life Brokers LLC. A licensed broker will be in touch with you shortly to schedule your complimentary policy review.
                </p>
                <a href={`tel:${PHONE}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#0d1f3c', color: '#fff',
                  padding: '12px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: 600,
                }}>
                  <Phone size={15} /> Call Us Now
                </a>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: '#f8f9fb',
                  border: '1px solid #e8eaf0',
                  borderRadius: '22px',
                  padding: 'clamp(24px,4vw,40px)',
                  display: 'flex', flexDirection: 'column', gap: '18px',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input required value={form.firstName} onChange={set('firstName')}
                      placeholder="First name" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#1a8c8c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,140,140,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e8eaf0'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name *</label>
                    <input required value={form.lastName} onChange={set('lastName')}
                      placeholder="Last name" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#1a8c8c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,140,140,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e8eaf0'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input required type="tel" value={form.phone} onChange={set('phone')}
                    placeholder="(000) 000-0000" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#1a8c8c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,140,140,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e8eaf0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input required type="email" value={form.email} onChange={set('email')}
                    placeholder="you@email.com" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#1a8c8c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,140,140,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e8eaf0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>State *</label>
                    <select required value={form.state} onChange={set('state')}
                      style={{ ...inputStyle, color: form.state ? '#1c1c1e' : '#9999a5' }}
                      onFocus={e => { e.target.style.borderColor = '#1a8c8c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,140,140,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e8eaf0'; e.target.style.boxShadow = 'none'; }}
                    >
                      <option value="">Select state</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Contact Time</label>
                    <select value={form.time} onChange={set('time')}
                      style={{ ...inputStyle, color: form.time ? '#1c1c1e' : '#9999a5' }}
                      onFocus={e => { e.target.style.borderColor = '#1a8c8c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,140,140,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e8eaf0'; e.target.style.boxShadow = 'none'; }}
                    >
                      <option value="">Any time</option>
                      {times.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Coverage Interest</label>
                  <select value={form.interest} onChange={set('interest')}
                    style={{ ...inputStyle, color: form.interest ? '#1c1c1e' : '#9999a5' }}
                    onFocus={e => { e.target.style.borderColor = '#1a8c8c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,140,140,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e8eaf0'; e.target.style.boxShadow = 'none'; }}
                  >
                    <option value="">Select topic</option>
                    {interests.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                {/* Consent */}
                <div style={{
                  background: '#fff', border: '1px solid #e8eaf0',
                  borderRadius: '12px', padding: '16px',
                }}>
                  <label style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
                    <input type="checkbox" required checked={form.consent} onChange={set('consent')}
                      style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0, accentColor: '#1a8c8c' }}
                    />
                    <span style={{ fontSize: '12px', color: '#6b6b70', lineHeight: '1.65' }}>
                      By submitting this form, I consent to be contacted by All Generations Life Brokers LLC via phone, text, or email regarding life insurance information and my free policy review request. Message and data rates may apply. I understand that providing consent is not a condition of receiving a free policy review, and I may opt out at any time. All Generations Life Brokers LLC is an independent insurance brokerage, not an insurance carrier. Subject to state availability and carrier approval.
                    </span>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { scale: 1.01, boxShadow: '0 10px 30px rgba(26,140,140,0.35)' } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    background: 'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                    color: '#fff', padding: '16px 24px', borderRadius: '50px',
                    fontSize: '16px', fontWeight: 700,
                    boxShadow: '0 6px 22px rgba(26,140,140,0.3)',
                    border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                    width: '100%', opacity: sending ? 0.8 : 1,
                  }}
                >
                  <Send size={17} strokeWidth={2.5} />
                  {sending ? 'Sending…' : 'Schedule My Free Policy Review'}
                </motion.button>

                {error && (
                  <div style={{
                    padding: '12px 16px',
                    background: '#fff5f5', border: '1px solid #fed7d7',
                    borderRadius: '10px', color: '#c53030',
                    fontSize: '13px', lineHeight: '1.6',
                  }}>
                    {error}
                  </div>
                )}

                <p style={{ textAlign: 'center', fontSize: '12px', color: '#9999a5', lineHeight: '1.6' }}>
                  No charge · No obligation · 100% confidential
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
