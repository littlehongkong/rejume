const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

export async function optimizeResume(resumeText, jdText) {
  const prompt = `
당신은 10년 경력의 헤드헌터이자 채용 전문가입니다.
아래 이력서와 채용공고(JD)를 분석해서 합격 확률을 높이는 방향으로 최적화해주세요.

---
[이력서 원문]
${resumeText}

---
[채용공고 JD]
${jdText}

---

## 수정 원칙 (반드시 준수)

1. JD에 명시된 기술 키워드가 이력서에 없거나 표현이 다르면 JD와 동일한 표현으로 교체
   예) JD: "Airflow 기반 ETL" → 이력서: "배치 자동화" → 수정: "Airflow 기반 ETL 자동화"

2. 수치 없는 경험 문장은 구체적 수치로 보강
   단, 이력서 원문에 근거가 있는 수치만 사용. 수치 근거가 없으면 키워드 보강만 할 것.

3. JD 상단에 언급된 역량일수록 이력서 앞쪽에 배치
   핵심역량 섹션의 항목 순서를 JD 우선순위에 맞게 재배치.

4. ATS 필터링 대응
   JD 키워드와 동일한 표현 사용. 유사어 사용 금지.

5. 문장은 간결하게
   불필요한 수식어 제거. 주어 없이 동사/명사로 시작하는 문체 유지.

6. 수정 범위
   - 핵심역량, 경력요약, 각 회사별 주요업무/성과 항목을 모두 검토할 것
   - 최소 3건, 최대 7건
   - 실제로 합격률에 영향을 주는 항목만 수정
   - 사소한 맞춤법, 띄어쓰기는 수정하지 않음

## 절대 금지 사항 (위반 시 응답 전체가 무효)

- 이력서 원문에 없는 회사명, 기술, 경험, 도메인을 추가하는 것은 절대 금지
- 원문에 존재하지 않는 문장을 before로 사용하는 것 절대 금지
- 실제 변경이 없는 항목을 diffs에 포함하는 것 절대 금지
  예) before와 after가 실질적으로 동일하거나, 회사명/직급/날짜 라인은 diffs에 넣지 말 것
- 지원자가 경험하지 않은 도메인(예: 증권, CRM, 커머스 등)을 임의로 추가 금지
- 원문에 없는 수치를 지어내는 것 절대 금지
- JD와 이력서의 도메인 핏이 낮더라도 없는 경험을 추가해 핏을 억지로 높이지 말 것
  핏이 낮으면 weaknesses에 "이 포지션과 경험 간극이 있음"으로 솔직하게 표시할 것
---

## 출력 형식

아래 JSON 형식으로만 응답하세요. 마크다운 코드블록, 설명 텍스트 절대 포함하지 마세요.

{
  "company": "회사명 (JD에서 추출, 없으면 '미확인')",
  "position": "포지션명 (JD에서 추출, 없으면 '미확인')",
  "matchScore": 최적화 후 예상 매칭 점수 (0~100 숫자),
  "keywords": {
    "hit": ["이력서에 반영된 JD 핵심 키워드"],
    "miss": ["JD에 있지만 이력서에 없는 키워드"],
    "neutral": ["있으면 좋지만 필수는 아닌 키워드"]
  },
  "diffs": [
    {
      "section": "수정된 섹션명 (예: 핵심역량, 경력요약, 프로젝트명)",
      "before": "수정 전 문장 — 반드시 이력서 원문에 존재하는 문장 그대로",
      "after": "수정 후 문장 — JD 키워드 반영 + 수치 보강",
      "reason": "수정 이유 — 어떤 원칙을 적용했는지 구체적으로 (예: JD 3번째 요구사항 키워드 직접 반영, ATS 통과율 향상)"
    }
  ],
  "optimizedResume": "최적화된 이력서 전체 텍스트. 원본 구조/포맷 100% 유지. diffs의 before를 after로 교체한 것 외 변경 없음. 줄바꿈은 \\n으로.",
  "strengths": [
    "JD와 매칭되는 이력서의 강점 — 구체적으로 어떤 경험이 어떤 JD 요건과 매칭되는지 서술"
  ],
  "weaknesses": [
    {
      "level": "danger 또는 warn",
      "text": "보완 필요 항목 — danger: 없으면 서류 탈락 가능, warn: 있으면 유리한 수준"
    }
  ],
  "companyPoint": "이 회사/포지션 지원 시 반드시 강조해야 할 포인트 2~3문장. 일반론 금지. JD 분석 기반으로 구체적으로."
}
`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.4-mini',
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API 오류: ${response.status}`)
  }

  const data = await response.json()
  const content = data.choices[0].message.content
  // JSON 블록 추출 및 제어문자 제거
  const clean = content
    .replace(/```json|```/g, '')  // 마크다운 코드블록 제거
    .trim()

  // 제어 문자 이스케이프 처리
  const sanitized = clean.replace(
    /"optimizedResume"\s*:\s*"([\s\S]*?)(?<!\\)"/,
    (match, p1) => {
      const escaped = p1
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
      return `"optimizedResume": "${escaped}"`
    }
  )

  return JSON.parse(sanitized)
}
