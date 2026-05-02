const { useState, useMemo } = React;

const ALL_PRODUCTS = [
  { id:1,  name:'Al-Mahmal Oxford',    price:2800, tag:'Signature',  leather:'Camel Nappa',     style:'Oxford', sizes:[40,41,42,43,44,45], image:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85&auto=format&fit=crop' },
  { id:2,  name:'Najd Derby',          price:2200, tag:'New',        leather:'Goat Suede',      style:'Derby',  sizes:[39,40,41,42,43,44], image:'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=85&auto=format&fit=crop' },
  { id:3,  name:'Hijaz Loafer',        price:1950, tag:'Bestseller', leather:'Calf Leather',    style:'Loafer', sizes:[40,41,42,43,44],    image:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=85&auto=format&fit=crop' },
  { id:4,  name:'Rub Al Khali Boot',   price:3400, tag:'Limited',    leather:'Camel Full-Grain',style:'Boot',   sizes:[41,42,43,44,45],    image:'https://images.unsplash.com/photo-1542291026-7b4d3fef59c8?w=600&q=85&auto=format&fit=crop' },
  { id:5,  name:'Medina Mule',         price:1600, tag:'',           leather:'Goat Suede',      style:'Loafer', sizes:[39,40,41,42,43],    image:'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=600&q=85&auto=format&fit=crop' },
  { id:6,  name:'Quraish Chelsea',     price:2650, tag:'New',        leather:'Calf Leather',    style:'Boot',   sizes:[40,41,42,43,44,45], image:'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=600&q=85&auto=format&fit=crop' },
];

const STYLE_FILTERS = ['All', 'Oxford', 'Derby', 'Loafer', 'Boot'];
const LEATHER_FILTERS = ['All', 'Camel Nappa', 'Camel Full-Grain', 'Goat Suede', 'Calf Leather'];
const SORT_OPTIONS = ['Featured', 'Price: Low–High', 'Price: High–Low', 'Newest'];

function CollectionPage({ setPage, setSelectedProduct }) {
  const [styleFilter, setStyleFilter] = useState('All');
  const [leatherFilter, setLeatherFilter] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS;
    if (styleFilter !== 'All') list = list.filter(p => p.style === styleFilter);
    if (leatherFilter !== 'All') list = list.filter(p => p.leather === leatherFilter);
    if (sort === 'Price: Low–High') list = [...list].sort((a,b) => a.price - b.price);
    if (sort === 'Price: High–Low') list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [styleFilter, leatherFilter, sort]);

  const go = (p) => { setSelectedProduct(p); setPage('product'); window.scrollTo(0,0); };

  return (
    <div style={{ paddingTop:80, minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ padding:'48px 24px 32px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ fontFamily:'var(--ff-sans)', fontSize:9, letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:10 }}>
          The Collection
        </div>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <h1 className="serif" style={{ fontSize:'clamp(36px, 7vw, 64px)', fontWeight:300, color:'var(--cream)', lineHeight:1 }}>
            All Pieces
          </h1>
          <span style={{ fontFamily:'var(--ff-sans)', fontSize:11, color:'var(--muted)', letterSpacing:'0.08em' }}>
            {filtered.length} works
          </span>
        </div>
      </div>

      <div className="divider" style={{ maxWidth:1200, margin:'0 auto 0' }} />

      {/* Filter bar */}
      <div style={{ position:'sticky', top:60, zIndex:20, background:'rgba(7,6,4,0.94)', backdropFilter:'blur(16px)', borderBottom:'1px solid var(--border2)', padding:'14px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:10, alignItems:'center', overflowX:'auto', paddingBottom:2 }}>
          {/* Style filters */}
          <div style={{ display:'flex', gap:6, flexShrink:0 }}>
            {STYLE_FILTERS.map(f => (
              <button key={f} className={'filter-pill' + (styleFilter===f ? ' active' : '')} onClick={() => setStyleFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          <div style={{ width:1, height:20, background:'var(--border)', flexShrink:0 }} />

          {/* Leather filters */}
          <div style={{ display:'flex', gap:6, flexShrink:0 }}>
            {LEATHER_FILTERS.map(f => (
              <button key={f} className={'filter-pill' + (leatherFilter===f ? ' active' : '')} onClick={() => setLeatherFilter(f)}
                style={{ fontSize:10 }}
              >
                {f}
              </button>
            ))}
          </div>

          <div style={{ marginLeft:'auto', flexShrink:0 }}>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              background:'var(--card)', border:'1px solid var(--border)',
              color:'var(--cream-dim)', fontFamily:'var(--ff-sans)',
              fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase',
              padding:'8px 12px', cursor:'pointer', outline:'none',
            }}>
              {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 24px 80px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <p className="serif" style={{ fontSize:28, color:'var(--muted)', fontStyle:'italic' }}>No pieces match your selection</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:2 }}>
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onClick={() => go(p)} delay={i * 0.06} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product: p, onClick, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="anim-fade-up"
      style={{ cursor:'pointer', animationDelay:`${delay}s` }}
    >
      {/* Image */}
      <div style={{ position:'relative', paddingBottom:'110%', overflow:'hidden' }}>
        <div className="img-placeholder" style={{ position:'absolute', inset:0 }}>
          <img src={p.image} alt={p.name} style={{
            width:'100%', height:'100%', objectFit:'cover', display:'block',
            mixBlendMode:'normal', opacity:0.95,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition:'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }} onError={e => { e.currentTarget.style.display='none'; }} />
          {/* Gradient */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(7,6,4,0.65) 0%, transparent 55%)', transition:'opacity 0.3s', opacity: hovered ? 1 : 0.6 }} />
        </div>

        {/* Tag */}
        {p.tag && (
          <div style={{ position:'absolute', top:16, left:16 }}>
            <span className="tag-chip" style={{ fontSize:9 }}>{p.tag}</span>
          </div>
        )}

        {/* Quick view */}
        <div style={{
          position:'absolute', bottom:20, left:'50%', transform:`translateX(-50%) translateY(${hovered ? 0 : 10}px)`,
          opacity: hovered ? 1 : 0, transition:'all 0.3s ease',
          whiteSpace:'nowrap',
        }}>
          <span style={{
            fontFamily:'var(--ff-sans)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase',
            color:'var(--gold)', border:'1px solid var(--gold)', padding:'8px 18px',
            background:'rgba(7,6,4,0.8)', backdropFilter:'blur(8px)',
          }}>
            View Piece
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'16px 4px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
          <div className="serif" style={{ fontSize:19, color:'var(--cream)', fontWeight:400, lineHeight:1.1 }}>
            {p.name}
          </div>
          <div style={{ fontFamily:'var(--ff-sans)', fontSize:13, color:'var(--gold)', marginLeft:12, whiteSpace:'nowrap' }}>
            SAR {p.price.toLocaleString()}
          </div>
        </div>
        <div style={{ fontFamily:'var(--ff-sans)', fontSize:10, letterSpacing:'0.1em', color:'var(--muted)', textTransform:'uppercase' }}>
          {p.leather} · {p.style}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CollectionPage, ALL_PRODUCTS });
