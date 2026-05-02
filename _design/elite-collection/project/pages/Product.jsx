const { useState, useEffect } = React;

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7b4d3fef59c8?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=900&q=85&auto=format&fit=crop',
];

const ACCORDIONS = [
  {
    id: 'material',
    title: 'Material & Care',
    content: 'Crafted from hand-selected full-grain camel leather sourced exclusively from Doha tanneries. The leather is treated with natural oils to achieve its distinctive supple hand. Clean with a soft, dry cloth. Condition monthly with our complimentary leather balm. Store in the included cedar shoe trees.',
  },
  {
    id: 'shipping',
    title: 'Delivery & Packaging',
    content: 'Complimentary express delivery within Qatar (1–2 business days). International delivery to GCC within 3–5 business days. Each pair is presented in a hand-stamped box with silk tissue and a personalized certificate of authenticity signed by your craftsman.',
  },
  {
    id: 'sizing',
    title: 'Sizing & Fit',
    content: 'Our shoes are sized in EU measurements and run true to size. If you are between sizes, we recommend sizing up. Bespoke last modifications are available at no additional charge for returning clients. A complimentary sizing kit can be dispatched to your address upon request.',
  },
];

function ProductPage({ product, onAddToCart, setPage }) {
  const p = product || window.ALL_PRODUCTS[0];
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(1);

  // Cycle gallery images automatically
  useEffect(() => {
    const iv = setInterval(() => setGalleryIdx(i => (i + 1) % GALLERY_IMAGES.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const handleAdd = () => {
    if (!selectedSize) {
      const el = document.getElementById('size-section');
      if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    onAddToCart({ ...p, size: selectedSize, qty, leather: p.leather });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2200);
  };

  const toggleAccordion = (id) => setOpenAccordion(prev => prev === id ? null : id);

  return (
    <div style={{ paddingTop: 70, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 0 120px' }}>

        {/* Breadcrumb */}
        <div style={{ padding: '20px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setPage('collection')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            Collection
          </button>
          <span style={{ color: 'var(--muted)', fontSize: 10 }}>›</span>
          <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase' }}>{p.name}</span>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }} className="pdp-grid">

          {/* ── Gallery ── */}
          <div style={{ position: 'relative' }}>
            {/* Main image */}
            <div style={{ position: 'relative', paddingBottom: '85%', overflow: 'hidden', background: 'var(--card)' }}>
              {GALLERY_IMAGES.map((src, i) => (
                <img key={src} src={src} alt={p.name} style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', opacity: galleryIdx === i ? 1 : 0,
                  transition: 'opacity 1s ease',
                  transform: galleryIdx === i ? 'scale(1)' : 'scale(1.03)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '1s',
                }} onError={e => e.currentTarget.style.display = 'none'} />
              ))}
              {/* Gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(7,6,4,0.4) 100%)', pointerEvents: 'none' }} />

              {/* Tag */}
              {p.tag && (
                <div style={{ position: 'absolute', top: 20, left: 20 }}>
                  <span className="tag-chip">{p.tag}</span>
                </div>
              )}

              {/* Wishlist */}
              <button onClick={() => setWishlisted(w => !w)} style={{
                position: 'absolute', top: 20, right: 20,
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(13,11,8,0.7)', backdropFilter: 'blur(8px)',
                border: `1px solid ${wishlisted ? 'var(--gold)' : 'var(--border)'}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s', fontSize: 16,
              }}>
                <span style={{ color: wishlisted ? 'var(--gold)' : 'var(--muted)' }}>
                  {wishlisted ? '♥' : '♡'}
                </span>
              </button>

              {/* Nav arrows */}
              {[['‹', -1], ['›', 1]].map(([arrow, dir]) => (
                <button key={dir} onClick={() => setGalleryIdx(i => (i + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
                  style={{
                    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                    [dir === -1 ? 'left' : 'right']: 16,
                    width: 36, height: 36, background: 'rgba(13,11,8,0.6)',
                    backdropFilter: 'blur(8px)', border: '1px solid var(--border)',
                    cursor: 'pointer', color: 'var(--cream)', fontSize: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >{arrow}</button>
              ))}
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 2, padding: '2px 0' }}>
              {GALLERY_IMAGES.map((src, i) => (
                <button key={src} onClick={() => setGalleryIdx(i)} style={{
                  flex: 1, paddingBottom: '20%', position: 'relative', overflow: 'hidden',
                  border: `1px solid ${galleryIdx === i ? 'var(--gold)' : 'transparent'}`,
                  cursor: 'pointer', transition: 'border-color 0.3s', background: 'var(--card)',
                }}>
                  <img src={src} alt="" style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: galleryIdx === i ? 1 : 0.45, transition: 'opacity 0.3s',
                  }} onError={e => e.currentTarget.style.display = 'none'} />
                </button>
              ))}
            </div>

            {/* Dots mobile */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '14px 0 0' }}>
              {GALLERY_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setGalleryIdx(i)}
                  className={'gallery-dot' + (galleryIdx === i ? ' active' : '')}
                  style={{ border: 'none', cursor: 'pointer', padding: 0 }}
                />
              ))}
            </div>
          </div>

          {/* ── Details ── */}
          <div style={{ padding: '32px 24px 40px' }}>

            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {'★★★★★'.split('').map((s, i) => <span key={i} className="star">{s}</span>)}
              </div>
              <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 11, color: 'var(--muted)' }}>48 reviews</span>
            </div>

            {/* Name */}
            <h1 className="serif" style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.05, marginBottom: 8 }}>
              {p.name}
            </h1>

            {/* Leather + story line */}
            <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 20 }}>
              {p.leather} · Handcrafted in Doha
            </p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--ff-serif)', fontSize: 32, color: 'var(--gold)', fontWeight: 300 }}>
                SAR {p.price.toLocaleString()}
              </span>
              <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                · Duties included
              </span>
            </div>

            <div className="divider" style={{ marginBottom: 24 }} />

            {/* Description */}
            <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 13, lineHeight: 1.8, color: 'var(--cream-dim)', marginBottom: 28 }}>
              A statement of understated authority. The {p.name} is individually shaped on a hand-carved wooden last, requiring 48 hours of continuous attention from a single master artisan. Limited to 40 pairs per season.
            </p>

            {/* Attributes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
              {[['Leather', p.leather], ['Style', p.style], ['Origin', 'Doha, Qatar'], ['Edition', 'Numbered']].map(([k, v]) => (
                <div key={k} style={{ borderLeft: '1px solid var(--border)', paddingLeft: 12 }}>
                  <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 3 }}>{k}</div>
                  <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 12, color: 'var(--cream)' }}>{v}</div>
                </div>
              ))}
            </div>

            <div className="divider" style={{ marginBottom: 24 }} />

            {/* Size selector */}
            <div id="size-section" style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--cream-dim)', textTransform: 'uppercase' }}>
                  Select Size (EU)
                </span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--ff-sans)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.06em', textDecoration: 'underline' }}>
                  Size Guide
                </button>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.sizes.map(s => (
                  <button key={s}
                    className={'size-btn' + (selectedSize === s ? ' active' : '')}
                    onClick={() => setSelectedSize(s)}
                  >{s}</button>
                ))}
              </div>
              {!selectedSize && (
                <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, color: 'var(--gold)', marginTop: 8, letterSpacing: '0.06em' }}>
                  ↑ Please select a size to continue
                </p>
              )}
            </div>

            {/* Qty */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--cream-dim)', textTransform: 'uppercase' }}>Qty</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)' }}>
                {['-', '+'].map((op, i) => (
                  <button key={op} onClick={() => setQty(q => op === '-' ? Math.max(1, q - 1) : q + 1)} style={{
                    width: 36, height: 36, background: 'none', border: 'none',
                    color: 'var(--cream-dim)', cursor: 'pointer', fontSize: 16,
                    transition: 'color 0.2s',
                    borderRight: i === 0 ? '1px solid var(--border)' : 'none',
                    borderLeft: i === 1 ? '1px solid var(--border)' : 'none',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--cream-dim)'}
                  >{op}</button>
                ))}
                <span style={{ width: 36, textAlign: 'center', fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--cream)' }}>{qty}</span>
              </div>
            </div>

            {/* CTA — desktop */}
            <button className="btn-gold" onClick={handleAdd} style={{
              width: '100%', padding: '18px', fontSize: 11, letterSpacing: '0.2em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginBottom: 10, position: 'relative',
            }}>
              {addedFeedback ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>✓</span> Added to Selection
                </span>
              ) : (
                <>
                  <span>Reserve This Pair</span>
                  <span style={{ opacity: 0.6, fontSize: 10 }}>· SAR {(p.price * qty).toLocaleString()}</span>
                </>
              )}
            </button>

            <button className="btn-outline" style={{ width: '100%', padding: '14px', fontSize: 10, letterSpacing: '0.15em' }}
              onClick={() => alert('A client advisor will contact you within 2 hours.')}>
              Speak with a Client Advisor
            </button>

            {/* Trust row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, flexWrap: 'wrap', gap: 10 }}>
              {['Free Express Delivery', 'Certificate Included', '30-Day Returns'].map(t => (
                <span key={t} style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.08em', color: 'var(--muted)', textAlign: 'center' }}>
                  ✓ {t}
                </span>
              ))}
            </div>

            <div className="divider" style={{ margin: '28px 0' }} />

            {/* Accordions */}
            <div>
              {ACCORDIONS.map(acc => (
                <div key={acc.id} style={{ borderBottom: '1px solid var(--border2)', marginBottom: 0 }}>
                  <button onClick={() => toggleAccordion(acc.id)} style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cream)' }}>{acc.title}</span>
                    <span style={{
                      color: 'var(--gold)', fontSize: 16, fontWeight: 300, lineHeight: 1,
                      transform: openAccordion === acc.id ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease', display: 'block',
                    }}>+</span>
                  </button>
                  <div className={'accordion-content' + (openAccordion === acc.id ? ' open' : '')}>
                    <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 12, lineHeight: 1.8, color: 'var(--cream-dim)', paddingBottom: 16 }}>
                      {acc.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky ATC — mobile */}
      <div className="sticky-atc" style={{ display: 'none' }} id="sticky-atc">
        <button className="btn-gold" onClick={handleAdd} style={{ width: '100%', padding: '16px', fontSize: 11, letterSpacing: '0.18em' }}>
          {addedFeedback ? '✓ Added' : `Reserve · SAR ${(p.price * qty).toLocaleString()}`}
        </button>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .pdp-grid { grid-template-columns: 1fr 1fr !important; align-items: start; }
          #sticky-atc { display: none !important; }
        }
        @media (max-width: 899px) {
          #sticky-atc { display: block !important; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { ProductPage });
