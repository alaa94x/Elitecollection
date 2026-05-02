const { useState, useEffect } = React;

function Nav({ page, setPage, cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { id: 'home',       label: 'Atelier' },
    { id: 'collection', label: 'Collection' },
    { id: 'story',      label: 'Our Story' },
    { id: 'contact',    label: 'Contact' },
  ];

  const go = (id) => { setPage(id); setMenuOpen(false); window.scrollTo(0,0); };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80,
        padding: scrolled ? '12px 24px' : '20px 24px',
        background: scrolled ? 'rgba(250,248,244,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button onClick={() => go('home')} style={{ background:'none', border:'none', cursor:'pointer', padding: 0 }}>
          <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 18, letterSpacing: '0.18em', color: 'var(--gold)', fontWeight: 400 }}>
            ELITE
          </div>
          <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 8, letterSpacing: '0.35em', color: 'var(--muted)', textTransform: 'uppercase', marginTop: 1 }}>
            Arabic Leather Artisans
          </div>
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--ff-sans)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', fontWeight: 400,
              color: page === l.id ? 'var(--gold)' : 'var(--cream-dim)',
              transition: 'color 0.25s',
              position: 'relative', padding: '4px 0',
            }}>
              {l.label}
              {page === l.id && (
                <span style={{
                  position: 'absolute', bottom: -2, left: 0, right: 0,
                  height: 1, background: 'var(--gold)',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={onCartOpen} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            position: 'relative', padding: 4,
          }}>
            <CartIcon color="var(--cream)" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -2,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--gold)', color: 'var(--bg)',
                fontSize: 9, fontFamily: 'var(--ff-sans)', fontWeight: 500,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount}</span>
            )}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(true)} className="hamburger-btn" style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            display: 'flex', flexDirection: 'column', gap: 5,
          }}>
            <span style={{ display:'block', width:22, height:1, background:'var(--cream)' }} />
            <span style={{ display:'block', width:14, height:1, background:'var(--gold)' }} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{ display:'flex', flexDirection:'column', padding:'80px 40px 40px' }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position:'absolute', top:24, right:24,
            background:'none', border:'none', cursor:'pointer',
            color:'var(--cream-dim)', fontSize:24, lineHeight:1,
          }}>✕</button>

          <div style={{ fontFamily:'var(--ff-serif)', fontSize:11, letterSpacing:'0.3em', color:'var(--muted)', textTransform:'uppercase', marginBottom:48 }}>
            Navigation
          </div>

          {navLinks.map((l, i) => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background:'none', border:'none', cursor:'pointer', textAlign:'left',
              fontFamily:'var(--ff-serif)', fontSize:48, fontWeight:300,
              color: page === l.id ? 'var(--gold)' : 'var(--cream)',
              padding:'8px 0', marginBottom:4,
              transition:'color 0.25s',
              animationDelay: `${i * 0.08}s`,
            }} className="anim-fade-up">
              {l.label}
            </button>
          ))}

          <div style={{ marginTop:'auto', borderTop:'1px solid var(--border)', paddingTop:24 }}>
            <p style={{ fontFamily:'var(--ff-sans)', fontSize:11, letterSpacing:'0.1em', color:'var(--muted)', textTransform:'uppercase' }}>
              Bespoke Appointments Available
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hamburger-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}

function CartIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}

Object.assign(window, { Nav });
