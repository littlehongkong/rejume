import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { optimizeResume } from '../api/optimize'

function Input({ resumeText, setResumeText, jdText, setJdText, setResult }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [jdUrl, setJdUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [loadingStep, setLoadingStep] = useState(0)
  const [extractedKeywords, setExtractedKeywords] = useState([])


const handleFileClick = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.pdf,.doc,.docx,.txt'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)

    const ext = file.name.split('.').pop().toLowerCase()

    if (ext === 'txt') {
      const reader = new FileReader()
      reader.onload = (ev) => setResumeText(ev.target.result)
      reader.readAsText(file)

    } else if (ext === 'docx' || ext === 'doc') {
      const mammoth = await import('mammoth')
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.extractRawText({ arrayBuffer })
      setResumeText(result.value)

    } else if (ext === 'pdf') {
      setResumeText('')
      alert('PDF는 현재 지원하지 않습니다.\n텍스트를 복사해서 아래 입력창에 붙여넣어 주세요.')
      setFileName('')
    }
  }
  input.click()
}


const extractKeywords = (text) => {
  // HTML 태그 제거
  const plainText = text.replace(/<[^>]*>/g, ' ').replace(/&[a-zA-Z]+;/g, ' ')

  const techKeywords = [
    // 데이터 엔지니어링
        'Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Node.js',
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
    'AWS', 'GCP', 'Azure', 'S3', 'EC2', 'Lambda', 'Glue', 'Athena',
    'Airflow', 'Spark', 'Kafka', 'Hadoop', 'Hive', 'Trino', 'Flink',
    'ETL', 'ELT', 'MLOps', 'DevOps', 'CI/CD', 'Docker', 'Kubernetes',
    'TensorFlow', 'PyTorch', 'Scikit-learn',
    'REST', 'GraphQL', 'MSA', 'API',
    'Git', 'Linux', 'Bash',
    '데이터 레이크', '데이터 웨어하우스', '데이터 마트', '데이터 파이프라인',
    '머신러닝', '딥러닝', '자연어처리', 'NLP', '추천시스템',
    'EKS', 'ECS', 'Redshift', 'BigQuery', 'Snowflake',
    // 클라우드/인프라
    'AWS', 'GCP', 'Azure', 'S3', 'EC2', 'Lambda', 'Glue', 'Athena',
    'Redshift', 'BigQuery', 'Snowflake', 'EKS', 'ECS', 'Docker', 'Kubernetes',
    'Terraform', 'CI/CD', 'Jenkins', 'GitHub Actions',
    // 데이터베이스
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Oracle',
    // 언어/프레임워크
    'Python', 'Java', 'Scala', 'JavaScript', 'TypeScript', 'Go', 'Rust',
    'React', 'Vue', 'Node.js', 'Spring', 'FastAPI', 'Django',
    // AI/ML
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'MLOps', 'LLM', 'RAG',
    'OpenAI', 'GPT', '생성형 AI', 'NLP', '머신러닝', '딥러닝',
    // 데이터 분석
    'SQL', 'Tableau', 'Power BI', 'Looker', 'Superset', 'Redash',
    // 데이터 거버넌스
    '데이터 거버넌스', '데이터 품질', '메타데이터', '데이터 카탈로그',
    '데이터 표준', '데이터 레이크', '데이터 웨어하우스', '데이터 마트',
    '데이터 파이프라인', '데이터 모델링',
    // DX/기획
    'DX', 'AX', 'MSA', 'API', 'REST', 'GraphQL',
    'PM', 'PL', 'Agile', 'Scrum', 'Jira', 'Confluence',
    // 협업/운영
    'Git', 'Linux', 'Bash', 'Notion', 'Slack',
    // 보안/거버넌스
    'IAM', 'VPC', 'SSO', '정보보안', '개인정보',
    // 도메인
    '핀테크', '이커머스', '커머스', '금융', '보험', '헬스케어',
    'B2B', 'B2C', 'SaaS',
  ]

  return techKeywords.filter(kw =>
    plainText.toLowerCase().includes(kw.toLowerCase())
  ).slice(0, 12)
}


const handleStart = async () => {
  setStep(4)
  setLoadingStep(0)

  // 1단계 — 즉시
  setLoadingStep(1)

  // 2단계 — 1.2초 후
  const t1 = setTimeout(() => setLoadingStep(2), 1200)

  // 3단계 — 2.4초 후
  const t2 = setTimeout(() => setLoadingStep(3), 2400)

  try {
    // 실제 API 호출
    const result = await optimizeResume(resumeText, jdText)

    // API 완료 — 타이머 정리 후 4단계
    clearTimeout(t1)
    clearTimeout(t2)
    setLoadingStep(4)

    setTimeout(() => {
      setResult(result)
      navigate('/result')
    }, 500)

  } catch (err) {
    clearTimeout(t1)
    clearTimeout(t2)
    console.error('최적화 실패:', err)
    alert('최적화 중 오류가 발생했습니다. 다시 시도해주세요.')
    setStep(3)
    setLoadingStep(0)
  }
}



  const loadingMsgs = [
    'JD 키워드 분석 중...',
    '이력서 매칭 분석 중...',
    '수정 문장 생성 중...',
    '최종 검토 중...',
  ]

  const loadingItems = [
    'JD 핵심 키워드 추출',
    '이력서 항목별 매칭 분석',
    '수정 문장 생성',
    '최종 검토',
  ]

  return (
    <main style={s.main}>
      <div style={s.container}>

        {/* 스텝 인디케이터 */}
        <div style={s.stepIndicator}>
          {['이력서', 'JD 입력', '확인', '최적화 중'].map((label, i) => {
            const num = i + 1
            const isDone = step > num
            const isActive = step === num
            return (
              <div key={i} style={s.stepNodeWrap}>
                <div style={s.stepNode}>
                  <div style={{
                    ...s.stepCircle,
                    ...(isDone ? s.stepCircleDone : {}),
                    ...(isActive ? s.stepCircleActive : {}),
                  }}>
                    {isDone ? '✓' : num}
                  </div>
                  <span style={{
                    ...s.stepLabel,
                    ...(isActive ? s.stepLabelActive : {}),
                  }}>{label}</span>
                </div>
                {i < 3 && (
                  <div style={{
                    ...s.stepLine,
                    ...(step > num ? s.stepLineDone : {}),
                  }} />
                )}
              </div>
            )
          })}
        </div>

        {/* STEP 1 — 이력서 */}
        {step === 1 && (
          <div>
            <p style={s.stepTitle}>이력서를 올려주세요</p>
            <p style={s.stepDesc}>PDF, Word, 또는 직접 붙여넣기 모두 가능합니다.</p>

            <div
              style={fileName ? { ...s.uploadZone, ...s.uploadZoneFilled } : s.uploadZone}
              onClick={handleFileClick}
            >
              {fileName ? (
                <>
                  <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent)' }}>✓ {fileName}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '4px' }}>업로드 완료</p>
                </>
              ) : (
                <>
                  <div style={s.uploadIcon}>↑</div>
                  <p style={s.uploadTitle}>파일을 드래그하거나 클릭해서 업로드</p>
                  <p style={s.uploadSub}>PDF · DOCX · 최대 10MB</p>
                </>
              )}
            </div>

            <div style={s.divider}>
              <div style={s.dividerLine} />
              <span style={s.dividerText}>또는</span>
              <div style={s.dividerLine} />
            </div>

            <div style={s.inputRow}>
              <label style={s.label}>텍스트로 직접 붙여넣기</label>
            <textarea
  style={s.textarea}
  rows={6}
  placeholder="이력서 내용을 여기에 붙여넣으세요..."
  value={resumeText}
  onChange={e => setResumeText(e.target.value)}
/>

	    </div>

            <div style={s.btnRow}>
              <button className="btn-main" onClick={() => setStep(2)}>다음 →</button>
            </div>
          </div>
        )}

        {/* STEP 2 — JD 입력 */}
        {step === 2 && (
          <div>
            <p style={s.stepTitle}>지원할 공고를 알려주세요</p>
            <p style={s.stepDesc}>JD 공고 내용을 직접 입력하세요.</p>
            <div style={{ ...s.card, marginTop: '1rem' }}>
              <label style={s.label}>공고 내용 직접 입력</label>
            <textarea
  style={s.textarea}
  rows={8}
  placeholder={`[포지션명]\n회사: 커넥트웨이브\n경력: 3~15년\n\n[주요 업무]\n- 데이터 웨어하우스 설계\n- Airflow 기반 ETL/ELT 자동화`}
  value={jdText}
  onChange={e => {
    setJdText(e.target.value)
    setExtractedKeywords(extractKeywords(e.target.value))
  }}
/>
            </div>

{jdText && extractedKeywords.length > 0 && (
  <div style={s.kwPreview}>
    <p style={s.kwLabel}>추출된 핵심 키워드</p>
    <div>
      {extractedKeywords.map(kw => (
        <span key={kw} style={s.kwTag}>{kw}</span>
      ))}
    </div>
    <p style={{ fontSize: '0.75rem', color: 'var(--ink3)', marginTop: '8px' }}>
      이 키워드를 중심으로 이력서를 최적화합니다.
    </p>
  </div>
)}

            <div style={{ ...s.btnRow, justifyContent: 'space-between' }}>
              <button className="btn-outline" onClick={() => setStep(1)}>← 이전</button>
              <button className="btn-main" onClick={() => setStep(3)}>다음 →</button>
            </div>
          </div>
        )}


{/* STEP 3 — 확인 */}
{step === 3 && (
  <div>
    <p style={s.stepTitle}>입력 내용을 확인해주세요</p>
    <p style={s.stepDesc}>최적화를 시작하기 전에 아래 내용을 확인하세요.</p>

    <div style={s.card}>
      <p style={s.kwLabel}>이력서</p>
      <div style={s.previewChip}>
        <span style={{ fontSize: '1.1rem' }}>📄</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
          {fileName || '텍스트 직접 입력'}
        </span>
        <button style={s.editBtn} onClick={() => setStep(1)}>수정</button>
      </div>
      {resumeText && (
        <p style={{
          fontSize: '0.75rem', color: 'var(--ink3)',
          marginTop: '10px', lineHeight: 1.6,
          maxHeight: '60px', overflow: 'hidden',
          borderTop: '1px solid rgba(26,23,20,0.07)',
          paddingTop: '8px',
        }}>
          {resumeText.slice(0, 120)}...
        </p>
      )}
    </div>

    <div style={{ ...s.card, marginTop: '1rem' }}>
      <p style={s.kwLabel}>지원 공고</p>
      <div style={s.previewChip}>
        <span style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
          {jdText ? jdText.split('\n')[0] : 'JD 입력됨'}
        </span>
        <button style={s.editBtn} onClick={() => setStep(2)}>수정</button>
      </div>
      {extractedKeywords.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          {extractedKeywords.map(kw => (
            <span key={kw} style={s.kwTag}>{kw}</span>
          ))}
        </div>
      )}
      {jdText && (
        <p style={{
          fontSize: '0.75rem', color: 'var(--ink3)',
          marginTop: '10px', lineHeight: 1.6,
          maxHeight: '60px', overflow: 'hidden',
          borderTop: '1px solid rgba(26,23,20,0.07)',
          paddingTop: '8px',
        }}>
          {jdText.slice(0, 120)}...
        </p>
      )}
    </div>

    <div style={{ ...s.card, marginTop: '1rem', background: 'rgba(26,23,20,0.02)' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink2)', lineHeight: 1.8 }}>
        최적화 결과는 <strong style={{ color: 'var(--ink)' }}>약 30초</strong> 후 제공됩니다.<br />
        수정 이유와 키워드 분석이 함께 제공됩니다.
      </p>
    </div>

    <div style={{ ...s.btnRow, justifyContent: 'space-between' }}>
      <button className="btn-outline" onClick={() => setStep(2)}>← 이전</button>
      <button
        className="btn-main"
        onClick={handleStart}
        disabled={!resumeText || !jdText}
        style={{ opacity: (!resumeText || !jdText) ? 0.5 : 1 }}
      >
        최적화 시작
      </button>
    </div>
  </div>
)}

        {/* STEP 4 — 로딩 */}
        {step === 4 && (
          <div style={s.loadingWrap}>
            <svg width="64" height="64" viewBox="0 0 64 64" style={{ marginBottom: '1.5rem' }}>
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(26,23,20,0.08)" strokeWidth="5" />
              <circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="5"
                strokeDasharray="163"
                strokeDashoffset={163 - (163 * loadingStep / 4)}
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>

            <p style={s.loadingMsg}>
              {loadingStep > 0 ? loadingMsgs[loadingStep - 1] : 'JD 키워드 분석 중...'}
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink3)', marginBottom: '2rem' }}>잠시만 기다려주세요</p>

            <div style={s.loadingItems}>
              {loadingItems.map((item, i) => (
                <div key={i} style={{
                  ...s.loadingItem,
                  opacity: loadingStep > i ? 1 : 0.3,
                }}>
                  <span style={{ color: loadingStep > i ? 'var(--accent)' : 'var(--ink3)' }}>
                    {loadingStep > i ? '●' : '○'}
                  </span>
                  {item}
                </div>
              ))}
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
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2.5rem',
  },
  stepNodeWrap: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  stepNode: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  stepCircle: {
    width: '28px', height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 500,
    border: '1.5px solid rgba(26,23,20,0.2)',
    color: 'var(--ink3)',
    background: 'var(--bg)',
    transition: 'all 0.2s',
  },
  stepCircleDone: {
    background: 'rgba(232,68,10,0.1)',
    borderColor: 'var(--accent)',
    color: 'var(--accent)',
  },
  stepCircleActive: {
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
    color: 'var(--white)',
  },
  stepLabel: {
    fontSize: '11px',
    color: 'var(--ink3)',
    whiteSpace: 'nowrap',
  },
  stepLabelActive: {
    color: 'var(--ink)',
    fontWeight: 500,
  },
  stepLine: {
    flex: 1,
    height: '1px',
    background: 'rgba(26,23,20,0.15)',
    margin: '0 4px',
    marginBottom: '16px',
  },
  stepLineDone: {
    background: 'var(--accent)',
  },
  stepTitle: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '1.4rem',
    color: 'var(--ink)',
    marginBottom: '0.5rem',
    letterSpacing: '-0.01em',
  },
  stepDesc: {
    fontSize: '0.85rem',
    color: 'var(--ink2)',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
  },
  uploadZone: {
    border: '1.5px dashed rgba(26,23,20,0.2)',
    borderRadius: '6px',
    padding: '2.5rem 1rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background 0.15s',
    background: 'var(--white)',
  },
  uploadZoneFilled: {
    borderStyle: 'solid',
    borderColor: 'var(--accent)',
    background: 'rgba(232,68,10,0.04)',
  },
  uploadIcon: {
    fontSize: '1.8rem',
    color: 'var(--ink3)',
    marginBottom: '8px',
  },
  uploadTitle: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--ink)',
    marginBottom: '4px',
  },
  uploadSub: {
    fontSize: '0.78rem',
    color: 'var(--ink3)',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '1.25rem 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'rgba(26,23,20,0.1)',
  },
  dividerText: {
    fontSize: '0.78rem',
    color: 'var(--ink3)',
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '1.25rem',
  },
  label: {
    fontSize: '0.78rem',
    fontWeight: 500,
    color: 'var(--ink2)',
    marginBottom: '6px',
    display: 'block',
  },
  textarea: {
    width: '100%',
    fontSize: '0.85rem',
    lineHeight: 1.7,
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid rgba(26,23,20,0.15)',
    background: 'var(--white)',
    color: 'var(--ink)',
    fontFamily: "'Noto Sans KR', sans-serif",
    resize: 'vertical',
    outline: 'none',
  },
  card: {
    background: 'var(--white)',
    border: '1px solid rgba(26,23,20,0.08)',
    borderRadius: '6px',
    padding: '1.25rem',
  },
  urlRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '6px',
  },
  input: {
    flex: 1,
    fontSize: '0.85rem',
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid rgba(26,23,20,0.15)',
    background: 'var(--bg)',
    color: 'var(--ink)',
    fontFamily: "'Noto Sans KR', sans-serif",
    outline: 'none',
  },
  autoBtn: {
    fontSize: '0.8rem',
    padding: '8px 14px',
    borderRadius: '4px',
    border: '1px solid rgba(26,23,20,0.18)',
    background: 'transparent',
    color: 'var(--ink2)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  kwPreview: {
    marginTop: '1rem',
    background: 'var(--white)',
    border: '1px solid rgba(26,23,20,0.08)',
    borderRadius: '6px',
    padding: '1rem 1.25rem',
  },
  kwLabel: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: 'var(--ink3)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  kwTag: {
    display: 'inline-block',
    fontSize: '0.75rem',
    padding: '3px 10px',
    borderRadius: '99px',
    background: 'rgba(28,43,74,0.08)',
    color: 'var(--navy)',
    margin: '3px',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
  },
  previewChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'var(--bg)',
    borderRadius: '4px',
    padding: '10px 12px',
  },
  editBtn: {
    marginLeft: 'auto',
    fontSize: '0.75rem',
    color: 'var(--accent)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  loadingWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 0',
    textAlign: 'center',
  },
  loadingMsg: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '1.2rem',
    color: 'var(--ink)',
    marginBottom: '6px',
  },
  loadingItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    maxWidth: '280px',
  },
  loadingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.82rem',
    color: 'var(--ink2)',
    transition: 'opacity 0.3s',
  },
}

export default Input
