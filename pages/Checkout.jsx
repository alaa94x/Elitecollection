const { useState } = React;

const STEPS = ['Details', 'Delivery', 'Payment'];

function CheckoutPage({ cart, setPage }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', country: 'Qatar', cardNum: '', expiry: '', cvv: '', name: '' });
  const [placed, setPlaced] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setPlaced(true);
  };

  if (placed) return <OrderConfirmation total={total} setPage={setPage} />;

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px', display: 'grid', gridTemplateColumns: '1fr', gap: 32 }} className="checkout-grid">

        {/* LEFT: Form */}
        <div>
          {/* Brand */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 22, letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 4 }}>ELITE</div>
            <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--muted)', textTransform: 'uppercase' }}>Secure Checkout</div>
          </div>

          {/* Step indicators */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, gap: 0 }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: i <= step ? 'pointer' : 'default' }}
                  onClick={() => i < step && setStep(i)}>
                  <div className={'step-indicator' + (i === step ? ' active' : i < step ? ' done' : '')}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: i === step ? 'var(--gold)' : 'var(--muted)' }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: i < step ? 'var(--gold-dim)' : 'var(--border)', margin: '0 12px 20px' }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 0: Personal details */}
          {step === 0 && (
            <div className="anim-fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FloatInput label="First Name" value={form.firstName} onChange={v => set('firstName', v)} colSpan={1} />
              <FloatInput label="Last Name" value={form.lastName} onChange={v => set('lastName', v)} colSpan={1} />
              <FloatInput label="Email Address" value={form.email} onChange={v => set('email', v)} colSpan={2} type="email" />
              <FloatInput label="Phone Number" value={form.phone} onChange={v => set('phone', v)} colSpan={2} type="tel" />
            </div>
          )}

          {/* Step 1: Delivery */}
          {step === 1 && (
            <div className="anim-fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FloatInput label="Street Address" value={form.address} onChange={v => set('address', v)} colSpan={2} />
              <FloatInput label="City" value={form.city} onChange={v => set('city', v)} colSpan={1} />
              <FloatSelect label="Country" value={form.country} onChange={v => set('country', v)} options={['Qatar', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman']} />
              <div style={{ gridColumn: '1/-1', padding: '16px', background: 'var(--card)', border: '1px solid var(--border)', marginTop: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 11, color: 'var(--cream)', marginBottom: 2 }}>Complimentary Express Delivery</div>
                    <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, color: 'var(--muted)' }}>1–2 business days · Signature required</div>
                  </div>
                  <span style={{ fontFamily: 'var(--ff-serif)', fontSize: 16, color: 'var(--gold)' }}>Free</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="anim-fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FloatInput label="Cardholder Name" value={form.name} onChange={v => set('name', v)} colSpan={2} />
              <FloatInput label="Card Number" value={form.cardNum} onChange={v => set('cardNum', v)} colSpan={2} maxLength={19} placeholder="•••• •••• •••• ••••" />
              <FloatInput label="Expiry (MM/YY)" value={form.expiry} onChange={v => set('expiry', v)} colSpan={1} maxLength={5} />
              <FloatInput label="CVV" value={form.cvv} onChange={v => set('cvv', v)} colSpan={1} maxLength={4} type="password" />
              <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0' }}>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>🔒</span>
                <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>256-bit SSL encryption · PCI DSS compliant</span>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            {step > 0 && (
              <button className="btn-outline" onClick={() => setStep(s => s - 1)} style={{ padding: '14px 24px', flex: 1 }}>
                Back
              </button>
            )}
            <button className="btn-gold" onClick={handleNext} style={{ padding: '16px', flex: 2, fontSize: 11, letterSpacing: '0.18em' }}>
              {step < STEPS.length - 1 ? 'Continue' : 'Place Order'}
            </button>
          </div>

          <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, color: 'var(--muted)', textAlign: 'center', marginTop: 16, letterSpacing: '0.06em' }}>
            By placing your order you agree to our terms of service
          </p>
        </div>

        {/* RIGHT: Order summary */}
        <div>
          <div className="glass" style={{ padding: '28px', position: 'sticky', top: 90 }}>
            <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>
              Order Summary
            </div>

            {cart.length === 0 ? (
              <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 12, color: 'var(--muted)' }}>Your cart is empty</p>
            ) : cart.map(item => (
              <div key={item.id + item.size} style={{ display: 'flex', gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border2)' }}>
                <div className="img-placeholder" style={{ width: 64, height: 64, flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95 }} onError={e => e.currentTarget.style.display = 'none'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 15, color: 'var(--cream)', marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, color: 'var(--muted)' }}>Size {item.size} · Qty {item.qty}</div>
                </div>
                <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--gold)', whiteSpace: 'nowrap' }}>
                  SAR {(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))}

            <div className="divider" style={{ margin: '8px 0 16px' }} />
            {[['Subtotal', `SAR ${subtotal.toLocaleString()}`], ['Delivery', 'Complimentary'], ['Duties', 'Included']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 11, color: 'var(--muted)' }}>{k}</span>
                <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 11, color: 'var(--cream-dim)' }}>{v}</span>
              </div>
            ))}
            <div className="divider" style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cream)' }}>Total</span>
              <span style={{ fontFamily: 'var(--ff-serif)', fontSize: 22, color: 'var(--gold)' }}>SAR {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) { .checkout-grid { grid-template-columns: 1fr 420px !important; } }
      `}</style>
    </div>
  );
}

function FloatInput({ label, value, onChange, colSpan, type = 'text', maxLength, placeholder = '' }) {
  return (
    <div className="float-wrap" style={{ gridColumn: `span ${colSpan}` }}>
      <input className="float-input" type={type} value={value} onChange={e => onChange(e.target.value)}
        maxLength={maxLength} placeholder=" " />
      <label className="float-label">{label}</label>
    </div>
  );
}

function FloatSelect({ label, value, onChange, options }) {
  return (
    <div className="float-wrap" style={{ gridColumn: 'span 1' }}>
      <select className="float-input" value={value} onChange={e => onChange(e.target.value)}
        style={{ paddingTop: 20, paddingBottom: 8, cursor: 'pointer' }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <label className="float-label" style={{ top: 6, fontSize: 9, color: 'var(--gold)' }}>{label}</label>
    </div>
  );
}

function OrderConfirmation({ total, setPage }) {
  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: 500, width: '100%', textAlign: 'center' }} className="anim-fade-up">
        <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: 24, color: 'var(--gold)', animation: 'pulseGold 2s ease-in-out 3' }}>
          ✓
        </div>
        <h2 className="serif" style={{ fontSize: 42, fontWeight: 300, color: 'var(--cream)', marginBottom: 12 }}>
          Order Confirmed
        </h2>
        <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
          Your bespoke pair is now in the hands of our master craftsmen.
        </p>
        <p style={{ fontFamily: 'var(--ff-serif)', fontSize: 18, color: 'var(--gold)', fontStyle: 'italic', marginBottom: 36 }}>
          "We'll notify you when it begins its journey."
        </p>
        <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0', marginBottom: 36 }}>
          <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Order Total</div>
          <div className="serif" style={{ fontSize: 28, color: 'var(--gold)' }}>SAR {total.toLocaleString()}</div>
        </div>
        <button className="btn-gold" onClick={() => { setPage('collection'); window.scrollTo(0, 0); }} style={{ padding: '16px 48px', fontSize: 11, letterSpacing: '0.18em' }}>
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { CheckoutPage });
