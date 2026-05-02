const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#c9a96e",
  "darkMode": true,
  "heroLayout": "centered",
  "gridColumns": "auto"
}/*EDITMODE-END*/;

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweakVisible, setTweakVisible] = useState(false);

  // Persist cart
  useEffect(() => {
    const saved = localStorage.getItem('elite_cart');
    if (saved) try { setCart(JSON.parse(saved)); } catch (e) { }
  }, []);
  useEffect(() => {
    localStorage.setItem('elite_cart', JSON.stringify(cart));
  }, [cart]);

  // Tweaks panel protocol
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweakVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweakVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (k, v) => {
    setTweaks(t => {
      const next = { ...t, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
      return next;
    });
  };

  // Apply accent color
  useEffect(() => {
    document.documentElement.style.setProperty('--gold', tweaks.accentColor);
  }, [tweaks.accentColor]);

  const addToCart = (item) => {
    setCart(prev => {
      const key = i => i.id === item.id && i.size === item.size;
      const exists = prev.find(key);
      if (exists) return prev.map(i => key(i) ? { ...i, qty: i.qty + item.qty } : i);
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const pageProps = { page, setPage, cart, setSelectedProduct, selectedProduct };

  return (
    <>
      {/* Global accent override */}
      <style>{`
        :root { --gold: ${tweaks.accentColor}; --gold-dim: color-mix(in srgb, ${tweaks.accentColor} 65%, #000); --gold-glow: color-mix(in srgb, ${tweaks.accentColor} 18%, transparent); }
      `}</style>

      <Nav page={page} setPage={setPage} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        {page === 'home' && <HomePage       {...pageProps} />}
        {page === 'collection' && <CollectionPage {...pageProps} />}
        {page === 'product' && <ProductPage    {...pageProps} onAddToCart={addToCart} />}
        {page === 'checkout' && <CheckoutPage   {...pageProps} />}
        {page === 'story' && <StoryPage      {...pageProps} />}
        {page === 'contact' && <ContactPage    {...pageProps} />}
      </main>

      {/* Footer */}
      {page !== 'checkout' && (
        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '48px 24px 32px',
          background: 'var(--surface)',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 20, letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: 6 }}>ELITE</div>
              <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.25em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>Arabic Leather Artisans</div>
              <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 11, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 220 }}>
                Handcrafted in Doha since 1962. Limited to 400 pairs per year.
              </p>
            </div>

            {/* Links */}
            {[
              { title: 'Collection', links: ['All Pieces', 'New Arrivals', 'Signature', 'Limited Edition'] },
              { title: 'Atelier', links: ['Our Story', 'Craftsmanship', 'Bespoke', 'Appointments'] },
              { title: 'Client', links: ['Contact Us', 'Size Guide', 'Care Guide', 'Returns'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{col.title}</div>
                {col.links.map(l => (
                  <button key={l} onClick={() => {
                    if (l === 'Our Story' || l === 'Craftsmanship') { setPage('story'); window.scrollTo(0, 0); }
                    else if (l === 'Contact Us' || l === 'Appointments') { setPage('contact'); window.scrollTo(0, 0); }
                    else if (l === 'All Pieces' || l === 'New Arrivals' || l === 'Signature' || l === 'Limited Edition') { setPage('collection'); window.scrollTo(0, 0); }
                  }} style={{
                    display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--ff-sans)', fontSize: 12, color: 'var(--muted)', textAlign: 'left',
                    padding: '4px 0', letterSpacing: '0.04em', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--cream-dim)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >{l}</button>
                ))}
              </div>
            ))}
          </div>

          <div className="divider" style={{ maxWidth: 1200, margin: '32px auto 24px' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              © 2026 Elite Collection. All rights reserved.
            </p>
            <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              Doha · Dubai · Doha
            </p>
          </div>
        </footer>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          setPage={setPage}
        />
      )}

      {/* Tweaks panel */}
      {tweakVisible && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 200,
          width: 260, background: 'rgba(13,11,8,0.96)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--border)',
          padding: '20px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Tweaks</span>
            <button onClick={() => { setTweakVisible(false); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 14 }}>✕</button>
          </div>

          {/* Accent color */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Accent Color</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['#c9a96e', '#a87d52', '#8faa8b', '#8fa0aa', '#aa8f8f'].map(c => (
                <button key={c} onClick={() => setTweak('accentColor', c)} style={{
                  width: 28, height: 28, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer',
                  outline: tweaks.accentColor === c ? `2px solid ${c}` : '2px solid transparent',
                  outlineOffset: 2, transition: 'outline 0.2s',
                }} />
              ))}
              <input type="color" value={tweaks.accentColor} onChange={e => setTweak('accentColor', e.target.value)}
                style={{ width: 28, height: 28, padding: 0, border: '1px solid var(--border)', background: 'none', cursor: 'pointer', borderRadius: '50%' }} />
            </div>
          </div>

          {/* Hero layout */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Hero Text Align</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['centered', 'left'].map(v => (
                <button key={v} onClick={() => setTweak('heroLayout', v)} style={{
                  flex: 1, padding: '7px', border: `1px solid ${tweaks.heroLayout === v ? 'var(--gold)' : 'var(--border)'}`,
                  background: tweaks.heroLayout === v ? 'var(--gold-glow)' : 'transparent',
                  color: tweaks.heroLayout === v ? 'var(--gold)' : 'var(--muted)',
                  fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{v}</button>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="divider" style={{ margin: '16px 0' }} />
          <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>Jump to Page</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {[['home', 'Home'], ['collection', 'Collection'], ['product', 'Product'], ['checkout', 'Checkout'], ['story', 'Story'], ['contact', 'Contact']].map(([id, label]) => (
              <button key={id} onClick={() => { setPage(id); window.scrollTo(0, 0); }} style={{
                padding: '7px', border: `1px solid ${page === id ? 'var(--gold)' : 'var(--border)'}`,
                background: page === id ? 'var(--gold-glow)' : 'transparent',
                color: page === id ? 'var(--gold)' : 'var(--muted)',
                fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{label}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
