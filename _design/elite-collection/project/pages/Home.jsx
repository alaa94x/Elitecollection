const { useState, useEffect } = React;

const META_CARDS = [
  { id: 1, label: 'Hand-stitched Detail', sub: 'Triple-lock welt seam', icon: '✦', delay: 0 },
  { id: 2, label: 'Premium Camel Leather', sub: 'Full-grain, Doha tannery', icon: '◈', delay: 0.15 },
  { id: 3, label: '48hr Crafting Time', sub: 'Single artisan, zero compromise', icon: '◇', delay: 0.3 },
];

const FEATURED = [
  { id: 1, name: 'Al-Mahmal Oxford', price: 2800, tag: 'Signature', leather: 'Camel Nappa', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&q=85&auto=format&fit=crop' },
  { id: 2, name: 'Najd Derby', price: 2200, tag: 'New', leather: 'Goat Suede', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=700&q=85&auto=format&fit=crop' },
  { id: 3, name: 'Hijaz Loafer', price: 1950, tag: 'Bestseller', leather: 'Calf Leather', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=700&q=85&auto=format&fit=crop' },
];

function HomePage({ setPage, setSelectedProduct }) {
  const [metaVisible, setMetaVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMetaVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const goToProduct = (p) => { setSelectedProduct(p); setPage('product'); window.scrollTo(0, 0); };

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #faf8f4 0%, #f0ead8 60%, #faf8f4 100%)',
      }}>
        {/* Ambient rings */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600, height: 600, borderRadius: '50%',
          border: '1px solid rgba(184,146,74,0.12)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 400, height: 400, borderRadius: '50%',
          border: '1px solid rgba(184,146,74,0.18)',
          pointerEvents: 'none',
        }} />

        {/* Kicker */}
        <div className="anim-fade-up" style={{ animationDelay: '0.2s', textAlign: 'center', marginBottom: 32, zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 1, background: 'var(--gold-dim)' }} />
            <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.35em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              Est. 1962 · Doha
            </span>
            <div style={{ width: 32, height: 1, background: 'var(--gold-dim)' }} />
          </div>
        </div>

        {/* Headline */}
        <h1 className="anim-fade-up serif" style={{
          animationDelay: '0.35s', zIndex: 2, textAlign: 'center',
          fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-0.01em',
          color: 'var(--cream)', marginBottom: 8,
        }}>
          Where Heritage<br />
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Meets Sole</em>
        </h1>

        <p className="anim-fade-up" style={{
          animationDelay: '0.5s', zIndex: 2, textAlign: 'center',
          fontFamily: 'var(--ff-sans)', fontSize: 13, fontWeight: 300,
          letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 64,
          maxWidth: 320,
        }}>
          Hand-crafted Arabic leather shoes for those who command presence
        </p>

        {/* 3D Viewer — Sketchfab */}
        <div
          className="anim-fade-up"
          style={{ animationDelay: '0.6s', position: 'relative', width: 'min(560px, 92vw)', zIndex: 2 }}
        >
          {/* Ambient glow under viewer */}
          <div style={{
            position: 'absolute', bottom: -24, left: '50%',
            transform: 'translateX(-50%)',
            width: 320, height: 60,
            background: 'radial-gradient(ellipse, rgba(201,169,110,0.28) 0%, transparent 70%)',
            filter: 'blur(16px)', pointerEvents: 'none',
          }} />

          {/* Frame */}
          <div style={{
            border: '1px solid var(--border)',
            background: 'transparent',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <iframe
              title="Yellow Leather Loafers"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/ef49f910c0734c51964da2da1b8db718/embed?autospin=1&autostart=1&ui_theme=dark&ui_infos=0&ui_controls=1&ui_watermark=0&dnt=1&transparent=1"
              style={{ width: '100%', height: 420, display: 'block', border: 'none' }}
            />
            {/* Corner accents */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', pointerEvents: 'none' }} />
          </div>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              Drag · Rotate · Explore
            </span>
          </div>
        </div>

        {/* Mobile meta pills */}
        {metaVisible && (
          <div className="anim-fade-up" style={{
            animationDelay: '1s', display: 'flex', gap: 8, flexWrap: 'wrap',
            justifyContent: 'center', marginTop: 28, padding: '0 20px', zIndex: 2,
          }}>
            {META_CARDS.map(c => (
              <div key={c.id} className="glass tag-chip" style={{ fontSize: 9 }}>
                <span style={{ marginRight: 5 }}>{c.icon}</span>
                {c.label}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="anim-fade-up" style={{ animationDelay: '1.1s', display: 'flex', gap: 12, marginTop: 36, zIndex: 2 }}>
          <button className="btn-gold" onClick={() => { setPage('collection'); window.scrollTo(0, 0); }} style={{ padding: '14px 32px' }}>
            Explore Collection
          </button>
          <button className="btn-outline" onClick={() => { setPage('story'); window.scrollTo(0, 0); }} style={{ padding: '14px 28px' }}>
            Our Story
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
            Curated Selection
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(32px, 6vw, 54px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1 }}>
            Icons of Craft
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {FEATURED.map((p, i) => (
            <div key={p.id} onClick={() => goToProduct(p)}
              className="product-card anim-fade-up"
              style={{ position: 'relative', overflow: 'hidden', animationDelay: `${i * 0.12}s` }}
            >
              <div style={{ overflow: 'hidden', position: 'relative', paddingBottom: '120%' }}>
                <div className="img-placeholder card-img" style={{ position: 'absolute', inset: 0 }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.95, transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                    onError={e => e.currentTarget.style.display = 'none'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,6,4,0.7) 0%, transparent 50%)' }} />
                </div>

                {/* Tag */}
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <span className="tag-chip">{p.tag}</span>
                </div>

                {/* Hover overlay */}
                <div className="card-overlay" style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(7,6,4,0.5)',
                }}>
                  <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '10px 20px' }}>
                    View Details
                  </span>
                </div>
              </div>

              <div style={{ padding: '20px 4px 8px' }}>
                <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 20, color: 'var(--cream)', marginBottom: 3 }}>{p.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>{p.leather}</span>
                  <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--gold)' }}>SAR {p.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button className="btn-outline" onClick={() => { setPage('collection'); window.scrollTo(0, 0); }} style={{ padding: '14px 40px' }}>
            View Full Collection
          </button>
        </div>
      </section>

      {/* ── CRAFT BANNER ── */}
      <section style={{
        margin: '0 24px 80px', padding: '60px 40px',
        background: 'linear-gradient(135deg, var(--card) 0%, var(--card2) 100%)',
        border: '1px solid var(--border)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -20, width: 150, height: 150, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.06)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>
            The Promise
          </div>
          <h3 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.15, maxWidth: 600, marginBottom: 24 }}>
            "Every pair is numbered.<br />
            <em style={{ color: 'var(--gold)' }}>Every stitch, intentional."</em>
          </h3>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[['60+', 'Years of Heritage'], ['12', 'Master Artisans'], ['48hr', 'Per Pair'], ['∞', 'Lifetime Care']].map(([n, l]) => (
              <div key={l}>
                <div className="serif" style={{ fontSize: 32, color: 'var(--gold)', fontWeight: 300 }}>{n}</div>
                <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          [data-meta="true"] { display: block !important; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { HomePage });
