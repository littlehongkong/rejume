import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Result({ result }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('complete')
  const [tooltip, setTooltip] = useState(null)

  if (!result) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '8rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--ink2)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          먼저 이력서와 JD를 입력해주세요.
        </p>
        <button className="btn-main" onClick={() => navigate('/input')}>
          입력하러 가기 →
        </button>
      </main>
    )
  }

  // optimizedResume에서 수정된 부분 하이라이트 처리
  const renderHighlightedResume = () => {
    if (!result.optimizedResume || !result.diffs) return result.optimizedResume

    let text = result.optimizedResume

    // diffs의 after 문장을 하이라이트 마커로 감싸기
    result.diffs.forEach((diff, index) => {
      if (diff.after && text.includes(diff.after)) {
        text = text.replace(
          diff.after,
          `%%HIGHLIGHT_START_${index}%%${diff.after}%%HIGHLIGHT_END_${index}%%`
        )
      }
    })

    // 줄바꿈 + 하이라이트 마커를 React 엘리먼트로 변환
    const lines = text.split('\n')
    const elements = []

    lines.forEach((line, lineIdx) => {
      const parts = line.split(/(%%HIGHLIGHT_START_\d+%%.*?%%HIGHLIGHT_END_\d+%%)/g)

      const lineElements = parts.map((part, partIdx) => {
        const matchStart = part.match(/%%HIGHLIGHT_START_(\d+)%%(.*?)%%HIGHLIGHT_END_\d+%%/)
        if (matchStart) {
          const diffIndex = parseInt(matchStart[1])
          const content = matchStart[2]
          const diff = result.diffs[diffIndex]

          return (
            <mark
              key={`${lineIdx}-${partIdx}`}
              style={s.highlight}
              onMouseEnter={(e) => {
                const rect = e.target.getBoundingClientRect()
                setTooltip({
                  text: diff.reason,
                  before: diff.before,
                  x: rect.left,
                  y: rect.bottom + window.scrollY + 8,
                })
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              {content}
            </mark>
          )
        }
        return <span key={`${lineIdx}-${partIdx}`}>{part}</span>
      })

      elements.push(
        <span key={lineIdx}>
          {lineElements}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      )
    })

    return elements
  }

  return (
    <main style={s.main}>
      <div style={s.container}>

        {/* 헤더 */}
        <div style={s.header}>
          <div>
            <p style={s.headerSub}>{result.company} · {result.position}</p>
            <h2 style={s.headerTitle}>이력서 최적화 결과</h2>
            <div style={s.badgeRow}>
              <span style={s.badgeGreen}>서류 최적화 완료</span>
              <span style={s.badgeGray}>v1 · {new Date().toLocaleDateString('ko-KR')}</span>
              <span style={s.badgeGray}>매칭 점수 {result.matchScore}</span>
            </div>
          </div>
          <button
            className="btn-main"
            style={{ fontSize: '0.82rem', padding: '0.65rem 1.25rem', whiteSpace: 'nowrap' }}
            onClick={() => navigate('/input')}
          >
            새 JD로 최적화 →
          </button>
        </div>

        {/* 탭 */}
        <div style={s.tabWrap}>
          {[
            { key: 'complete', label: '완성본' },
            { key: 'result', label: '변경 사항' },
            { key: 'analysis', label: '분석' },
          ].map(t => (
            <button
              key={t.key}
              style={tab === t.key ? { ...s.tab, ...s.tabActive } : s.tab}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── 완성본 탭 ── */}
        {tab === 'complete' && (
          <div>
            <div style={s.legendRow}>
              <div style={s.legendItem}>
                <span style={s.legendDot} />
                <span style={s.legendText}>수정된 부분 — 마우스를 올리면 수정 이유가 표시됩니다</span>
              </div>
              <button style={s.dlBtn}>최종본 다운로드</button>
            </div>

            <div style={s.resumeCard}>
              <pre style={s.resumeText}>
                {renderHighlightedResume()}
              </pre>
            </div>

            {/* 툴팁 */}
            {tooltip && (
              <div style={{
                ...s.tooltip,
                top: tooltip.y,
                left: Math.min(tooltip.x, window.innerWidth - 320),
              }}>
                {tooltip.before && (
                  <p style={s.tooltipBefore}>수정 전: {tooltip.before}</p>
                )}
                <p style={s.tooltipReason}>↳ {tooltip.text}</p>
              </div>
            )}
          </div>
        )}

        {/* ── 변경 사항 탭 ── */}
        {tab === 'result' && (
          <div>
            <div style={s.scoreRow}>
              <div style={s.scoreCard}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(26,23,20,0.08)" strokeWidth="6" />
                  <circle
                    cx="36" cy="36" r="28"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="6"
                    strokeDasharray="175.9"
                    strokeDashoffset={175.9 - (175.9 * result.matchScore / 100)}
                    strokeLinecap="round"
                    transform="rotate(-90 36 36)"
                  />
                  <text x="36" y="41" textAnchor="middle" fontSize="16" fontWeight="500" fill="var(--ink)">
                    {result.matchScore}
                  </text>
                </svg>
                <p style={s.scoreLabel}>JD 매칭 점수</p>
              </div>

              <div style={{ ...s.card, flex: 1 }}>
                <p style={s.cardLabel}>키워드 매칭</p>
                <div>
                  {[
                    ...result.keywords.hit.map(kw => ({ kw, hit: true })),
                    ...result.keywords.miss.map(kw => ({ kw, hit: false })),
                    ...result.keywords.neutral.map(kw => ({ kw, hit: null })),
                  ].map(({ kw, hit }) => (
                    <span key={kw} style={
                      hit === true ? s.kwHit :
                      hit === false ? s.kwMiss :
                      s.kwNeutral
                    }>{kw}</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink3)', marginTop: '10px' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 500 }}>
                    {result.keywords.hit.length}개 반영
                  </span>
                  {' · '}
                  <span style={{ color: '#c0392b', fontWeight: 500 }}>
                    {result.keywords.miss.length}개 누락
                  </span>
                  {' · '}
                  {result.keywords.neutral.length}개 선택
                </p>
              </div>
            </div>

            <div style={{ ...s.card, marginBottom: '1.25rem' }}>
              <p style={s.cardLabel}>수정된 항목 ({result.diffs.length}건)</p>
              {result.diffs.map((d, i) => (
                <div key={i} style={i > 0
                  ? { ...s.diffBlock, borderTop: '1px solid rgba(26,23,20,0.07)', paddingTop: '14px' }
                  : s.diffBlock
                }>
                  <p style={s.diffMeta}>{d.section}</p>
                  <div style={s.diffDel}>{d.before}</div>
                  <div style={s.diffAdd}>{d.after}</div>
                  <p style={s.diffReason}>↳ {d.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 분석 탭 ── */}
        {tab === 'analysis' && (
          <div>
            <div style={{ ...s.card, marginBottom: '1.25rem' }}>
              <p style={s.cardLabel}>강점 (유지할 것)</p>
              {result.strengths.map((str, i) => (
                <div key={i} style={s.analysisRow}>
                  <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>✓</span>
                  <p style={s.analysisText}>{str}</p>
                </div>
              ))}
            </div>

            <div style={{ ...s.card, marginBottom: '1.25rem' }}>
              <p style={s.cardLabel}>보완 필요 항목</p>
              {result.weaknesses.map((w, i) => (
                <div key={i} style={s.analysisRow}>
                  <span style={{
                    color: w.level === 'danger' ? '#c0392b' : '#e67e22',
                    marginTop: '2px', flexShrink: 0,
                  }}>
                    {w.level === 'danger' ? '!' : '△'}
                  </span>
                  <p style={s.analysisText}>{w.text}</p>
                </div>
              ))}
            </div>

            <div style={s.card}>
              <p style={s.cardLabel}>이 회사 포인트</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.8 }}>
                {result.companyPoint}
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

const s = {
  main: {
    minHeight: '100vh',
    background: 'var(--bg)',
    paddingTop: '6rem',
    paddingBottom: '4rem',
  },
  container: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  headerSub: {
    fontSize: '0.8rem',
    color: 'var(--ink3)',
    marginBottom: '4px',
  },
  headerTitle: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '1.6rem',
    color: 'var(--ink)',
    letterSpacing: '-0.01em',
    marginBottom: '10px',
  },
  badgeRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  badgeGreen: {
    fontSize: '0.72rem', fontWeight: 500,
    padding: '3px 10px', borderRadius: '99px',
    background: 'rgba(39,174,96,0.1)',
    color: '#27ae60',
  },
  badgeGray: {
    fontSize: '0.72rem',
    padding: '3px 10px', borderRadius: '99px',
    background: 'rgba(26,23,20,0.06)',
    color: 'var(--ink3)',
  },
  tabWrap: {
    display: 'flex',
    gap: '4px',
    background: 'rgba(26,23,20,0.05)',
    padding: '4px',
    borderRadius: '6px',
    marginBottom: '1.5rem',
    width: 'fit-content',
  },
  tab: {
    fontSize: '0.82rem',
    padding: '6px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--ink2)',
    border: '1px solid transparent',
    background: 'transparent',
    transition: 'all 0.15s',
  },
  tabActive: {
    background: 'var(--white)',
    borderColor: 'rgba(26,23,20,0.1)',
    color: 'var(--ink)',
    fontWeight: 500,
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '10px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendDot: {
    display: 'inline-block',
    width: '12px', height: '12px',
    background: 'rgba(232,68,10,0.25)',
    border: '1px solid rgba(232,68,10,0.4)',
    borderRadius: '2px',
    flexShrink: 0,
  },
  legendText: {
    fontSize: '0.78rem',
    color: 'var(--ink3)',
  },
  resumeCard: {
    background: 'var(--white)',
    border: '1px solid rgba(26,23,20,0.08)',
    borderRadius: '6px',
    padding: '2rem 2.5rem',
  },
  resumeText: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '0.88rem',
    lineHeight: 1.9,
    color: 'var(--ink)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    margin: 0,
  },
  highlight: {
    background: 'rgba(232,68,10,0.12)',
    borderBottom: '2px solid rgba(232,68,10,0.5)',
    borderRadius: '2px',
    padding: '1px 2px',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  tooltip: {
    position: 'absolute',
    zIndex: 200,
    background: 'var(--navy)',
    color: 'var(--white)',
    borderRadius: '6px',
    padding: '10px 14px',
    maxWidth: '300px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    pointerEvents: 'none',
  },
  tooltipBefore: {
    fontSize: '0.72rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '4px',
    textDecoration: 'line-through',
  },
  tooltipReason: {
    fontSize: '0.78rem',
    color: 'var(--white)',
    lineHeight: 1.6,
  },
  dlBtn: {
    fontSize: '0.82rem', fontWeight: 500,
    padding: '0.6rem 1.25rem',
    background: 'var(--navy)', color: 'var(--white)',
    border: 'none', borderRadius: '4px', cursor: 'pointer',
  },
  scoreRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.25rem',
    alignItems: 'stretch',
  },
  scoreCard: {
    background: 'var(--white)',
    border: '1px solid rgba(26,23,20,0.08)',
    borderRadius: '6px',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    minWidth: '120px',
  },
  scoreLabel: {
    fontSize: '0.72rem',
    color: 'var(--ink3)',
    textAlign: 'center',
  },
  card: {
    background: 'var(--white)',
    border: '1px solid rgba(26,23,20,0.08)',
    borderRadius: '6px',
    padding: '1.25rem',
  },
  cardLabel: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: 'var(--ink3)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  kwHit: {
    display: 'inline-block', fontSize: '0.75rem',
    padding: '3px 10px', borderRadius: '99px', margin: '3px',
    background: 'rgba(39,174,96,0.1)', color: '#27ae60',
    border: '1px solid rgba(39,174,96,0.2)',
  },
  kwMiss: {
    display: 'inline-block', fontSize: '0.75rem',
    padding: '3px 10px', borderRadius: '99px', margin: '3px',
    background: 'rgba(192,57,43,0.08)', color: '#c0392b',
    border: '1px solid rgba(192,57,43,0.2)',
  },
  kwNeutral: {
    display: 'inline-block', fontSize: '0.75rem',
    padding: '3px 10px', borderRadius: '99px', margin: '3px',
    background: 'rgba(26,23,20,0.05)', color: 'var(--ink2)',
    border: '1px solid rgba(26,23,20,0.1)',
  },
  diffBlock: {
    marginBottom: '14px',
    paddingBottom: '14px',
  },
  diffMeta: {
    fontSize: '0.72rem', fontWeight: 500,
    color: 'var(--ink3)', marginBottom: '8px',
  },
  diffDel: {
    fontSize: '0.82rem', padding: '8px 12px',
    borderRadius: '4px', marginBottom: '4px',
    background: 'rgba(192,57,43,0.06)',
    color: 'rgba(192,57,43,0.7)',
    textDecoration: 'line-through',
    lineHeight: 1.6,
    borderLeft: '2px solid rgba(192,57,43,0.3)',
  },
  diffAdd: {
    fontSize: '0.82rem', padding: '8px 12px',
    borderRadius: '4px', marginBottom: '6px',
    background: 'rgba(39,174,96,0.06)',
    color: '#1e8449',
    lineHeight: 1.6,
    borderLeft: '2px solid rgba(39,174,96,0.4)',
  },
  diffReason: {
    fontSize: '0.72rem',
    color: 'var(--ink3)',
    paddingLeft: '2px',
  },
  analysisRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  analysisText: {
    fontSize: '0.85rem',
    color: 'var(--ink)',
    lineHeight: 1.7,
  },
}

export default Result
