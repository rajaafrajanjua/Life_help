const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    client_name,
    client_phone,
    client_email,
    topic,
    date,
    time,
  } = req.body;

  // Basic validation
  if (!client_name || !client_phone || !client_email || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Sanitize inputs — strip any HTML tags
  const sanitize = (str) => String(str).replace(/<[^>]*>/g, '').trim();

  const name  = sanitize(client_name);
  const phone = sanitize(client_phone);
  const email = sanitize(client_email);
  const top   = sanitize(topic || 'General Inquiry');
  const dt    = sanitize(date);
  const tm    = sanitize(time);

  // Gmail transporter using app password from env vars
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,      // alcarr33@gmail.com
      pass: process.env.GMAIL_APP_PASS,  // 16-char app password
    },
  });

  // ── Email to owner (Alonzo) ──────────────────────────────
  const ownerMail = {
    from: `"PolicyCove Bookings" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `📅 New Appointment — ${name} | PolicyCove`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#f8f9fb;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0d1f3c,#1a3560);padding:28px 32px;">
          <h1 style="color:#fff;font-size:20px;margin:0 0 4px;">New Appointment Booking</h1>
          <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:0;">PolicyCove — Free Policy Review Request</p>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;width:120px;">Client Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:600;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:600;font-size:14px;">${phone}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#1a8c8c;font-weight:600;font-size:14px;">${email}</td></tr>
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
          <p style="margin:0;font-size:11px;color:#9999a5;">PolicyCove · Independent Life Insurance Brokerage · alcarr33@gmail.com</p>
        </div>
      </div>
    `,
  };

  // ── Confirmation email to client ─────────────────────────
  const clientMail = {
    from: `"Alonzo Carr — PolicyCove" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Your PolicyCove Appointment is Confirmed — ${dt} at ${tm}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#f8f9fb;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0d1f3c,#1a3560);padding:28px 32px;">
          <h1 style="color:#fff;font-size:20px;margin:0 0 4px;">Appointment Confirmed!</h1>
          <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:0;">PolicyCove — Free Policy Review</p>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <p style="color:#3a3a3a;font-size:15px;line-height:1.7;margin:0 0 20px;">
            Hi ${name}, thank you for booking a free policy review with PolicyCove.
            Here is a summary of your appointment:
          </p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;width:80px;">Date</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:700;font-size:15px;">${dt}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#6b6b70;font-size:13px;">Time</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;color:#0d1f3c;font-weight:700;font-size:15px;">${tm} CST</td></tr>
            <tr><td style="padding:10px 0;color:#6b6b70;font-size:13px;">Topic</td>
                <td style="padding:10px 0;color:#0d1f3c;font-weight:600;font-size:14px;">${top}</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f0fafa;border-radius:10px;border:1px solid rgba(26,140,140,0.2);">
            <p style="margin:0 0 6px;font-size:13px;color:#1a8c8c;font-weight:700;">Alonzo Carr</p>
            <p style="margin:0;font-size:13px;color:#6b6b70;">Licensed Insurance Broker · PolicyCove</p>
            <p style="margin:4px 0 0;font-size:13px;color:#0d1f3c;font-weight:600;">+1 (708) 704-2830</p>
          </div>
          <p style="color:#6b6b70;font-size:13px;line-height:1.7;margin:20px 0 0;">
            If you need to reschedule or have any questions before your appointment,
            simply reply to this email or call us at <strong>+1 (708) 704-2830</strong>.
          </p>
        </div>
        <div style="padding:16px 32px;background:#f8f9fb;text-align:center;">
          <p style="margin:0;font-size:11px;color:#9999a5;">
            PolicyCove · Independent Life Insurance Brokerage<br/>
            Your Coverage. Your Questions. Our Guidance.
          </p>
        </div>
      </div>
    `,
  };

  try {
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(ownerMail),
      transporter.sendMail(clientMail),
    ]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
