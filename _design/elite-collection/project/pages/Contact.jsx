const { useState } = React;

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }} className="anim-fade-up">
        <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 18, letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 24, fontStyle: 'italic' }}>
          Message Received
        </div>
        <h2 className="serif" style={{ fontSize: 42, fontWeight: 300, color: 'var(--cream)', marginBottom: 16 }}>
          A Client Advisor<br />Will Be in Touch
        </h2>
        <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
          We respond to all inquiries within 2 business hours. For urgent matters, call our Doha atelier directly.
        </p>
        <div style={{ marginTop: 32, padding: '20px', border: '1px solid var(--border)', display: 'inline-block' }}>
          <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>Direct Line</div>
          <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 20, color: 'var(--gold)' }}>+966 11 XXX XXXX</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ padding: '56px 24px 48px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }} className="anim-fade-up">
        <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.35em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 14 }}>
          Personal Service
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1, marginBottom: 16 }}>
          Speak with a<br /><em style={{ color: 'var(--gold)' }}>Client Advisor</em>
        </h1>
        <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
          Every inquiry is handled personally by a dedicated advisor. Whether you seek a bespoke commission, sizing counsel, or a question about our craft — we are at your service.
        </p>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '1fr', gap: 40 }} className="contact-grid">

        {/* Form card */}
        <div className="glass" style={{ padding: '40px 32px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <ContactInput label="Full Name" k="name" form={form} set={set} focused={focused} setFocused={setFocused} colSpan={1} />
              <ContactInput label="Email Address" k="email" form={form} set={set} focused={focused} setFocused={setFocused} colSpan={1} type="email" />
              <ContactInput label="Phone Number" k="phone" form={form} set={set} focused={focused} setFocused={setFocused} colSpan={1} type="tel" />
              <div style={{ gridColumn: 'span 1' }}>
                <div className="float-wrap">
                  <select
                    className="float-input"
                    value={form.subject}
                    onChange={e => set('subject', e.target.value)}
                    style={{ paddingTop: 20, paddingBottom: 8, cursor: 'pointer' }}
                  >
                    <option value=""> </option>
                    <option>Bespoke Commission</option>
                    <option>Product Inquiry</option>
                    <option>Sizing Assistance</option>
                    <option>Order Support</option>
                    <option>Press & Partnerships</option>
                  </select>
                  <label className="float-label" style={form.subject ? { top: 6, fontSize: 9, color: 'var(--gold)' } : {}}>
                    Subject
                  </label>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="float-wrap" style={{ marginBottom: 24 }}>
              <textarea
                className="float-input"
                value={form.message}
                onChange={e => set('message', e.target.value)}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                placeholder=" "
                rows={5}
                style={{ resize: 'vertical', minHeight: 120 }}
              />
              <label className="float-label">Your Message</label>
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: 11, letterSpacing: '0.2em' }}>
              Send Message
            </button>
          </form>
        </div>

        {/* Info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            {
              icon: '◈',
              title: 'Doha Atelier',
              lines: ['Al-Dirah Quarter, Doha', 'Kingdom of Qatar', 'Open Sun–Thu, 9am–6pm'],
            },
            {
              icon: '◇',
              title: 'Private Appointments',
              lines: ['Bespoke consultations by appointment', 'In-atelier or at your residence', 'Available 7 days a week'],
            },
            {
              icon: '✦',
              title: 'Client Services',
              lines: ['+966 11 XXX XXXX', 'advisors@elitecollection.sa', 'Response within 2 hours'],
            },
          ].map(block => (
            <div key={block.title} style={{ padding: '28px 24px', border: '1px solid var(--border2)', transition: 'border-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ color: 'var(--gold)', fontSize: 16, marginTop: 2, flexShrink: 0 }}>{block.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
                    {block.title}
                  </div>
                  {block.lines.map(l => (
                    <div key={l} style={{ fontFamily: 'var(--ff-sans)', fontSize: 12, color: 'var(--cream-dim)', lineHeight: 1.7 }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Signature promise */}
          <div style={{ padding: '24px', background: 'linear-gradient(135deg, var(--card) 0%, var(--card2) 100%)', border: '1px solid var(--border)', marginTop: 0 }}>
            <p className="serif" style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.6, marginBottom: 10 }}>
              "No inquiry is too small. No request is unreasonable. You are our guest."
            </p>
            <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              The Elite Promise
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) { .contact-grid { grid-template-columns: 1fr 380px !important; align-items: start; } }
      `}</style>
    </div>
  );
}

function ContactInput({ label, k, form, set, focused, setFocused, colSpan = 1, type = 'text' }) {
  return (
    <div className="float-wrap" style={{ gridColumn: `span ${colSpan}` }}>
      <input
        className="float-input"
        type={type}
        value={form[k]}
        onChange={e => set(k, e.target.value)}
        onFocus={() => setFocused(k)}
        onBlur={() => setFocused(null)}
        placeholder=" "
      />
      <label className="float-label">{label}</label>
    </div>
  );
}

Object.assign(window, { ContactPage });
