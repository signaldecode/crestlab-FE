# CrestLab 프로젝트 구조 요약

## 기술 스택

| 카테고리 | 기술 | 버전 |
|---------|------|------|
| Framework | Next.js (App Router) | 16.2.1 |
| UI | React + TypeScript | 19.2.4 |
| 상태관리 | Zustand | 5.0.12 |
| i18n | next-intl | 4.8.3 |
| 에디터 | Tiptap (ProseMirror) | 3.22.0 |
| 캐러셀 | embla-carousel-react | 8.6.0 |
| 차트 | recharts | 3.8.1 |
| 애니메이션 | GSAP | 3.14.2 |
| 그래픽 | PixiJS | 8.17.1 |
| 스타일 | SCSS (CSS Modules) + Design Tokens | 1.98.0 |
| 폰트 | Pretendard | 1.3.9 |

---

## 디렉토리 구조

```
crestlab/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃
│   └── [locale]/                 # i18n 라우팅 (ko, en, zh, ja)
│       ├── layout.tsx            # Locale 레이아웃 (Header, Footer, LoginModal)
│       ├── page.tsx              # 랜딩(홈) 페이지
│       ├── (auth)/               # 인증 라우트 그룹
│       ├── (content)/            # 콘텐츠 라우트 그룹
│       ├── (marketing)/          # 마케팅 라우트 그룹 (미구현)
│       ├── (legal)/              # 법적 페이지 그룹 (미구현)
│       └── (academy)/            # 교육 콘텐츠 그룹 (미구현)
├── components/
│   ├── common/                   # 공통 레이아웃 (Header, Footer, LoginModal, SkipToContent)
│   ├── containers/               # 기능별 컨테이너 (auth, board, landing)
│   ├── ui/                       # 재사용 UI (Button, Input, Accordion 등)
│   └── layout/                   # (예약됨)
├── data/                         # 정적 JSON 데이터
├── messages/                     # i18n 번역 파일
│   ├── {locale}.json             # 통합 런타임 파일 (실제 사용)
│   └── {locale}/                 # 모듈별 원본 관리용
├── stores/                       # Zustand 스토어
├── assets/styles/                # SCSS 스타일
│   ├── tokens/                   # 디자인 토큰 (_colors, _typography, _spacing 등)
│   ├── mixins/                   # 유틸리티 믹스인
│   ├── base/                     # 리셋, 글로벌 스타일
│   └── components/               # 컴포넌트별 CSS Modules
├── i18n/                         # next-intl 설정 (routing.ts, request.ts)
├── hooks/                        # (예약됨)
├── lib/                          # (예약됨)
├── config/                       # (예약됨)
└── public/                       # 정적 에셋
```

---

## 라우팅 & 페이지 구성

### 홈 (랜딩 페이지) — `[locale]/page.tsx`

13개 랜딩 컨테이너로 구성:

| 순서 | 컨테이너 | 역할 |
|-----|---------|------|
| 1 | HeroContainer | 히어로 섹션 (타이틀, CTA, 폰 목업, 위젯) |
| 2 | LogoMarqueeContainer | 파트너 로고 무한 스크롤 |
| 3 | ServiceCardsContainer | 서비스 카드 (3컬럼) |
| 4 | AppScreensContainer | 앱 스크린샷/데모 캐러셀 |
| 5 | FeatureShowcaseContainer | 기능 쇼케이스 (4개 항목) |
| 6 | CounterContainer | 카운터 애니메이션 |
| 7 | TokenListContainer | 토큰/리워드 무한 마키 |
| 8 | PortfolioMockupContainer | 포트폴리오 시각화 목업 |
| 9 | FaqAccordionContainer | FAQ 아코디언 |
| — | ChatBubblesContainer | 채팅/후기 버블 (주석 처리) |
| — | WalletCardsContainer | 지갑 카드 (주석 처리) |
| — | CtaContainer | CTA 섹션 (주석 처리) |

### 인증 — `(auth)/`

| 페이지 | 경로 | 컨테이너 |
|-------|------|---------|
| 회원가입 | `/register` | RegisterFormContainer |
| 아이디 찾기 | `/find-id` | FindIdFormContainer |
| 비밀번호 재설정 | `/reset-password` | ResetPasswordFormContainer |
| 로그인 | 모달 (전역) | LoginFormContainer → LoginModal |

### 게시판 — `(content)/board/`

| 페이지 | 경로 | 컨테이너 |
|-------|------|---------|
| 목록 | `/board` | BoardListContainer |
| 상세 | `/board/[id]` | BoardDetailContainer |
| 글쓰기 | `/board/write` | BoardWriteContainer |

### 공지사항 — `(content)/notices/`

| 페이지 | 경로 | 컨테이너 |
|-------|------|---------|
| 목록 | `/notices` | NoticeListContainer |
| 상세 | `/notices/[id]` | NoticeDetailContainer |
| 작성 | `/notices/write` | NoticeWriteContainer (관리자) |

### 뉴스 — `(content)/news/`

| 페이지 | 경로 | 컨테이너 |
|-------|------|---------|
| 목록 | `/news` | NewsListContainer |
| 상세 | `/news/[slug]` | (비어있음) |
| 작성 | `/news/write` | NewsUploadContainer (관리자) |

### 영상 — `(content)/videos/`

| 페이지 | 경로 | 컨테이너 |
|-------|------|---------|
| 목록 | `/videos` | VideoListContainer |
| 상세 | `/videos/[slug]` | VideoDetailContainer |
| 업로드 | `/videos/upload` | VideoUploadContainer (관리자) |

### 미구현 페이지

- `(marketing)/about/` — 회사 소개
- `(marketing)/contact/` — 연락처
- `(legal)/privacy/` — 개인정보처리방침
- `(legal)/terms/` — 이용약관
- `(academy)/lectures/[slug]/` — 강의 상세

---

## 컴포넌트 체계

### 공통 컴포넌트 (`common/`)

| 컴포넌트 | 역할 |
|---------|------|
| AppHeader | 네비게이션, 인증 버튼, 언어 전환, 모바일 햄버거 메뉴 |
| AppFooter | 회사 정보, 링크 |
| LoginModal | 로그인 다이얼로그 (HTMLDialogElement) |
| SkipToContent | 접근성 스킵 내비게이션 |

### UI 컴포넌트 (`ui/`)

| 컴포넌트 | 역할 |
|---------|------|
| Button | 범용 버튼 (primary/secondary/ghost/danger, sm/md/lg) |
| Input | 텍스트 인풋 |
| TextArea | 텍스트 영역 |
| FormField | 폼 필드 래퍼 (label, error, hint) |
| Checkbox | 체크박스 |
| SectionTitle | 섹션 제목 + 서브타이틀 (light/dark 테마) |
| Accordion | 아코디언 (FAQ용, aria 지원) |
| TiptapEditor | 리치 텍스트 에디터 (서식, 헤딩, 리스트, 인용) |
| LanguageSwitcher | 언어 선택 |
| AdminActions | 관리자 전용 콘텐츠 래퍼 |

### 컨테이너 총 34개

- **Auth**: 5개 (LoginForm, LoginFormContainer, RegisterForm, FindId, ResetPassword)
- **Board**: 11개 (Board 3 + Notice 3 + Video 3 + News 2)
- **Landing**: 18개 (Hero ~ CTA, 일부 주석 처리)

---

## 상태 관리 (Zustand)

### useAuthStore

```
user: { id, name, role: 'user' | 'admin' } | null
isLoggedIn: boolean
isAdmin: boolean
login(user) / logout()
```

- Mock 계정: `admin/admin1234` (관리자), `user/user1234` (일반)

### useUIStore

```
isLoginModalOpen: boolean
openLoginModal() / closeLoginModal()
```

---

## 데이터 파일 (`data/`)

| 파일 | 내용 |
|-----|------|
| commonData.json | 회사 정보 (이름, 설명, 주소, 연락처) |
| landingData.json | 로고 마키, 카운터, 토큰 목록, FAQ |
| videosData.json | 영상 리소스 목록 (4건) |
| newsData.json | 뉴스 기사 목록 (6건) |
| noticesData.json | 공지사항 목록 (5건) |

---

## 스타일 시스템

### 디자인 토큰

| 토큰 | 주요 값 |
|-----|--------|
| Colors | Primary: Cyan `#00c9ed`, Dark: Navy `#262e42`, 시맨틱 컬러 |
| Typography | Pretendard, 12px~60px, 300~800 weight |
| Spacing | 4px(`xs`) ~ 128px(`5xl`) |
| Breakpoints | sm:640, md:768, lg:1024, xl:1280, 2xl:1536 |
| Z-index | 레이어 관리 |

### SCSS 구조

- CSS Modules (`.module.scss`) 사용
- 모바일 퍼스트 + `@include respond-to()` 믹스인
- 토큰 변수만 사용 (HEX/px 직접 사용 금지)

---

## i18n 구조

- **지원 언어**: ko (기본), en, zh, ja
- **런타임 파일**: `messages/{locale}.json` (통합)
- **네임스페이스**: common, landing, about, academy, news, auth, seo, board
- **URL 패턴**: `/ko/...`, `/en/...`, `/zh/...`, `/ja/...` (prefix: always)
- **현재 상태**: ko만 구현, 나머지 locale은 추후 확정

---

## 현재 개발 상태 요약

| 영역 | 상태 |
|-----|------|
| 랜딩 페이지 | ✅ 구현 완료 (9개 섹션 활성, 3개 주석 처리) |
| 인증 (로그인/가입) | ✅ 구현 완료 (Mock 기반) |
| 게시판 (CRUD) | ✅ 구현 완료 |
| 공지사항 (CRUD) | ✅ 구현 완료 |
| 뉴스 (목록/작성) | ✅ 구현 완료 (상세 미구현) |
| 영상 (목록/상세/업로드) | ✅ 구현 완료 |
| 회사 소개 (About) | ❌ 미구현 |
| 연락처 (Contact) | ❌ 미구현 |
| 법적 페이지 (Privacy/Terms) | ❌ 미구현 |
| 강의 (Academy) | ❌ 미구현 |
| 백엔드 API 연동 | ❌ Mock 데이터 사용 중 |
| 다국어 (en/zh/ja) | ❌ ko만 구현 |
