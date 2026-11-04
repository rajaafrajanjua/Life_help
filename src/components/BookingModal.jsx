import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Clock, Calendar,
  User, Phone, Mail, CheckCircle2, ArrowRight, Loader,
} from 'lucide-react';

const PHONE_DISPLAY = '+1 (708) 704-2830';

const TIME_SLOTS = [
  '9:00 AM','9:30 AM','10:00 AM','10:30 AM',
  '11:00 AM','11:30 AM','12:00 PM','12:30 PM',
  '1:00 PM','1:30 PM','2:00 PM','2:30 PM',
  '3:00 PM','3:30 PM','4:00 PM','4:30 PM',
  '5:00 PM','5:30 PM',
];

const MONTHS    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_S    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* helpers */
const getDays    = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirst   = (y, m) => new Date(y, m, 1).getDay();
const isWeekend  = (y, m, d) => { const w = new Date(y,m,d).getDay(); return w===0||w===6; };
const isPast     = (y, m, d) => { const t=new Date(); t.setHours(0,0,0,0); return new Date(y,m,d)<t; };
const isSame     = (a, b) => a && b && a.year===b.year && a.month===b.month && a.day===b.day;
const fmtDate    = d => d ? `${MONTHS[d.month]} ${d.day}, ${d.year}` : '';

/* ── Calendar ── */
function CalPicker({ selected, onSelect }) {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const prev = () => setView(v => v.month===0 ? {year:v.year-1,month:11} : {year:v.year,month:v.month-1});
  const next = () => setView(v => v.month===11 ? {year:v.year+1,month:0} : {year:v.year,month:v.month+1});

  const daysInMonth = getDays(view.year, view.month);
  const firstDay    = getFirst(view.year, view.month);
  const cells       = Array(firstDay).fill(null).concat(Array.from({length:daysInMonth},(_,i)=>i+1));
  while (cells.length % 7 !== 0) cells.push(null);

  const canPrev = !(view.year===today.getFullYear() && view.month===today.getMonth());

  return (
    <div style={{ width: '100%' }}>
      {/* Month nav */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
        <button onClick={prev} disabled={!canPrev}
          style={{
            width:'32px', height:'32px', borderRadius:'50%',
            background: canPrev ? '#f0f4fb' : 'transparent',
            border:'1px solid #e8eaf0',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor: canPrev ? 'pointer' : 'not-allowed',
            opacity: canPrev ? 1 : 0.3,
          }}>
          <ChevronLeft size={15} color="#0d1f3c" />
        </button>
        <span style={{ fontFamily:'Syne', fontWeight:700, fontSize:'15px', color:'#0d1f3c' }}>
          {MONTHS[view.month]} {view.year}
        </span>
        <button onClick={next}
          style={{
            width:'32px', height:'32px', borderRadius:'50%',
            background:'#f0f4fb', border:'1px solid #e8eaf0',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
          }}>
          <ChevronRight size={15} color="#0d1f3c" />
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'3px', marginBottom:'4px' }}>
        {DAYS_S.map(d => (
          <div key={d} style={{ textAlign:'center', fontSize:'11px', fontWeight:700, color:'#9999a5', padding:'3px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'3px' }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const isToday = day===today.getDate() && view.month===today.getMonth() && view.year===today.getFullYear();
          const disabled = isPast(view.year,view.month,day) || isWeekend(view.year,view.month,day);
          const sel = isSame(selected, {year:view.year,month:view.month,day});
          return (
            <motion.button key={idx}
              whileHover={!disabled ? {scale:1.1} : {}}
              whileTap={!disabled ? {scale:0.92} : {}}
              onClick={() => !disabled && onSelect({year:view.year,month:view.month,day})}
              style={{
                width:'100%',
                aspectRatio:'1',
                borderRadius:'8px',
                border: sel ? 'none' : isToday ? '1.5px solid #1a8c8c' : '1px solid transparent',
                fontSize:'clamp(10px,2.5vw,13px)',
                fontWeight: sel ? 700 : 500,
                cursor: disabled ? 'not-allowed' : 'pointer',
                background: sel
                  ? 'linear-gradient(135deg,#2ab5b5,#1a8c8c)'
                  : isToday ? '#f0fafa' : 'transparent',
                color: sel ? '#fff' : disabled ? '#ccc' : isToday ? '#1a8c8c' : '#1c1c1e',
                opacity: disabled ? 0.4 : 1,
                transition:'all .15s',
                padding: '2px',
              }}
            >{day}</motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop:'12px', display:'flex', gap:'12px', flexWrap:'wrap' }}>
        {[
          { bg:'linear-gradient(135deg,#2ab5b5,#1a8c8c)', label:'Selected' },
          { border:'1.5px solid #1a8c8c', bg:'#f0fafa', label:'Today' },
          { bg:'#f0f0f0', label:'Unavailable' },
        ].map(l => (
          <span key={l.label} style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color:'#9999a5' }}>
            <span style={{ width:'10px', height:'10px', borderRadius:'2px', background:l.bg||'transparent', border:l.border||'none', display:'inline-block', flexShrink:0 }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Time picker ── */
function TimePicker({ selected, onSelect }) {
  return (
    <div>
      <div style={{ marginBottom:'12px', fontFamily:'Syne', fontWeight:700, fontSize:'14px', color:'#0d1f3c' }}>
        Pick a Time{' '}
        <span style={{ color:'#6b6b70', fontWeight:500, fontSize:'12px' }}>(CST · Mon–Fri)</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(78px,1fr))', gap:'7px' }}>
        {TIME_SLOTS.map(t => (
          <motion.button key={t}
            whileHover={{ scale:1.04 }}
            whileTap={{ scale:0.95 }}
            onClick={() => onSelect(t)}
            style={{
              padding:'9px 4px',
              borderRadius:'9px',
              fontSize:'clamp(11px,2.5vw,13px)',
              fontWeight: selected===t ? 700 : 500,
              background: selected===t ? 'linear-gradient(135deg,#2ab5b5,#1a8c8c)' : '#f0f4fb',
              color: selected===t ? '#fff' : '#1a3560',
              border: selected===t ? 'none' : '1px solid #e8eaf0',
              cursor:'pointer', transition:'all .15s',
            }}
          >{t}</motion.button>
        ))}
      </div>
    </div>
  );
}

/* ── Main modal ── */
export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep]       = useState(1);
  const [date, setDate]       = useState(null);
  const [time, setTime]       = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState('');
  const [info, setInfo]       = useState({ name:'', phone:'', email:'', topic:'' });

  useEffect(() => {
    if (isOpen) { setStep(1); setDate(null); setTime(''); setInfo({name:'',phone:'',email:'',topic:''}); setError(''); }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const set = k => e => setInfo(p => ({ ...p, [k]: e.target.value }));

  const handleConfirm = async () => {
    if (!info.name.trim() || !info.email.trim() || !info.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setSending(true); setError('');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name:  info.name,
          client_phone: info.phone,
          client_email: info.email,
          topic:        info.topic || 'General Inquiry',
          date:         fmtDate(date),
          time,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Send failed');
      setStep(4);
    } catch (err) {
      setError(err.message || 'Could not send. Please call us at ' + PHONE_DISPLAY);
    } finally {
      setSending(false);
    }
  };

  const inp = {
    width:'100%', padding:'11px 14px',
    border:'1px solid #e8eaf0', borderRadius:'10px',
    fontSize:'14px', color:'#1c1c1e', background:'#fff',
    outline:'none', fontFamily:'Inter,sans-serif', transition:'border-color .2s,box-shadow .2s',
  };
  const onFocus = e => { e.target.style.borderColor='#1a8c8c'; e.target.style.boxShadow='0 0 0 3px rgba(26,140,140,0.12)'; };
  const onBlur  = e => { e.target.style.borderColor='#e8eaf0'; e.target.style.boxShadow='none'; };

  const topics = [
    'Free Policy Review','Final Expense Insurance',
    'Whole Life Insurance','Term Life Insurance',
    'Family Protection Planning','General Question',
  ];
  const stepLabel = ['','Choose Date','Choose Time','Your Details'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="bd"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.2 }}
            onClick={onClose}
            style={{
              position:'fixed', inset:0, zIndex:1100,
              background:'rgba(8,21,41,0.75)',
              backdropFilter:'blur(5px)',
            }}
          />

          {/* ── Scroll container — centres the card and handles overflow ── */}
          <div
            style={{
              position:'fixed', inset:0, zIndex:1101,
              overflowY:'auto',
              display:'flex',
              alignItems:'flex-start',       /* top-align so tall content scrolls */
              justifyContent:'center',
              padding:'20px 12px 40px',      /* breathing room on all sides */
            }}
            /* clicking the outer wrapper (not the card) closes the modal */
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
          >
            <motion.div
              key="card"
              initial={{ opacity:0, scale:0.93, y:20 }}
              animate={{ opacity:1, scale:1,    y:0  }}
              exit={{    opacity:0, scale:0.93, y:20 }}
              transition={{ type:'spring', stiffness:300, damping:28 }}
              onClick={e => e.stopPropagation()}
              style={{
                width:'100%',
                maxWidth:'680px',
                background:'#fff',
                borderRadius:'22px',
                overflow:'hidden',
                boxShadow:'0 28px 72px rgba(8,21,41,0.28)',
                /* ensure card never collapses narrower than comfortable */
                minWidth:'0',
              }}
            >
              {/* ── Header ── */}
              <div style={{
                background:'linear-gradient(135deg,#0d1f3c,#1a3560)',
                padding:'clamp(18px,4vw,28px) clamp(16px,4vw,30px)',
                position:'relative',
              }}>
                {/* Close */}
                <button onClick={onClose}
                  style={{
                    position:'absolute', top:'14px', right:'14px',
                    width:'32px', height:'32px', borderRadius:'50%',
                    background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)',
                    color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer',
                  }}>
                  <X size={15} />
                </button>

                <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px', paddingRight:'40px' }}>
                  <div style={{
                    width:'40px', height:'40px', flexShrink:0,
                    background:'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                    borderRadius:'11px', display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <Calendar size={19} color="#fff" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily:'Syne', fontWeight:800, fontSize:'clamp(15px,4vw,21px)', color:'#fff', lineHeight:1.1 }}>
                      Book Your Appointment
                    </h2>
                    <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(11px,2.5vw,13px)', marginTop:'3px' }}>
                      Free Policy Review · No Obligation · No Charge
                    </p>
                  </div>
                </div>

                {/* Step indicators */}
                {step < 4 && (
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap' }}>
                    {[1,2,3].map((n, i) => (
                      <div key={n} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                        <div style={{
                          width:'24px', height:'24px', borderRadius:'50%', flexShrink:0,
                          background: step>n ? '#2ab5b5' : step===n ? '#fff' : 'rgba(255,255,255,0.12)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:'10px', fontWeight:700,
                          color: step===n ? '#0d1f3c' : step>n ? '#fff' : 'rgba(255,255,255,0.35)',
                          transition:'all .3s',
                        }}>
                          {step>n ? <CheckCircle2 size={12}/> : n}
                        </div>
                        <span style={{
                          fontSize:'clamp(10px,2.5vw,12px)', fontWeight: step===n ? 600 : 400,
                          color: step===n ? '#fff' : 'rgba(255,255,255,0.35)',
                          whiteSpace:'nowrap',
                        }}>
                          {stepLabel[n]}
                        </span>
                        {i < 2 && (
                          <div style={{ width:'clamp(12px,3vw,24px)', height:'1px', background:'rgba(255,255,255,0.12)', flexShrink:0 }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Body ── */}
              <div style={{ padding:'clamp(16px,4vw,28px)' }}>
                <AnimatePresence mode="wait">

                  {/* STEP 1 – date */}
                  {step===1 && (
                    <motion.div key="s1"
                      initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}
                      transition={{duration:0.2}}
                    >
                      <CalPicker selected={date} onSelect={setDate} />
                      <div style={{ marginTop:'20px', display:'flex', justifyContent:'flex-end' }}>
                        <motion.button
                          whileHover={date?{scale:1.02}:{}}
                          whileTap={date?{scale:0.97}:{}}
                          onClick={() => date && setStep(2)}
                          style={{
                            display:'flex', alignItems:'center', gap:'8px',
                            background: date ? 'linear-gradient(135deg,#2ab5b5,#1a8c8c)' : '#e8eaf0',
                            color: date ? '#fff' : '#9999a5',
                            padding:'11px 24px', borderRadius:'50px',
                            fontSize:'14px', fontWeight:700, border:'none',
                            cursor: date ? 'pointer' : 'not-allowed',
                            boxShadow: date ? '0 5px 18px rgba(26,140,140,0.3)' : 'none',
                            transition:'all .2s',
                          }}
                        >
                          Continue <ArrowRight size={14}/>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 – time */}
                  {step===2 && (
                    <motion.div key="s2"
                      initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}
                      transition={{duration:0.2}}
                    >
                      <div style={{
                        display:'flex', alignItems:'center', gap:'8px',
                        background:'#f0fafa', border:'1px solid rgba(26,140,140,0.2)',
                        borderRadius:'10px', padding:'10px 14px', marginBottom:'18px',
                      }}>
                        <Calendar size={14} color="#1a8c8c"/>
                        <span style={{ fontSize:'14px', fontWeight:600, color:'#0d1f3c', flex:1 }}>{fmtDate(date)}</span>
                        <button onClick={() => setStep(1)}
                          style={{ fontSize:'12px', color:'#1a8c8c', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>
                          Change
                        </button>
                      </div>
                      <TimePicker selected={time} onSelect={setTime}/>
                      <div style={{ marginTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <button onClick={() => setStep(1)}
                          style={{ display:'flex', alignItems:'center', gap:'5px', background:'none', border:'none', color:'#6b6b70', fontSize:'14px', cursor:'pointer' }}>
                          <ChevronLeft size={14}/> Back
                        </button>
                        <motion.button
                          whileHover={time?{scale:1.02}:{}}
                          whileTap={time?{scale:0.97}:{}}
                          onClick={() => time && setStep(3)}
                          style={{
                            display:'flex', alignItems:'center', gap:'8px',
                            background: time ? 'linear-gradient(135deg,#2ab5b5,#1a8c8c)' : '#e8eaf0',
                            color: time ? '#fff' : '#9999a5',
                            padding:'11px 24px', borderRadius:'50px',
                            fontSize:'14px', fontWeight:700, border:'none',
                            cursor: time ? 'pointer' : 'not-allowed',
                            boxShadow: time ? '0 5px 18px rgba(26,140,140,0.3)' : 'none',
                            transition:'all .2s',
                          }}
                        >
                          Continue <ArrowRight size={14}/>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 – info */}
                  {step===3 && (
                    <motion.div key="s3"
                      initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}
                      transition={{duration:0.2}}
                    >
                      {/* Summary */}
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'18px' }}>
                        {[{icon:Calendar,text:fmtDate(date)},{icon:Clock,text:time}].map(({icon:Icon,text}) => (
                          <div key={text} style={{
                            display:'flex', alignItems:'center', gap:'6px',
                            background:'#f0fafa', border:'1px solid rgba(26,140,140,0.2)',
                            borderRadius:'50px', padding:'6px 12px',
                            fontSize:'clamp(11px,2.5vw,13px)', fontWeight:600, color:'#0d1f3c',
                          }}>
                            <Icon size={12} color="#1a8c8c"/> {text}
                          </div>
                        ))}
                      </div>

                      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                        <div>
                          <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#1a3560', marginBottom:'5px' }}>Full Name *</label>
                          <div style={{ position:'relative' }}>
                            <User size={14} color="#9999a5" style={{ position:'absolute', left:'11px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                            <input value={info.name} onChange={set('name')} placeholder="Your full name" required
                              style={{...inp, paddingLeft:'34px'}} onFocus={onFocus} onBlur={onBlur}/>
                          </div>
                        </div>

                        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,160px),1fr))', gap:'12px' }}>
                          <div>
                            <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#1a3560', marginBottom:'5px' }}>Phone *</label>
                            <div style={{ position:'relative' }}>
                              <Phone size={14} color="#9999a5" style={{ position:'absolute', left:'11px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                              <input type="tel" value={info.phone} onChange={set('phone')} placeholder="(000) 000-0000" required
                                style={{...inp, paddingLeft:'34px'}} onFocus={onFocus} onBlur={onBlur}/>
                            </div>
                          </div>
                          <div>
                            <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#1a3560', marginBottom:'5px' }}>Email *</label>
                            <div style={{ position:'relative' }}>
                              <Mail size={14} color="#9999a5" style={{ position:'absolute', left:'11px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                              <input type="email" value={info.email} onChange={set('email')} placeholder="you@email.com" required
                                style={{...inp, paddingLeft:'34px'}} onFocus={onFocus} onBlur={onBlur}/>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#1a3560', marginBottom:'5px' }}>Coverage Interest</label>
                          <select value={info.topic} onChange={set('topic')}
                            style={{...inp, color: info.topic ? '#1c1c1e' : '#9999a5'}}
                            onFocus={onFocus} onBlur={onBlur}>
                            <option value="">Select a topic (optional)</option>
                            {topics.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>

                      {error && (
                        <div style={{ marginTop:'12px', padding:'10px 14px', background:'#fff5f5', border:'1px solid #fed7d7', borderRadius:'8px', color:'#c53030', fontSize:'13px' }}>
                          {error}
                        </div>
                      )}

                      <div style={{ marginTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
                        <button onClick={() => setStep(2)}
                          style={{ display:'flex', alignItems:'center', gap:'5px', background:'none', border:'none', color:'#6b6b70', fontSize:'14px', cursor:'pointer' }}>
                          <ChevronLeft size={14}/> Back
                        </button>
                        <motion.button
                          onClick={handleConfirm} disabled={sending}
                          whileHover={!sending?{scale:1.02}:{}}
                          whileTap={!sending?{scale:0.97}:{}}
                          style={{
                            display:'flex', alignItems:'center', gap:'8px',
                            background:'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                            color:'#fff', padding:'13px 24px', borderRadius:'50px',
                            fontSize:'15px', fontWeight:700, border:'none',
                            cursor: sending ? 'not-allowed' : 'pointer',
                            opacity: sending ? 0.8 : 1,
                            boxShadow:'0 5px 18px rgba(26,140,140,0.3)',
                          }}
                        >
                          {sending
                            ? <><Loader size={15} style={{ animation:'spin .8s linear infinite' }}/> Sending…</>
                            : <><CheckCircle2 size={15}/> Confirm Appointment</>
                          }
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4 – success */}
                  {step===4 && (
                    <motion.div key="s4"
                      initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                      transition={{type:'spring',stiffness:240,damping:20}}
                      style={{ textAlign:'center', padding:'clamp(12px,3vw,24px) 0' }}
                    >
                      <motion.div
                        initial={{scale:0}} animate={{scale:1}}
                        transition={{delay:0.1,type:'spring',stiffness:280,damping:18}}
                        style={{
                          width:'68px', height:'68px', borderRadius:'50%',
                          background:'linear-gradient(135deg,#2ab5b5,#1a8c8c)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          margin:'0 auto 18px',
                          boxShadow:'0 8px 28px rgba(26,140,140,0.35)',
                        }}
                      >
                        <CheckCircle2 size={32} color="#fff" strokeWidth={2}/>
                      </motion.div>

                      <h3 style={{ fontFamily:'Syne', fontWeight:800, fontSize:'clamp(18px,5vw,24px)', color:'#0d1f3c', marginBottom:'8px' }}>
                        Appointment Confirmed!
                      </h3>
                      <p style={{ color:'#6b6b70', fontSize:'clamp(13px,3vw,15px)', lineHeight:'1.7', maxWidth:'360px', margin:'0 auto 20px' }}>
                        Alonzo will reach out shortly to confirm your session.
                      </p>

                      {/* Summary */}
                      <div style={{
                        background:'#f0fafa', border:'1px solid rgba(26,140,140,0.2)',
                        borderRadius:'14px', padding:'16px 18px',
                        display:'inline-flex', flexDirection:'column', gap:'9px',
                        textAlign:'left', marginBottom:'20px',
                        width:'100%', maxWidth:'360px',
                      }}>
                        {[
                          {icon:User,    label:'Name',  val:info.name},
                          {icon:Calendar,label:'Date',  val:fmtDate(date)},
                          {icon:Clock,   label:'Time',  val:time+' CST'},
                          {icon:Phone,   label:'Phone', val:info.phone},
                          {icon:Mail,    label:'Email', val:info.email},
                        ].map(({icon:Icon,label,val}) => (
                          <div key={label} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                            <Icon size={13} color="#1a8c8c" strokeWidth={2} style={{ flexShrink:0, marginTop:'2px' }}/>
                            <span style={{ fontSize:'12px', color:'#6b6b70', width:'40px', flexShrink:0 }}>{label}:</span>
                            <span style={{ fontSize:'12px', fontWeight:600, color:'#0d1f3c', wordBreak:'break-all' }}>{val}</span>
                          </div>
                        ))}
                      </div>

                      <p style={{ fontSize:'12px', color:'#9999a5', marginBottom:'16px' }}>
                        Questions?{' '}
                        <a href="tel:+17087042830" style={{ color:'#1a8c8c', fontWeight:600 }}>{PHONE_DISPLAY}</a>
                      </p>

                      <button onClick={onClose}
                        style={{
                          background:'#0d1f3c', color:'#fff',
                          padding:'11px 26px', borderRadius:'50px',
                          fontSize:'14px', fontWeight:600, border:'none', cursor:'pointer',
                        }}
                        onMouseEnter={e=>e.currentTarget.style.background='#1a3560'}
                        onMouseLeave={e=>e.currentTarget.style.background='#0d1f3c'}
                      >
                        Close
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
