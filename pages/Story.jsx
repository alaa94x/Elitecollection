function StoryPage() {
  const chapters = [
    {
      year: '1962',
      title: 'A Workshop in Al-Dirah',
      body: 'In the ancient souks of Doha\'s Al-Dirah quarter, master cobbler Khalid Al-Rashidi opened a workshop with nothing but a single last, a curved needle, and an uncompromising vision. Every pair he produced bore the weight of his name — each stitch a contract between craftsman and wearer.',
      image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=900&q=85&auto=format&fit=crop',
      align: 'left',
    },
    {
      year: '1978',
      title: 'The Camel Leather Discovery',
      body: 'A chance encounter with Bedouin leather traders from the Najd plateau introduced Khalid to full-grain camel hide — a material of extraordinary durability, warmth, and a grain unlike anything sourced from European tanneries. The leather breathes in desert heat and softens with wear into a second skin. It became the house\'s defining material overnight.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=85&auto=format&fit=crop',
      align: 'right',
    },
    {
      year: '1995',
      title: 'Royal Patronage',
      body: 'By royal appointment, Elite began crafting bespoke footwear for members of the Saudi royal household and senior government ministers. Each commission took between 60 and 90 days — a testament to the refusal to compromise quality for speed. Word spread quietly, as it does among those who know.',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=900&q=85&auto=format&fit=crop',
      align: 'left',
    },
    {
      year: 'Today',
      title: 'Twelve Hands, One Pair',
      body: 'Today, every pair passes through the hands of twelve specialists — from the leather cutter who has worked here for 30 years, to the finisher who hand-burnishes each edge with beeswax and carnauba. We limit production to 400 pairs per year. Not because we must, but because excellence demands it. Each pair ships with a numbered certificate signed by its maker.',
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=900&q=85&auto=format&fit=crop',
      align: 'right',
    },
  ];

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Hero banner */}
      <div style={{
        position: 'relative', height: '55vh', minHeight: 380, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #f0ead8 0%, #e8dfc8 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1542291026-7b4d3fef59c8?w=1400&q=85&auto=format&fit=crop"
            alt="Artisan workshop"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
            onError={e => e.currentTarget.style.display = 'none'}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, var(--bg) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }} className="anim-fade-up">
          <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.35em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>
            Est. 1962 · Doha, Kingdom of Qatar
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1, marginBottom: 16 }}>
            The Craft of<br /><em style={{ color: 'var(--gold)' }}>Silence & Precision</em>
          </h1>
          <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--muted)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            Six decades of Arabic leather artisanship. Twelve master craftsmen. One unbroken promise.
          </p>
        </div>
      </div>

      {/* Editorial chapters */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 80px' }}>
        {chapters.map((ch, i) => (
          <div key={ch.year} className={`story-row anim-fade-up story-row-${ch.align}`} style={{
            display: 'grid', gridTemplateColumns: '1fr',
            gap: 32, marginBottom: 80, animationDelay: `${i * 0.12}s`,
          }}>

            {/* Image */}
            <div className="editorial-img" style={{ position: 'relative', paddingBottom: '56%', overflow: 'hidden' }}>
              <div className="img-placeholder" style={{ position: 'absolute', inset: 0 }}>
                <img src={ch.image} alt={ch.title} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  opacity: 0.9,
                  transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
                }} onError={e => e.currentTarget.style.display = 'none'} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,169,110,0.06) 0%, transparent 60%)' }} />
              </div>
              {/* Year badge */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20,
                fontFamily: 'var(--ff-serif)', fontSize: 48, fontWeight: 300,
                color: 'rgba(201,169,110,0.35)', lineHeight: 1, pointerEvents: 'none',
              }}>
                {ch.year}
              </div>
            </div>

            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 0' }}>
              <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 14 }}>
                {ch.year}
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: 18 }}>
                {ch.title}
              </h2>
              <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 13, lineHeight: 1.9, color: 'var(--cream-dim)', maxWidth: 480 }}>
                {ch.body}
              </p>
            </div>
          </div>
        ))}

        {/* Pull quote */}
        <div style={{
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
          padding: '56px 24px', textAlign: 'center', margin: '20px 0 60px',
        }}>
          <p className="serif" style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.4, maxWidth: 700, margin: '0 auto' }}>
            "A shoe is not a product.<br />
            <span style={{ color: 'var(--gold)' }}>It is the autobiography of a craftsman."</span>
          </p>
          <p style={{ fontFamily: 'var(--ff-sans)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginTop: 20 }}>
            — Khalid Al-Rashidi, Founder
          </p>
        </div>

        {/* Craftsmen grid */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>The Atelier</div>
          <h3 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300, color: 'var(--cream)' }}>Twelve Masters</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
          {[
            ['Leather Selector', '30 yrs'], ['Pattern Cutter', '22 yrs'], ['Last Maker', '18 yrs'],
            ['Welt Stitcher', '25 yrs'], ['Heel Builder', '15 yrs'], ['Edge Finisher', '28 yrs'],
          ].map(([role, exp]) => (
            <div key={role} style={{ padding: '24px 20px', border: '1px solid var(--border2)', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--card2)', border: '1px solid var(--border)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--gold)', fontSize: 16 }}>✦</span>
              </div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 16, color: 'var(--cream)', marginBottom: 4 }}>{role}</div>
              <div style={{ fontFamily: 'var(--ff-sans)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>{exp} experience</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .story-row { grid-template-columns: 1fr 1fr !important; align-items: center; }
          .story-row-right > div:first-child { order: 2; }
          .story-row-right > div:last-child  { order: 1; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { StoryPage });
