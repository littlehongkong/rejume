import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <main>

      {/* HERO */}
      <section style={s.heroBg}>
        <div style={s.hero}>
          <div style={s.heroLeft}>
            <div style={s.eyebrowWrap}>
              <div className="eyebrow">AI 기반 이력서 최적화</div>
            </div>
            <h1 style={s.h1}>
              당신의 이력서를<br />
              <em style={s.em}>다시</em> 씁니다.<br />
              <span style={s.brandInline}>
                Re<span style={s.colon}>:</span>주me
              </span>
            </h1>
            <p style={s.sub}>
              JD를 분석하고, 합격 확률이 높은 방향으로 경험을 재배치합니다.
              방향만 주는 게 아닙니다. 바로 낼 수 있는 완성본을 드립니다.
            </p>
            <div style={s.actions}>
              <button className="btn-main" onClick={() => navigate('/input')}>
                지금 이력서 최적화 →
              </button>
              <button className="btn-outline" onClick={() => navigate('/result')}>
                결과물 미리보기
              </button>
            </div>
            <div style={s.statRow}>
              <div style={s.statItem}>
                <div style={s.statNum}>2<span style={s.colon}>.</span>3<span style={s.colon}>×</span></div>
                <div style={s.statLabel}>서류 통과율 향상</div>
              </div>
              <div style={s.statDiv} />
              <div style={s.statItem}>
                <div style={s.statNum}>30<span style={s.colon}>초</span></div>
                <div style={s.statLabel}>평균 완성 시간</div>
              </div>
              <div style={s.statDiv} />
              <div style={s.statItem}>
                <div style={s.statNum}>47<span style={s.colon}>+</span></div>
                <div style={s.statLabel}>베타 사용자</div>
              </div>
            </div>
          </div>

          <div style={s.heroRight}>
            <div style={s.brandMarkWrap}>
              <div style={s.bc1} />
              <div style={s.bc2} />
              <div style={s.bc3}>
                <div style={s.brandMarkText}>
                  Re<span style={s.colon}>:</span><br />
                  <span style={s.koSm}>주me</span>
                </div>
              </div>
              <div style={{ ...s.floatTag, top: '30px', right: '-10px', animationDelay: '0s' }}>
                <span style={{ ...s.dot, background: '#e8440a' }} />JD 매칭 점수 82
              </div>
              <div style={{ ...s.floatTag, bottom: '60px', left: '-20px', animationDelay: '1.5s' }}>
                <span style={{ ...s.dot, background: '#1c2b4a' }} />키워드 7/9 반영
              </div>
              <div style={{ ...s.floatTag, top: '160px', right: '-40px', animationDelay: '0.8s' }}>
                <span style={{ ...s.dot, background: '#28a745' }} />완성본 준비됨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={s.tickerWrap}>
        <div style={s.tickerTrack}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={s.tickerInner}>
              <span style={s.tickerItem}>JD 키워드 자동 추출</span>
              <span style={s.tickerDot}>◆</span>
              <span style={s.tickerItem}>ATS 최적화</span>
              <span style={s.tickerDot}>◆</span>
              <span style={s.tickerItem}>수정 이유 제공</span>
              <span style={s.tickerDot}>◆</span>
              <span style={s.tickerItem}>버전 관리</span>
              <span style={s.tickerDot}>◆</span>
              <span style={s.tickerItem}>완성본 즉시 다운로드</span>
              <span style={s.tickerDot}>◆</span>
              <span style={s.tickerItem}>Re:주me — 합격하는 이력서</span>
              <span style={s.tickerDot}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* WHY */}
      <section id="why" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div className="eyebrow">문제 정의</div>
          <h2 className="section-h2">
            좋은 경력인데도<br />서류에서 <em>탈락</em>하는 이유
          </h2>
          <div style={s.probGrid}>
            {problems.map((p) => (
              <div key={p.num} style={s.probItem}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--white)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <div style={s.probN}>{p.num}</div>
                <h3 style={s.probH3}>{p.title}</h3>
                <p style={s.probP}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ background: 'var(--white)' }}>
        <div className="wrap">
          <div className="eyebrow">비교</div>
          <h2 className="section-h2">
            Re<span style={s.colon}>:</span>주me가<br />다른 이유
          </h2>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th} />
                <th style={s.th}>ChatGPT / 원티드</th>
                <th style={{ ...s.th, color: 'var(--accent)', background: 'rgba(232,68,10,0.03)' }}>Re:주me</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={i}>
                  <td style={s.td}>{row.label}</td>
                  <td style={s.td}><span style={s.cross}>✕</span> {row.them}</td>
                  <td style={{ ...s.td, background: 'rgba(232,68,10,0.03)' }}>
                    <span style={s.check}>✓</span> {row.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* HOW */}
      <section id="how" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div className="eyebrow">작동 방식</div>
          <h2 className="section-h2">30초면<br /><em>완성</em>됩니다</h2>
          <div style={s.stepsRow}>
            {steps.map((step, i) => (
              <div key={i} style={s.stepCard}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--white)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <div style={s.stepNBig}>{i + 1}</div>
                <div style={s.stepIcon}>{step.icon}</div>
                <h3 style={s.stepH3}>{step.title}</h3>
                <p style={s.stepP}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: 'var(--white)' }}>
        <div className="wrap">
          <div className="eyebrow">가격</div>
          <h2 className="section-h2">
            합격하면 연봉이 오릅니다.<br />투자 대비 리턴이 <em>명확</em>합니다.
          </h2>
          <div style={s.pricingRow}>
            {plans.map((plan, i) => (
              <div key={i}
                style={plan.featured ? { ...s.priceCard, background: 'var(--navy)' } : s.priceCard}
                onMouseEnter={e => e.currentTarget.style.background = plan.featured ? 'var(--navy2)' : 'var(--bg)'}
                onMouseLeave={e => e.currentTarget.style.background = plan.featured ? 'var(--navy)' : 'var(--white)'}
              >
                {plan.featured && <div style={s.featBadge}>가장 인기</div>}
                <p style={{ ...s.priceName, color: plan.featured ? 'rgba(255,255,255,0.4)' : 'var(--ink3)' }}>{plan.name}</p>
                <div style={{ ...s.priceAmt, color: plan.featured ? 'var(--white)' : 'var(--ink)' }}>
                  <sup style={{ fontSize: '1rem', verticalAlign: 'super' }}>₩</sup>{plan.price}
                </div>
                <p style={{ ...s.pricePeriod, color: plan.featured ? 'rgba(255,255,255,0.35)' : 'var(--ink3)' }}>{plan.period}</p>
                <p style={{ ...s.priceDesc, color: plan.featured ? 'rgba(255,255,255,0.55)' : 'var(--ink2)' }}>{plan.desc}</p>
                <ul style={s.priceUl}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ ...s.priceUlLi, color: plan.featured ? 'rgba(255,255,255,0.6)' : 'var(--ink2)' }}>
                      <span style={{ color: plan.featured ? 'var(--accent2)' : 'var(--accent)', flexShrink: 0 }}>→</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/input')}
                  style={plan.featured ? s.featBtn : s.priceBtn}
                >
                  시작하기
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.ctaSection}>
        <h2 style={s.ctaH}>
          지금 이력서 하나를<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent2)' }}>합격하는</em> 이력서로.<br />
          Re<span style={{ color: 'var(--accent2)' }}>:</span>주me
        </h2>
        <button className="btn-navy" style={{ background: 'var(--white)', color: 'var(--navy)' }}
          onClick={() => navigate('/input')}>
          무료로 시작하기 →
        </button>
      </section>

    </main>
  )
}

const problems = [
  { num: '01', title: 'JD를 읽지 않는 이력서', desc: '같은 이력서를 여러 회사에 넣는다. 회사마다 원하는 키워드가 다른데 이력서는 그대로다.' },
  { num: '02', title: 'ATS 필터에서 조용히 탈락', desc: '담당자가 보기 전에 자동 필터링 시스템에 걸린다. 키워드 하나 차이로 기회를 잃는다.' },
  { num: '03', title: 'ChatGPT는 판단을 못 해준다', desc: '프롬프트를 잘 써야 하고, 결과 품질이 일정하지 않다. 뭘 고쳐야 할지 알려주지 않는다.' },
  { num: '04', title: '원티드 리뷰는 방향만 준다', desc: '"데이터 품질 강조하세요" — 알겠는데 어떻게? 결국 다시 혼자 써야 한다.' },
]

const comparisons = [
  { label: '결과물 형태', them: '방향 제시', us: '완성본 제공' },
  { label: '수정 이유', them: '없음', us: '항목별 근거 제공' },
  { label: 'ATS 키워드 대응', them: '부분적', us: '순서·밀도 최적화' },
  { label: '버전 관리', them: '없음', us: '회사별 버전 저장' },
  { label: '이 회사 전략', them: '없음', us: '포지션별 포인트 분석' },
]

const steps = [
  { icon: '📄', title: '이력서 업로드', desc: 'PDF, DOCX, 텍스트 붙여넣기 모두 가능합니다.' },
  { icon: '🎯', title: 'JD 입력', desc: 'URL 또는 공고 내용을 넣으면 핵심 키워드를 자동 추출합니다.' },
  { icon: '⚡', title: 'AI 분석 & 최적화', desc: 'JD 기준으로 경험 재배치, 키워드 삽입, 약한 문장을 개선합니다.' },
  { icon: '✅', title: '완성본 수령', desc: '수정 이유와 함께 바로 제출 가능한 이력서를 받습니다.' },
]

const plans = [
  {
    name: '1회 이용', price: '9,900', period: '단건 결제',
    desc: '한 회사에 집중해서 최적화가 필요할 때',
    features: ['JD 기반 이력서 최적화 1회', '키워드 분석 리포트', '완성본 다운로드'],
    featured: false,
  },
  {
    name: '취업 패키지', price: '29,000', period: '이직 준비 기간 내 사용',
    desc: '여러 회사에 동시에 지원할 때',
    features: ['이력서 최적화 5회', '자기소개서 최적화 포함', '버전 관리 & 비교', '이 회사 특이점 분석'],
    featured: true,
  },
  {
    name: '프리미엄', price: '99,000', period: '3개월 무제한',
    desc: '전문가 검수까지 원하는 분들을 위해',
    features: ['무제한 최적화', '전문가 1:1 검수', '면접 예상 질문 제공', '합격 전략 코칭'],
    featured: false,
  },
]

const s = {
  heroBg: { background: 'var(--bg)' },
  hero: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    gap: '4rem',
    padding: '9rem 4rem 5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroLeft: { position: 'relative', zIndex: 1 },
  eyebrowWrap: { animation: 'fadeUp 0.7s ease both' },
  h1: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
    lineHeight: 1.12,
    letterSpacing: '-0.025em',
    color: 'var(--ink)',
    marginBottom: '1.5rem',
    animation: 'fadeUp 0.7s 0.1s ease both',
  },
  em: { fontStyle: 'italic', color: 'var(--accent)' },
  brandInline: { fontFamily: "'Libre Baskerville', serif", whiteSpace: 'nowrap' },
  colon: { color: 'var(--accent)' },
  sub: {
    fontSize: '0.95rem',
    fontWeight: 300,
    color: 'var(--ink2)',
    lineHeight: 1.9,
    maxWidth: '440px',
    marginBottom: '2.5rem',
    animation: 'fadeUp 0.7s 0.2s ease both',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    animation: 'fadeUp 0.7s 0.3s ease both',
  },
  statRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(26,23,20,0.1)',
    animation: 'fadeUp 0.7s 0.4s ease both',
  },
  statItem: { display: 'flex', flexDirection: 'column', gap: '2px' },
  statNum: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '1.8rem',
    color: 'var(--ink)',
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  statLabel: { fontSize: '0.72rem', color: 'var(--ink3)', letterSpacing: '0.04em' },
  statDiv: { width: '1px', height: '36px', background: 'rgba(26,23,20,0.12)' },
  heroRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    animation: 'fadeUp 0.7s 0.2s ease both',
  },
  brandMarkWrap: {
    position: 'relative',
    width: '380px',
    height: '380px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bc1: {
    position: 'absolute',
    width: '380px', height: '380px',
    borderRadius: '50%',
    border: '1px solid rgba(26,23,20,0.08)',
    animation: 'rotateSlow 40s linear infinite',
  },
  bc2: {
    position: 'absolute',
    width: '280px', height: '280px',
    borderRadius: '50%',
    border: '1px solid rgba(232,68,10,0.12)',
    animation: 'rotateSlow 25s linear infinite reverse',
  },
  bc3: {
    position: 'absolute',
    width: '180px', height: '180px',
    borderRadius: '50%',
    background: 'var(--navy)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '2.8rem',
    color: 'var(--white)',
    letterSpacing: '-0.02em',
    lineHeight: 1,
    textAlign: 'center',
    zIndex: 1,
  },
  koSm: { fontSize: '2rem' },
  floatTag: {
    position: 'absolute',
    background: 'var(--white)',
    border: '1px solid rgba(26,23,20,0.08)',
    borderRadius: '6px',
    padding: '8px 14px',
    fontSize: '0.75rem',
    color: 'var(--ink2)',
    boxShadow: '0 4px 16px rgba(26,23,20,0.08)',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    animation: 'floatY 4s ease-in-out infinite',
  },
  dot: {
    display: 'inline-block',
    width: '6px', height: '6px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  tickerWrap: { background: 'var(--navy)', overflow: 'hidden', padding: '0.85rem 0' },
  tickerTrack: {
    display: 'flex',
    gap: '3rem',
    animation: 'ticker 22s linear infinite',
    whiteSpace: 'nowrap',
  },
  tickerInner: { display: 'flex', gap: '3rem', alignItems: 'center' },
  tickerItem: { fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' },
  tickerDot: { color: 'var(--accent2)', fontSize: '0.5rem' },
  probGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1px',
    background: 'rgba(26,23,20,0.1)',
    border: '1px solid rgba(26,23,20,0.1)',
  },
  probItem: {
    background: 'var(--bg)',
    padding: '2.25rem 2rem',
    transition: 'background 0.2s',
    cursor: 'default',
  },
  probN: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '3rem',
    color: 'rgba(26,23,20,0.06)',
    lineHeight: 1,
    marginBottom: '1rem',
  },
  probH3: { fontSize: '0.95rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '0.6rem' },
  probP: { fontSize: '0.82rem', color: 'var(--ink2)', lineHeight: 1.75 },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '2.5rem', border: '1px solid rgba(26,23,20,0.1)' },
  th: {
    padding: '1rem 1.25rem',
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--ink3)',
    fontWeight: 500,
    background: 'rgba(26,23,20,0.03)',
    textAlign: 'left',
    borderBottom: '1px solid rgba(26,23,20,0.07)',
    borderRight: '1px solid rgba(26,23,20,0.07)',
  },
  td: {
    padding: '1rem 1.25rem',
    fontSize: '0.82rem',
    color: 'var(--ink2)',
    borderBottom: '1px solid rgba(26,23,20,0.07)',
    borderRight: '1px solid rgba(26,23,20,0.07)',
  },
  check: { color: 'var(--accent)', fontWeight: 500 },
  cross: { color: 'rgba(26,23,20,0.2)' },
  stepsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    border: '1px solid rgba(26,23,20,0.1)',
  },
  stepCard: {
    padding: '2rem 1.5rem',
    borderRight: '1px solid rgba(26,23,20,0.1)',
    position: 'relative',
    transition: 'background 0.2s',
    background: 'var(--bg)',
    cursor: 'default',
  },
  stepNBig: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '4rem',
    color: 'rgba(26,23,20,0.05)',
    position: 'absolute',
    top: '0.75rem',
    right: '1rem',
    lineHeight: 1,
  },
  stepIcon: {
    width: '38px', height: '38px',
    background: 'var(--navy)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    marginBottom: '1rem',
  },
  stepH3: { fontSize: '0.88rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '0.5rem' },
  stepP: { fontSize: '0.78rem', color: 'var(--ink2)', lineHeight: 1.7 },
  pricingRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1px',
    background: 'rgba(26,23,20,0.1)',
    border: '1px solid rgba(26,23,20,0.1)',
    marginTop: '2.5rem',
  },
  priceCard: {
    background: 'var(--white)',
    padding: '2.25rem 1.75rem',
    position: 'relative',
    transition: 'background 0.2s',
    cursor: 'default',
  },
  featBadge: {
    display: 'inline-block',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--accent2)',
    background: 'rgba(255,107,61,0.15)',
    padding: '3px 10px',
    borderRadius: '99px',
    marginBottom: '1.25rem',
  },
  priceName: { fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' },
  priceAmt: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '2.8rem',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    marginBottom: '0.25rem',
  },
  pricePeriod: { fontSize: '0.75rem', marginBottom: '1.25rem' },
  priceDesc: { fontSize: '0.8rem', lineHeight: 1.7, marginBottom: '1.5rem' },
  priceUl: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '2rem' },
  priceUlLi: { fontSize: '0.8rem', display: 'flex', gap: '8px', lineHeight: 1.5 },
  priceBtn: {
    width: '100%', padding: '0.8rem',
    fontSize: '0.82rem', fontWeight: 500,
    borderRadius: '4px', cursor: 'pointer',
    border: '1px solid rgba(26,23,20,0.18)',
    background: 'transparent', color: 'var(--ink)',
    transition: 'all 0.15s',
  },
  featBtn: {
    width: '100%', padding: '0.8rem',
    fontSize: '0.82rem', fontWeight: 500,
    borderRadius: '4px', cursor: 'pointer',
    border: 'none',
    background: 'var(--accent)', color: 'var(--white)',
    transition: 'all 0.15s',
  },
  ctaSection: {
    background: 'var(--navy)',
    padding: '5rem 4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  ctaH: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
    color: 'var(--white)',
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
    maxWidth: '560px',
  },
}

export default Landing
