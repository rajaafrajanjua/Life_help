const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // CORS headers — needed for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { client_name, client_phone, client_email, topic, date, time, state } = req.body;

  if (!client_name || !client_phone || !client_email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sanitize = (str) => String(str || '').replace(/<[^>]*>/g, '').trim();

  const name  = sanitize(client_name);
  const phone = sanitize(client_phone);
  const email = sanitize(client_email);
  const top   = sanitize(topic  || 'General Inquiry');
  const dt    = sanitize(date   || 'To be scheduled');
  const tm    = sanitize(time   || 'Flexible');
  const st    = sanitize(state  || 'Not specified');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  // ── Email to owner ──────────────────────────────────────────────────
  const ownerMail = {
    from: `"All Generations Life Brokers" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New Inquiry — ${name} | All Generations Life Brokers`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;background:#f8f9fb;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0d1f3c,#1a3560);padding:28px 32px;">
          <h1 style="color:#fff;font-size:20px;margin:0 0 4px;">New Inquiry Received</h1>
          <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:0;">All Generations Life Brokers LLC</p>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;width:130px;">Client Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:600;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:600;font-size:14px;">${phone}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#1a8c8c;font-weight:600;font-size:14px;">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">State</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:600;font-size:14px;">${st}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">Topic</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:600;font-size:14px;">${top}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">Date</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:600;font-size:14px;">${dt}</td></tr>
            <tr><td style="padding:10px 0;color:#6b6b70;font-size:13px;">Time</td>
                <td style="padding:10px 0;color:#0d1f3c;font-weight:600;font-size:14px;">${tm} CST</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f0fafa;border-radius:10px;border:1px solid rgba(26,140,140,0.2);">
            <p style="margin:0;font-size:13px;color:#1a8c8c;font-weight:600;">Reply directly to this email to reach ${name}</p>
          </div>
        </div>
        <div style="padding:16px 32px;background:#f8f9fb;text-align:center;">
          <p style="margin:0;font-size:11px;color:#9999a5;">
            All Generations Life Brokers LLC · 20 Towne Drive, PMB 339, Bluffton SC 29910<br/>
            Filing ID# 220404-1051096 · allgenerationsinsurancebrokers.com · policycove@gmail.com
          </p>
        </div>
      </div>
    `,
  };

  // ── Confirmation email to client ────────────────────────────────────
  const clientMail = {
    from: `"All Generations Life Brokers LLC" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Your Request is Confirmed — All Generations Life Brokers LLC`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;background:#f8f9fb;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0d1f3c,#1a3560);padding:28px 32px;">
          <h1 style="color:#fff;font-size:20px;margin:0 0 4px;">We Received Your Request!</h1>
          <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:0;">All Generations Life Brokers LLC</p>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <p style="color:#3a3a3a;font-size:15px;line-height:1.7;margin:0 0 20px;">
            Hi ${name}, thank you for reaching out to All Generations Life Brokers LLC.
            We will be in touch with you shortly to schedule your complimentary policy review.
          </p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;width:80px;">Topic</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:600;font-size:14px;">${top}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">Date</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:700;font-size:15px;">${dt}</td></tr>
            <tr><td style="padding:10px 0;color:#6b6b70;font-size:13px;">Time</td>
                <td style="padding:10px 0;color:#0d1f3c;font-weight:700;font-size:15px;">${tm} CST</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f0fafa;border-radius:10px;border:1px solid rgba(26,140,140,0.2);">
            <p style="margin:0 0 4px;font-size:13px;color:#1a8c8c;font-weight:700;">All Generations Life Brokers LLC</p>
            <p style="margin:0 0 2px;font-size:13px;color:#6b6b70;">20 Towne Drive, PMB 339 · Bluffton, SC 29910</p>
            <p style="margin:4px 0 0;font-size:13px;color:#0d1f3c;font-weight:600;">(844) 425-5436</p>
            <p style="margin:2px 0 0;font-size:13px;color:#1a8c8c;">allgenerationsinsurancebrokers.com</p>
          </div>
          <p style="color:#6b6b70;font-size:13px;line-height:1.7;margin:20px 0 0;">
            If you have any questions, reply to this email or call us at <strong>(844) 425-5436</strong>.
          </p>
        </div>
        <div style="padding:16px 32px;background:#f8f9fb;text-align:center;">
          <p style="margin:0;font-size:11px;color:#9999a5;">
            All Generations Life Brokers LLC · Independent Life Insurance Brokerage<br/>
            20 Towne Drive, PMB 339, Bluffton SC 29910 · Filing ID# 220404-1051096
          </p>
        </div>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(ownerMail),
      transporter.sendMail(clientMail),
    ]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
};
