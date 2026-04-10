# API Integration Spec — crestlab-api 연동 가이드

> **Backend Base URL:** `http://13.124.163.110:8083/api/v1` (`.env.local`의 `API_BASE_URL`)
> **API Docs:** `{BASE_URL}/swagger-ui/`

---

## 1. 공통 응답 포맷

백엔드의 모든 응답은 아래 형식을 따른다.

```ts
// 성공
{ success: true, data: T }

// 에러
{ success: false, error: { code: string, message: string } }

// 페이지네이션
{ success: true, data: { content: T[], page: number, size: number, total_elements: number } }
```

### 프론트 준비 사항
- [ ] `types/api.ts` 생성 — `CommonResponse<T>`, `PageResponse<T>`, `ApiError` 타입 정의
- [ ] `lib/api.ts` 생성 — 공통 fetch wrapper (base URL, 에러 핸들링, credential 포함)

```ts
// types/api.ts 예시
export interface CommonResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  total_elements: number;
}
```

---

## 2. 인증 (Auth) — `/api/v1/auth`

### 2.1 토큰 방식
- JWT Access/Refresh Token이 **HTTP-Only Cookie**로 전달됨
- Cookie 이름: `Authorization` (access), `RefreshToken` (refresh)
- 프론트에서 토큰을 직접 관리할 필요 없음 — `credentials: 'include'`만 설정

### 2.2 엔드포인트

| Method | Path | Request Body | Response | 설명 |
|--------|------|-------------|----------|------|
| POST | `/auth/login` | `{ loginEmail, password }` | `AuthResponse` + 쿠키 설정 | 로그인 |
| POST | `/auth/signup` | `{ loginEmail, password, name, phone }` | `AuthResponse` (201) | 회원가입 |
| POST | `/auth/logout` | — | — (쿠키 만료) | 로그아웃 |
| POST | `/auth/refresh` | — | 새 access 쿠키 | 토큰 갱신 |
| POST | `/auth/check-email` | `{ loginEmail }` | 200 OK / 409 중복 | 이메일 중복 확인 |
| POST | `/auth/sms/send` | `{ phone, purpose }` | dev: 인증코드 반환 | SMS 발송 |
| POST | `/auth/sms/verify` | `{ phone, code, purpose }` | 200 OK | SMS 인증 확인 |
| POST | `/auth/find-login-email` | `{ name, phone }` | `{ loginEmail: "te****@gmail.com" }` | 이메일 찾기 (마스킹) |
| POST | `/auth/reset-password` | `{ loginEmail, name, phone, newPassword }` | 200 OK | 비밀번호 재설정 |

> `purpose` 값: `"SIGNUP"` | `"FIND_LOGIN_ID"` | `"RESET_PASSWORD"`

### 2.3 AuthResponse 타입

```ts
interface AuthResponse {
  userId: number;
  loginEmail: string;
  name: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}
```

### 프론트 준비 사항
- [ ] `types/auth.ts` 생성 — `LoginRequest`, `SignUpRequest`, `AuthResponse`, `SmsRequest` 등 타입 정의
- [ ] `stores/authStore.ts` (Zustand) — 로그인 상태, 유저 정보 관리
- [ ] `lib/api.ts`의 fetch wrapper에 `credentials: 'include'` 기본 설정
- [ ] 401 응답 시 자동 `/auth/refresh` → 실패 시 로그아웃 처리 (인터셉터)
- [ ] 기존 `app/[locale]/auth/` 페이지가 있다면 폼 연결, 없으면 생성

---

## 3. 마켓 데이터 (Market) — `/api/v1/market`

### 3.1 엔드포인트

| Method | Path | Response | 설명 |
|--------|------|----------|------|
| GET | `/market/main` | `MainPageResponse` | 홈 위젯용 (주식 Top5 + 코인 Top5) |
| GET | `/market/stocks` | `StocksPageResponse` | 지수 4개 + 주식 30개 + 상승/하락 + 스파크라인 |
| GET | `/market/crypto` | `CryptoPageResponse` | 글로벌 통계 + 공포탐욕 + 도미넌스 + 코인 30개 |

### 3.2 응답 타입 (백엔드 기준)

```ts
// GET /market/main
interface MainPageResponse {
  stocks: StockQuoteDto[];  // Top 5
  crypto: CoinMarketDto[];  // Top 5
}

// GET /market/stocks
interface StocksPageResponse {
  indices: StockQuoteDto[];     // SPY, QQQ, DIA, IWM
  stocks: StockQuoteDto[];      // 30 종목
  gainers: StockQuoteDto[];     // 상승 Top
  losers: StockQuoteDto[];      // 하락 Top
  sparklines: Record<string, number[]>;  // symbol → 가격 배열
}

// GET /market/crypto
interface CryptoPageResponse {
  globalStats: CryptoGlobalStatsDto;
  fearGreed: FearGreedDto;
  dominance: DominanceDto;
  coins: CoinMarketDto[];       // 30 코인
}

// 공통 DTO
interface StockQuoteDto {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  previousClose: number;
  sector: string;
}

interface CoinMarketDto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
  totalVolume: number;
  category: string;
}

interface CryptoGlobalStatsDto {
  totalMarketCap: number;
  marketCapChangePercentage24h: number;
  totalVolume: number;
  btcDominance: number;
  ethDominance: number;
  activeCryptocurrencies: number;
}

interface FearGreedDto {
  value: number;
  classification: string;  // "Extreme Fear", "Fear", "Neutral", "Greed", "Extreme Greed"
  timestamp: string;
}

interface DominanceDto {
  btc: number;
  eth: number;
  others: number;
}
```

### 3.3 기존 프론트 타입과의 차이점

| 프론트 현재 (`types/finance.ts`) | 백엔드 응답 | 변경 필요 |
|------|------|------|
| `StockItem.marketCap` | `StockQuoteDto`에 `marketCap` 없음 | 필드 제거 또는 optional 처리 |
| `StockItem.volume` | `StockQuoteDto.volume` | 일치 |
| `CoinItem.change24h` | `CoinMarketDto.priceChangePercentage24h` | 필드명 매핑 필요 |
| `CoinItem.volume24h` | `CoinMarketDto.totalVolume` | 필드명 매핑 필요 |
| `CoinItem.price` | `CoinMarketDto.currentPrice` | 필드명 매핑 필요 |
| `FearGreedData.label` | `FearGreedDto.classification` | 필드명 매핑 필요 |
| `DominanceTimeSeriesItem` | 백엔드에 시계열 없음 (현재 스냅샷만) | 시계열 제거 또는 프론트 자체 축적 |

### 프론트 준비 사항
- [ ] `types/finance.ts` 업데이트 — 백엔드 DTO에 맞게 타입 조정 또는 매핑 레이어 추가
- [ ] `app/api/stocks/route.ts` 수정 — mock 제거, `API_BASE_URL/market/stocks` 프록시
- [ ] `app/api/crypto/route.ts` 수정 — mock 제거, `API_BASE_URL/market/crypto` 프록시
- [ ] 홈 페이지용 `/api/market-main/route.ts` 생성 — `API_BASE_URL/market/main` 프록시
- [ ] 데이터 갱신 전략 결정: SWR/React Query 도입 또는 `setInterval` + fetch
- [ ] 가격 데이터 로딩/에러/지연 상태 UI 컴포넌트 준비

---

## 4. 뉴스 (News) — `/api/v1/news`

### 4.1 엔드포인트

| Method | Path | Params | Response | 설명 |
|--------|------|--------|----------|------|
| GET | `/news` | `page`, `size`, `category` | `PageResponse<NewsResponse>` | 뉴스 목록 |
| GET | `/news/{id}` | — | `NewsResponse` | 뉴스 상세 |

### 4.2 응답 타입

```ts
interface NewsResponse {
  id: number;           // 프론트 기존: string → number로 변경
  url: string;
  title: string;
  description: string;  // 프론트 기존: summary → description
  thumbnail: string;
  source: string;
  category: 'STOCKS' | 'CRYPTO' | 'MACRO';  // 대문자
  publishedAt: string;
}
```

### 4.3 기존 타입과의 차이점

| 프론트 현재 (`NewsItem`) | 백엔드 (`NewsResponse`) | 변경 |
|------|------|------|
| `id: string` | `id: number` | 타입 변경 |
| `slug: string` | 없음 | 제거 (백엔드에 slug 없음, id 기반) |
| `summary: string` | `description: string` | 필드명 변경 |
| `content?: string[]` | 없음 | 제거 (상세 콘텐츠 없음, url로 원문 이동) |
| `author?: string` | 없음 | 제거 |
| `category: lowercase` | `category: UPPERCASE` | 케이스 매핑 |

### 프론트 준비 사항
- [ ] `types/finance.ts`의 `NewsItem` 업데이트 — 백엔드 스펙에 맞게 조정
- [ ] `app/api/news/route.ts` 수정 — `API_BASE_URL/news` 프록시 + 쿼리파라미터 전달
- [ ] 뉴스 상세 페이지 라우팅: `/[locale]/news/[slug]` → `/[locale]/news/[id]` 전환 검토
- [ ] 페이지네이션 UI 컴포넌트 준비 (`PageResponse` 활용)

---

## 5. 공지사항 (Notice) — `/api/v1/notices` (신규)

### 5.1 엔드포인트

| Method | Path | Params | Response | 설명 |
|--------|------|--------|----------|------|
| GET | `/notices` | `language`, `page`, `size` | `PageResponse<NoticeResponse>` | 공지 목록 |
| GET | `/notices/{id}` | `language` | `NoticeResponse` | 공지 상세 |

### 5.2 응답 타입

```ts
interface NoticeResponse {
  id: number;
  language: 'KO' | 'EN' | 'JA' | 'ZH';
  title: string;
  content: string;
  createdAt: string;
}
```

> `language` 파라미터: locale을 대문자로 변환하여 전달 (ko → KO)

### 프론트 준비 사항
- [ ] `types/notice.ts` 생성 — `NoticeResponse` 타입
- [ ] 공지사항 페이지 필요 여부 결정 (사이트맵에 없음 — 푸터 링크 또는 모달?)
- [ ] Route Handler: `app/api/notices/route.ts` 생성

---

## 6. 영상/교육 (Video) — `/api/v1/videos` (기존 Education 대체)

### 6.1 엔드포인트

| Method | Path | Params | Response | 설명 |
|--------|------|--------|----------|------|
| GET | `/videos` | `language`, `page`, `size` | `PageResponse<VideoResponse>` | 영상 목록 |
| GET | `/videos/{id}` | `language` | `VideoResponse` | 영상 상세 |

### 6.2 응답 타입

```ts
interface VideoResponse {
  id: number;
  filePath: string;      // 영상 파일 경로 (YouTube ID 아님!)
  thumbnail: string;
  language: 'KO' | 'EN' | 'JA' | 'ZH';
  title: string;
  description: string;
  createdAt: string;
}
```

### 6.3 기존 타입과의 차이점

| 프론트 현재 (`VideoItem`) | 백엔드 (`VideoResponse`) | 변경 |
|------|------|------|
| `slug: string` | `id: number` | slug 없음, id 기반 |
| `youtubeId: string` | `filePath: string` | YouTube → 자체 호스팅 영상으로 전환 |
| `category: VideoCategory` | 없음 | 카테고리 없음 (프론트에서 관리하거나 제거) |
| `duration, views` | 없음 | 제거 |

### 프론트 준비 사항
- [ ] `types/finance.ts`의 `VideoItem` 업데이트 — YouTube 기반에서 자체 영상으로 전환
- [ ] YouTube 임베드 → `<video>` 태그 또는 스트리밍 플레이어로 전환
- [ ] Route Handler: `app/api/videos/route.ts` 생성
- [ ] 기존 YouTube 관련 유틸 (`lib/youtube.ts`, `lib/youtubeMeta.ts`) 활용 여부 재검토

---

## 7. 랜딩 콘텐츠 (Landing) — `/api/v1/landing-contents` (신규)

### 7.1 엔드포인트

| Method | Path | Params | Response | 설명 |
|--------|------|--------|----------|------|
| GET | `/landing-contents` | `language` | `LandingContentResponse[]` | 전체 섹션 |
| GET | `/landing-contents/{section}` | `language` | `LandingContentResponse` | 특정 섹션 |

### 7.2 응답 타입

```ts
interface LandingContentResponse {
  id: number;
  section: string;       // "BANNER", "ABOUT" 등
  imagePath: string;
  language: 'KO' | 'EN' | 'JA' | 'ZH';
  title: string;
  content: string;
  updatedAt: string;
}
```

### 프론트 준비 사항
- [ ] `types/landing.ts` 생성 — `LandingContentResponse` 타입
- [ ] 현재 `data/landingData.json` 하드코딩 → API 호출로 전환
- [ ] Route Handler: `app/api/landing/route.ts` 생성
- [ ] 랜딩 컨테이너에서 API 데이터를 받아 렌더링하도록 수정

---

## 8. 공통 인프라 준비 사항 (체크리스트)

### 8.1 API 클라이언트 (`lib/api.ts`)

```ts
// 구현 필요한 공통 기능
const API_BASE = process.env.API_BASE_URL;

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',  // JWT 쿠키 자동 전송
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  const json = await res.json();
  if (!json.success) throw new ApiError(json.error);
  return json.data;
}
```

### 8.2 Route Handler 패턴 (Next.js 프록시)

CLAUDE.md 규칙에 따라 외부 API 호출은 Route Handler를 통해야 함.
하지만 **백엔드가 이미 프록시 역할**을 하므로, 프론트 Route Handler는:
- 서버 컴포넌트에서 직접 `API_BASE_URL` 호출 가능 (API 키 노출 없음)
- 클라이언트 컴포넌트에서는 Next Route Handler를 거쳐야 함 (CORS + 쿠키)

### 8.3 locale ↔ language 매핑

```ts
// 프론트 locale (소문자) → 백엔드 language (대문자)
const localeToLanguage: Record<string, string> = {
  ko: 'KO', en: 'EN', ja: 'JA', zh: 'ZH'
};
```

### 8.4 환경변수 (`.env.local`)

```env
# 이미 설정됨
API_BASE_URL=http://13.124.163.110:8083/api/v1

# 추가 필요 (클라이언트에서 접근 시)
NEXT_PUBLIC_API_URL=/api   # Next Route Handler 경로 (프론트 내부 프록시)
```

### 8.5 전체 체크리스트

| # | 작업 | 우선순위 |
|---|------|---------|
| 1 | `types/api.ts` — 공통 응답 타입 | 높음 |
| 2 | `lib/api.ts` — fetch wrapper + 에러 핸들링 | 높음 |
| 3 | `types/auth.ts` — 인증 관련 타입 | 높음 |
| 4 | `stores/authStore.ts` — Zustand 인증 상태 | 높음 |
| 5 | `types/finance.ts` 업데이트 — 백엔드 DTO 매핑 | 높음 |
| 6 | Route Handlers 수정/생성 (market, news, videos 등) | 높음 |
| 7 | `types/notice.ts` — 공지사항 타입 | 중간 |
| 8 | `types/landing.ts` — 랜딩 콘텐츠 타입 | 중간 |
| 9 | locale → language 변환 유틸 | 중간 |
| 10 | 페이지네이션 공통 컴포넌트 | 중간 |
| 11 | 401 자동 갱신 인터셉터 | 중간 |
| 12 | 기존 mock 데이터 → API 전환 (컨테이너별) | 점진적 |
| 13 | YouTube → 자체 영상 플레이어 전환 | 낮음 |

---

## 9. 기존 Route Handler 전환 요약

| 현재 파일 | 현재 상태 | 전환 대상 |
|----------|----------|----------|
| `app/api/stocks/route.ts` | mock placeholder | → `API_BASE_URL/market/stocks` 프록시 |
| `app/api/crypto/route.ts` | mock placeholder | → `API_BASE_URL/market/crypto` 프록시 |
| `app/api/news/route.ts` | mock placeholder | → `API_BASE_URL/news` 프록시 |
| `app/api/education/youtube-meta/route.ts` | YouTube 메타 | → 유지 또는 `API_BASE_URL/videos` 전환 검토 |
| (신규) `app/api/market-main/route.ts` | — | → `API_BASE_URL/market/main` |
| (신규) `app/api/notices/route.ts` | — | → `API_BASE_URL/notices` |
| (신규) `app/api/videos/route.ts` | — | → `API_BASE_URL/videos` |
| (신규) `app/api/landing/route.ts` | — | → `API_BASE_URL/landing-contents` |
| (신규) `app/api/auth/[...]/route.ts` | — | → `API_BASE_URL/auth/*` |

---

## 10. 주의사항

1. **CORS**: 백엔드 dev 설정에 `localhost:3000~3003` 허용 중 — 프론트 포트 확인
2. **쿠키 도메인**: HTTP-Only 쿠키가 cross-origin에서 동작하려면 `SameSite`, `Secure` 설정 확인 필요 (개발 시 같은 도메인 또는 프록시 사용)
3. **카테고리 케이스**: 백엔드는 `STOCKS`/`CRYPTO`/`MACRO` (대문자), 프론트 mock은 소문자 — 매핑 통일 필요
4. **뉴스 slug 없음**: 백엔드에 slug 필드 없이 id 기반 — SEO 관점에서 slug 추가 요청 검토
5. **영상 YouTube 아님**: 백엔드는 `filePath` 기반 자체 호스팅 — YouTube 플레이어 코드 전환 필요
6. **Admin API**: 관리자 기능(`/api/v1/admin/*`)은 별도 어드민 페이지에서 사용 — 일반 사용자 페이지에서는 호출하지 않음
