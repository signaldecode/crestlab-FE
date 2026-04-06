@AGENTS.md
# CLAUDE.md (Next.js + React + TypeScript · Global Stock & Crypto Information Platform)

## 핵심 목표 (절대 우선순위)

1. **유지보수성이 뛰어난 구조 유지** (관심사 분리, 도메인별 컨테이너)
2. **구조 = 코드, 내용 = data/messages, 스타일 = SCSS + Design Token** 으로 분리
3. **간결한 TypeScript 코드로 웹 최적화** (불필요한 추상화/과설계 금지)
4. **SEO / AEO / GEO에 유리한 구조를 기본 내장**
5. **웹 접근성(WCAG, A11y)을 기본적으로 준수**
6. **4개 국어(ko, en, zh, ja) i18n을 `next-intl` 기반으로 일관 적용**
7. **모바일 퍼스트 반응형 설계**
8. **레이아웃/프레임(Skeleton) 우선 구축** — 상세 콘텐츠보다 전체 구조를 먼저 잡는다

---

## 프로젝트 컨셉

- **목표:** 미국 주식 및 암호화폐 정보를 실시간으로 제공하는 AI 기반 글로벌 금융 플랫폼
- **톤 & 매너:** 해외 법인 느낌의 전문적인 UI/UX, 글로벌 금융 데이터 시각화 중심

---

## 사이트맵

| 페이지 | 경로 | 핵심 구성 |
|-------|------|----------|
| **Home** | `/[locale]` | Hero, 실시간 티커 바, US Stocks/Crypto 메인 그리드, 뉴스 프리뷰 |
| **US Stocks** | `/[locale]/stocks` | 주요 지수 카드, 실시간 가격 테이블(섹터 필터), 종목 상세 차트 팝업 |
| **Crypto** | `/[locale]/crypto` | BTC 도미넌스 차트, 공포/탐욕 지수, 코인 리스트(가격/변동률/시총) |
| **Education** | `/[locale]/education` | YouTube 임베드 플레이어, 카테고리별 영상 그리드 |
| **News** | `/[locale]/news` | RSS 자동 수집 피드, 카테고리(Stocks/Crypto/Macro) 필터 |
| **About** | `/[locale]/about` | 해외 법인 컨셉 회사 소개 |
| **Disclaimer** | `/[locale]/disclaimer` | 유사투자자문 면책 고지, 관련 신고 번호 |

---

## 개발 사고 순서 (항상 이 순서로 설계)

레이아웃 → 페이지 → 컨테이너 → 블록/요소 → UI → 데이터 → 반응형 → SEO/AEO/GEO/A11y

---

## 기술 스택

- **Next.js 16 (App Router)** — `app/[locale]/...` 구조
- **React 19 + TypeScript**
- **State: Zustand**
- **SCSS + Design Token System** (`assets/styles/tokens/`)
- **i18n: next-intl** (URL 기반 locale 라우팅)
- **차트: recharts** (가격 차트, 도미넌스 차트 등 금융 데이터 시각화)
- Backend: **Java (Spring REST `/api/...`)** — locale은 `Accept-Language` 헤더로 전달
- SEO/AEO: **Next Metadata API + JSON-LD 구조화 데이터 + hreflang**

---

## 외부 API 연동 규칙

### 데이터 소스

| 데이터 | API | 용도 |
|-------|-----|------|
| 미국 주식 가격/지수 | Alpha Vantage 또는 Twelve Data | 실시간 가격, 지수 현황 (S&P500, NASDAQ 등) |
| 암호화폐 | CoinGecko API | 실시간 가격, 24h 변동률, 시가총액, BTC 도미넌스 |
| 공포/탐욕 지수 | Alternative.me API | Fear & Greed Index 위젯 |
| 뉴스 | RSS (CNBC, Bloomberg, CoinDesk 등) | 자동 수집 피드 |

### 연동 원칙
- 외부 API 키는 **환경변수(`.env.local`)** 로만 관리 — 절대 코드에 하드코딩 금지
- 외부 API 호출은 **Next.js Route Handler(`app/api/...`)를 프록시로** 사용 — 클라이언트에서 직접 호출 금지 (API 키 노출 방지)
- API 응답 데이터의 타입은 `types/` 디렉토리에 인터페이스로 정의
- 실시간 데이터 갱신 주기: 가격 데이터 30초~1분, 뉴스 5~10분 (API rate limit 고려)
- API 장애 시 마지막 캐시 데이터를 표시하고, UI에 "데이터 지연" 상태 표시

---

## 페이지별 컨테이너 설계 가이드

### Home (랜딩)
- `HeroContainer` — 회사 소개, 핵심 가치 문구, CTA 버튼
- `TickerBarContainer` — S&P500, NASDAQ, BTC, ETH 실시간 가격 스크롤 바
- `StocksPreviewContainer` — US Stocks 요약 카드 그리드
- `CryptoPreviewContainer` — Crypto 요약 카드 그리드
- `NewsPreviewContainer` — 최신 뉴스 3~4개 프리뷰

### US Stocks
- `IndexCardsContainer` — 주요 지수 상태 카드 (S&P500, NASDAQ, DOW 등)
- `StockTableContainer` — 실시간 가격 테이블 + 섹터 필터 (Tech, Energy, Finance 등)
- `StockDetailPopup` — 종목 클릭 시 상세 차트 팝업

### Crypto
- `DominanceChartContainer` — BTC 도미넌스 차트
- `FearGreedContainer` — 공포/탐욕 지수 위젯
- `CoinListContainer` — 코인 리스트 (가격, 24h 변동률, 시가총액)

### Education
- `VideoPlayerContainer` — YouTube 임베드 플레이어
- `VideoCategoryContainer` — 카테고리별 영상 그리드 (Beginner / Technical Analysis / Crypto Basics)

### News
- `NewsFeedContainer` — RSS 자동 수집 피드 목록
- `NewsFilterContainer` — 카테고리 필터 (Stocks, Crypto, Macro)

### About / Disclaimer
- `AboutContainer` — 영문 회사 소개
- `DisclaimerContainer` — 면책 고지, 신고 번호

---

## i18n 규칙 (next-intl)

### 라우팅
- 모든 페이지는 `app/[locale]/` 하위에 위치한다.
- URL: `/ko`, `/en/stocks`, `/zh/crypto`, `/ja/education`
- 기본 locale: `ko` — Middleware에서 locale 감지 후 리다이렉트

### 번역 파일 구조 (⚠️ 중요)
- **실제 런타임에 로드되는 파일은 `messages/{locale}.json` (통합 파일)** — `i18n/request.ts`에서 `import(`../messages/${locale}.json`)` 으로 로드
- `messages/{locale}/` 디렉토리의 개별 JSON 파일은 **참고용/원본 관리용**이며, 런타임에 직접 사용되지 않음
- **메시지 키를 추가/수정/삭제할 때 반드시 `messages/{locale}.json` 통합 파일을 수정해야 한다** — 개별 파일만 수정하면 `MISSING_MESSAGE` 에러 발생
- 네임스페이스: `common`, `landing`, `stocks`, `crypto`, `education`, `news`, `about`, `disclaimer`, `auth`, `seo`
- UI 텍스트/CTA/aria-label/alt 등은 반드시 messages에서 가져온다

### 데이터 분리 원칙
- **정적 콘텐츠** (UI 텍스트, 랜딩 카피, SEO 메타) → 프론트 `messages/` JSON
- **동적 콘텐츠** (실시간 가격, 뉴스 피드, 차트 데이터) → 외부 API / 백엔드 API
- 교육 영상은 YouTube 임베드 — locale별 제목/설명만 messages로 관리

### SEO + i18n
- 모든 페이지에 `hreflang` alternate 링크 필수
- locale별 메타(title/description/OG)는 `messages/{locale}/seo.json`에서 관리
- JSON-LD의 `inLanguage` 필드를 현재 locale로 설정

---

## 반응형 설계 규칙 (필수)

### 기본 원칙
- **모바일 퍼스트**: 기본 스타일은 모바일, 큰 화면은 브레이크포인트로 확장
- 모든 페이지/컨테이너/컴포넌트는 반드시 모바일~데스크탑까지 대응해야 한다
- 컴포넌트 개발 시 반응형을 "나중에 추가"하지 않는다 — 처음부터 함께 설계

### 브레이크포인트 (`styles/tokens/_breakpoints.scss`에서 관리)
- `$bp-sm` (640px): 큰 모바일 / 소형 태블릿
- `$bp-md` (768px): 태블릿
- `$bp-lg` (1024px): 소형 데스크탑
- `$bp-xl` (1280px): 데스크탑
- `$bp-2xl` (1536px): 와이드 데스크탑
- 브레이크포인트는 mixin으로 사용: `@include respond-to(md) { ... }`

### 레이아웃 규칙
- 컨테이너 max-width를 설정하고 좌우 패딩으로 여백 확보
- Grid/Flex 기반 레이아웃: 모바일 1열 → 태블릿 2열 → 데스크탑 3~4열
- 네비게이션: 모바일은 햄버거 메뉴, `lg` 이상은 풀 네비게이션
- 사이드바: 모바일은 숨김/오버레이, `lg` 이상은 고정
- 금융 데이터 테이블: 모바일에서는 카드 형태로 전환, `md` 이상은 테이블 유지

### 이미지/미디어
- `next/image`의 `sizes` 속성을 브레이크포인트에 맞게 반드시 설정
- YouTube 임베드는 `aspect-video` 비율 유지
- 차트/그래프는 컨테이너 너비에 반응하도록 설계

### 터치 대응
- 터치 타겟 최소 44x44px (WCAG 2.5.5)
- 호버 전용 인터랙션 금지 — 호버 효과는 부가적, 터치에서도 접근 가능해야 함

### 금지
- 고정 width/height (px)로 레이아웃 잡기 금지 — 상대 단위 또는 토큰 변수 사용
- `display: none`으로 모바일 콘텐츠 완전 숨김 금지 — 필요시 접근성 고려하여 처리
- 데스크탑 전용 기능 금지 — 모든 기능은 모바일에서도 사용 가능해야 함

---

## URL 식별자 규칙 (slug) — 필수

### slug 정의
- slug는 URL에 들어가는 "사람이 읽기 좋은 식별자"다.
- 뉴스 상세: `/news/[slug]` 구조
- 교육 영상 상세: `/education/[slug]` 구조
- id 기반 라우팅을 기본으로 사용하지 않는다.

### slug 포맷 규칙
- 소문자 영문/숫자/하이픈만 허용: `market-update-2026`, `btc-analysis`
- locale 무관 단일 slug — 백엔드가 locale별 콘텐츠 반환
- 중복 불가(유일)

### SEO/JSON-LD 규칙
- 상세 페이지는 data 기반으로 metadata(title/description/og)를 locale별 생성한다.
- FAQ가 있으면 `FAQPage` JSON-LD를 주입한다.
- breadcrumb는 `BreadcrumbList` JSON-LD로 구성한다.

---

## Data 설계 원칙 (SEO/AEO/GEO + A11y 포함)

UI 텍스트 / 이미지 경로 / 섹션 정보 / 접근성용 텍스트 / 메타 정보 등은
**절대 페이지/컴포넌트에 하드코딩하지 않는다.**

번역 가능한 텍스트는 `messages/` JSON, locale 무관 구조 데이터는 `data/`에서 관리한다.

특히 아래는 **반드시 messages 또는 data에서 값 가져오기**:
- 페이지 타이틀 / 메타 설명 / 키워드 / OG 태그 등
- 이미지 alt 텍스트
- 버튼 / 링크 label, aria-label
- 섹션 제목 / 설명
- FAQ / Q&A 데이터
- 지역/주소/좌표/영업시간 등 GEO 관련 정보
- 금융 데이터의 레이블/단위 텍스트 (가격, 변동률, 시가총액 등)

### 금융 데이터 분류
- **실시간 데이터** (가격, 변동률, 지수) → 외부 API → Route Handler 프록시
- **정적 메타** (섹터 이름, 카테고리 라벨, 컬럼 헤더) → `messages/` 또는 `data/`
- **목업 데이터** (API 미연동 시) → `data/mock/` 디렉토리에 JSON으로 관리

---

## 네이밍 규칙

컴포넌트 파일명 (PascalCase):
- 레이아웃: `SomethingLayout.tsx`
- 큰 섹션/블록: `SomethingContainer.tsx`
- 소규모 래퍼: `SomethingWrap.tsx`
- 범용 박스: `SomethingBox.tsx`

리스트:
- ul → `XxxList`
- li → `XxxListItem`

CSS 클래스 (SCSS):
- kebab-case
- ul 관련: `-list` (예: `card-list`)
- li 관련: `-item` (예: `card-list-item`)
- 스타일 용도의 id 사용 금지 (form label용 id/for는 허용)

---

## 스타일 규칙 (SCSS + Design Token)

- inline style 금지
- HEX / px 직접 사용 금지 — 반드시 토큰 변수 사용 (`$color-primary`, `$spacing-md` 등)
- 컴포넌트 파일 내 스타일 선언 금지 (CSS-in-JS 금지)
- 항상 토큰 파일에서 값 참조 (`_colors.scss`, `_spacing.scss`, `_typography.scss`, `_z-index.scss`, `_breakpoints.scss`)

### 금융 플랫폼 시맨틱 컬러 (토큰으로 관리)
- 상승(gain): 녹색 계열
- 하락(loss): 적색 계열
- 보합(neutral): 회색 계열
- 이 값들은 `_colors.scss`에 시맨틱 변수로 정의

### SCSS import 순서
1) tokens
2) mixins / functions
3) base (reset, global)
4) components
5) pages (페이지 전용 스타일)

### 토큰 파일 역할
- `_colors.scss`: 브랜드 컬러, 시맨틱 컬러 (background, text, border, gain/loss/neutral 등)
- `_typography.scss`: font-family, font-size, font-weight, line-height
- `_spacing.scss`: margin/padding/gap 단위 (`$spacing-xs` ~ `$spacing-3xl`)
- `_z-index.scss`: z-index 레이어 관리
- `_breakpoints.scss`: 반응형 브레이크포인트 변수 + mixin

---

## SEO / AEO / GEO / A11y 상세 규칙 (필수)

### 1. SEO

[구조 & 마크업]
- 의미 있는 시맨틱 태그: `<main> <header> <footer> <nav> <section> <article> <aside>`
- Heading 계층: **페이지당 H1 1개**, 이후 H2 → H3
- 제목 텍스트는 messages의 번역 키 기반

[메타 태그]
- Next App Router 기준으로 **Metadata API 사용**
- 문자열 하드코딩 금지: messages 또는 data에서 로드
- `hreflang` alternate 링크 필수 (4개 locale)

[URL & 라우팅]
- 의미 있는 슬러그: `/[locale]/news/[slug]`, `/[locale]/education/[slug]`
- 페이지 내용과 URL 일관성 유지

[구조화 데이터(JSON-LD)]
- Organization / BreadcrumbList / FAQPage / VideoObject / FinancialProduct 등
- JSON-LD 텍스트도 messages/data에서 가져온다.
- `inLanguage`를 현재 locale로 설정

### 2. AEO (Answer Engine Optimization)
- 주요 섹션 상단에 "한 문장 요약/핵심 답변"을 messages의 `summary`/`description`으로 렌더링
- FAQ는 질문-답변 구조를 messages로 관리하고, 페이지에 명확히 노출

### 3. GEO (Local SEO)
- `data/geo.json`에 지역 정보 정의
- "오시는 길/연락처/운영시간" 섹션은 geo 기반으로 렌더링
- Organization JSON-LD 생성

### 4. A11y (WCAG)

[Alt/Aria data 기반]
- `alt`, `aria-label`, `aria-describedby`는 **항상 messages/data에서만**

[키보드 접근성]
- 인터랙션 요소는 `<button>`, `<a>`, `<input>` 사용
- Enter/Space 조작 가능해야 함
- Tab 순서가 논리적인 DOM 순서를 따른다.

[폼 레이블링]
- `<label htmlFor="id">` + `<input id="id">`
- 에러/힌트는 `aria-describedby` 연결

[금융 데이터 접근성]
- 가격 변동 표시 시 색상만으로 구분하지 않는다 — 화살표(▲▼) 또는 +/- 텍스트 병기
- 실시간 갱신 영역에 `aria-live="polite"` 적용
- 차트에는 텍스트 대안(요약 데이터 테이블 또는 aria-label) 제공

---

## Backend API 계약 (Spring REST + 외부 API 프록시)

### 기본 규칙
- 모든 API에 `Accept-Language` 헤더로 locale 전달
- 접근성 텍스트(alt/aria), UI 카피는 프론트 messages에서 관리 (백엔드 미의존)
- 외부 API 호출은 **Next Route Handler(`/app/api/...`)로 프록시** — API 키 보호

### 외부 API 프록시 엔드포인트 (Next Route Handler)
- 주식 가격: `GET /api/stocks/prices?symbols=AAPL,GOOGL`
- 주식 지수: `GET /api/stocks/indices`
- 종목 상세: `GET /api/stocks/[symbol]`
- 코인 목록: `GET /api/crypto/coins?page&pageSize`
- 코인 상세: `GET /api/crypto/[id]`
- BTC 도미넌스: `GET /api/crypto/dominance`
- 공포/탐욕 지수: `GET /api/crypto/fear-greed`
- 뉴스 피드: `GET /api/news?category=stocks|crypto|macro`

### 백엔드 엔드포인트 (Spring REST)
- 교육 영상 목록: `GET /api/education?category&level&page&pageSize`
- 교육 영상 상세: `GET /api/education/{slug}`
- 인증: `POST /api/auth/login`, `POST /api/auth/register`

---

## 개발 전략 (현재 단계)

1. **Skeleton 우선:** 모든 페이지의 레이아웃 프레임을 먼저 구축한다
2. **Mock 데이터:** API 연동 전에는 `data/mock/` JSON으로 UI를 개발한다
3. **컴포넌트 단위:** 각 컨테이너를 독립적으로 개발 — 데이터 소스만 나중에 교체
4. **점진적 연동:** Mock → Route Handler → 실제 API 순으로 전환

---

## 금지 (절대)

- inline style
- HEX / px 직접 사용 (토큰 변수 사용 필수)
- 컴포넌트 파일 내 스타일 선언 (CSS-in-JS)
- UI 텍스트/alt/aria 하드코딩 (반드시 messages 또는 data에서)
- data 구조 무시하고 임의 문자열 삽입
- SEO/AEO/GEO/A11y 무시한 마크업 제안
- 반응형 미대응 컴포넌트 제출
- 번역 키 없이 특정 언어 텍스트 직접 삽입
- 불필요한 `any` 타입 남발
- **외부 API 키를 클라이언트 코드에 노출** (반드시 Route Handler 프록시)
- **가격 변동을 색상만으로 표현** (접근성 위반)
