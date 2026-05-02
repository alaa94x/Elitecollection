const { useState } = React;

function CartDrawer({ cart, onClose, onRemove, setPage }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="cart-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cart-drawer">
        {/* Header */}
        <div style={{ padding:'28px 28px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:22, fontWeight:400, color:'var(--cream)', letterSpacing:'0.04em' }}>
              Your Selection
            </div>
            <div style={{ fontFamily:'var(--ff-sans)', fontSize:10, letterSpacing:'0.2em', color:'var(--muted)', textTransform:'uppercase', marginTop:2 }}>
              {cart.length} {cart.length === 1 ? 'piece' : 'pieces'} reserved
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'1px solid var(--border)', width:36, height:36, cursor:'pointer', color:'var(--cream-dim)', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor='var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
          >✕</button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:'auto', padding:'8px 0' }}>
          {cart.length === 0 ? (
            <div style={{ padding:'60px 28px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:32, fontStyle:'italic', color:'var(--muted)', marginBottom:12 }}>
                Empty
              </div>
              <p style={{ fontFamily:'var(--ff-sans)', fontSize:12, color:'var(--muted)', letterSpacing:'0.06em' }}>
                Your curated collection awaits
              </p>
            </div>
          ) : cart.map((item, idx) => (
            <div key={item.id + item.size} style={{
              padding:'20px 28px', borderBottom:'1px solid var(--border2)',
              display:'flex', gap:16, alignItems:'flex-start',
              animation:'fadeUp 0.4s ease both',
              animationDelay: `${idx * 0.06}s`,
            }}>
              {/* Thumb */}
              <div className="img-placeholder" style={{ width:72, height:72, flexShrink:0 }}>
                <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', mixBlendMode:'luminosity', opacity:0.9 }} onError={e => e.currentTarget.style.display='none'} />
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'var(--ff-serif)', fontSize:16, color:'var(--cream)', marginBottom:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {item.name}
                </div>
                <div style={{ fontFamily:'var(--ff-sans)', fontSize:10, color:'var(--muted)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:8 }}>
                  Size {item.size} · {item.leather}
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontFamily:'var(--ff-sans)', fontSize:13, color:'var(--gold)' }}>
                    {formatPrice(item.price * item.qty)}
                  </span>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontFamily:'var(--ff-sans)', fontSize:12, color:'var(--cream-dim)' }}>
                      Qty {item.qty}
                    </span>
                    <button onClick={() => onRemove(item.id, item.size)} style={{
                      background:'none', border:'none', cursor:'pointer',
                      color:'var(--muted)', fontSize:12, padding:'2px 6px',
                      transition:'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color='#c0392b'}
                      onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}
                    >Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ borderTop:'1px solid var(--border)', padding:'20px 28px 28px' }}>
            {/* Subtotal */}
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontFamily:'var(--ff-sans)', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--muted)' }}>Subtotal</span>
              <span style={{ fontFamily:'var(--ff-serif)', fontSize:18, color:'var(--cream)' }}>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ fontFamily:'var(--ff-sans)', fontSize:10, color:'var(--muted)', letterSpacing:'0.06em', marginBottom:20 }}>
              Duties & bespoke packaging included
            </div>

            {/* Divider */}
            <div className="divider" style={{ marginBottom:20 }} />

            <button
              className="btn-gold"
              onClick={() => { onClose(); setPage('checkout'); window.scrollTo(0,0); }}
              style={{ width:'100%', padding:'16px', fontSize:11, letterSpacing:'0.16em' }}
            >
              Proceed to Checkout
            </button>

            <button onClick={onClose} style={{
              width:'100%', marginTop:10, padding:'12px',
              background:'none', border:'none', cursor:'pointer',
              fontFamily:'var(--ff-sans)', fontSize:10, letterSpacing:'0.12em',
              textTransform:'uppercase', color:'var(--muted)',
              transition:'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color='var(--cream-dim)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}
            >
              Continue Browsing
            </button>

            {/* Trust signals */}
            <div style={{ marginTop:20, display:'flex', justifyContent:'center', gap:24 }}>
              {['Complimentary Shipping', 'Secure Checkout', 'Returns 30D'].map(t => (
                <span key={t} style={{ fontFamily:'var(--ff-sans)', fontSize:9, letterSpacing:'0.08em', color:'var(--muted)', textAlign:'center' }}>{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatPrice(n) {
  return 'SAR ' + n.toLocaleString('en-SA');
}

Object.assign(window, { CartDrawer, formatPrice });
