@AGENTS.md
# CLAUDE.md (Next.js + React + TypeScript · Investment Company Site)

## 핵심 목표 (절대 우선순위)

1. **유지보수성이 뛰어난 구조 유지** (관심사 분리, 도메인별 컨테이너)
2. **구조 = 코드, 내용 = data/messages, 스타일 = SCSS + Design Token** 으로 분리
3. **간결한 TypeScript 코드로 웹 최적화** (불필요한 추상화/과설계 금지)
4. **SEO / AEO / GEO에 유리한 구조를 기본 내장**
5. **웹 접근성(WCAG, A11y)을 기본적으로 준수**
6. **4개 국어(ko, en, zh, ja) i18n을 `next-intl` 기반으로 일관 적용**
7. **모바일 퍼스트 반응형 설계**

---

## 개발 사고 순서 (항상 이 순서로 설계)

레이아웃 → 페이지 → 컨테이너 → 블록/요소 → UI → 데이터 → 반응형 → SEO/AEO/GEO/A11y

---

## 기술 스택

- **Next.js 16 (App Router)** — `app/[locale]/...` 구조
- **React 19 + TypeScript**
- **State: Zustand**
- **SCSS + Design Token System** (`styles/tokens/`)
- **i18n: next-intl** (URL 기반 locale 라우팅)
- Backend: **Java (Spring REST `/api/...`)** — locale은 `Accept-Language` 헤더로 전달
- SEO/AEO: **Next Metadata API + JSON-LD 구조화 데이터 + hreflang**

---

## i18n 규칙 (next-intl)

### 라우팅
- 모든 페이지는 `app/[locale]/` 하위에 위치한다.
- URL: `/ko`, `/en/about`, `/zh/news/market-update`, `/ja/lectures/value-investing`
- 기본 locale: `ko` — Middleware에서 locale 감지 후 리다이렉트

### 번역 파일 구조
- `messages/{locale}/` 디렉토리에 도메인별 JSON 파일로 분리
- 네임스페이스: `common`, `landing`, `about`, `academy`, `news`, `auth`, `seo`
- UI 텍스트/CTA/aria-label/alt 등은 반드시 messages에서 가져온다

### 데이터 분리 원칙
- **정적 콘텐츠** (UI 텍스트, 랜딩 카피, SEO 메타) → 프론트 `messages/` JSON
- **동적 콘텐츠** (뉴스, 게시판, 강의 정보) → 백엔드 API `Accept-Language` 헤더
- 강의 영상 자체는 locale 무관, 자막만 locale별 제공

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

### 이미지/미디어
- `next/image`의 `sizes` 속성을 브레이크포인트에 맞게 반드시 설정
- 비디오 플레이어는 가로 비율 유지 (`aspect-video`)

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
- 상세 페이지는 `/news/[slug]`, `/lectures/[slug]` 구조를 사용한다.
- id 기반 라우팅(`/news/123`)을 기본으로 사용하지 않는다.
- 게시판은 예외적으로 `/board/[id]` 허용 (사용자 작성 콘텐츠)

### slug 포맷 규칙
- 소문자 영문/숫자/하이픈만 허용: `market-update-2026`, `value-investing`
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

### SCSS import 순서
1) tokens
2) mixins / functions
3) base (reset, global)
4) components
5) pages (페이지 전용 스타일)

### 토큰 파일 역할
- `_colors.scss`: 브랜드 컬러, 시맨틱 컬러 (background, text, border 등)
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
- 의미 있는 슬러그: `/[locale]/news/[slug]`, `/[locale]/lectures/[slug]`
- 페이지 내용과 URL 일관성 유지

[구조화 데이터(JSON-LD)]
- FAQ / Course / Organization / LocalBusiness / BreadcrumbList / VideoObject 등
- JSON-LD 텍스트도 messages/data에서 가져온다.
- `inLanguage`를 현재 locale로 설정

### 2. AEO (Answer Engine Optimization)
- 주요 섹션 상단에 "한 문장 요약/핵심 답변"을 messages의 `summary`/`description`으로 렌더링
- FAQ는 질문-답변 구조를 messages로 관리하고, 페이지에 명확히 노출

### 3. GEO (Local SEO)
- `data/geo.json`에 지역 정보 정의
- "오시는 길/연락처/운영시간" 섹션은 geo 기반으로 렌더링
- LocalBusiness JSON-LD 생성

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

[FAQ Accordion]
- `aria-expanded`, `aria-controls`, `id` 매칭 필수
- 키보드 토글 지원 필수

---

## Backend API 계약 (Spring REST)

기본 규칙:
- 모든 API에 `Accept-Language` 헤더로 locale 전달
- slug 기반 상세 조회, 목록은 최소 필드만 응답
- 접근성 텍스트(alt/aria), UI 카피는 프론트 messages에서 관리 (백엔드 미의존)
- 필요 시 Next Route Handler(`/app/api/...`)로 프록시

기본 엔드포인트:
- 뉴스 목록: `GET /api/news?category&page&pageSize`
- 뉴스 상세: `GET /api/news/{slug}`
- 게시판 목록: `GET /api/board?page&pageSize`
- 게시판 상세: `GET /api/board/{id}`
- 강의 목록: `GET /api/lectures?category&level&sort&page&pageSize`
- 강의 상세: `GET /api/lectures/{slug}`
- 강의 스트리밍: `GET /api/lectures/{slug}/stream` (인증 필수)
- 내 수강: `GET /api/me/lectures`
- 인증: `POST /api/auth/login`, `POST /api/auth/register`

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
