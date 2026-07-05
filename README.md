# 나는 찬미 Official

React + Vite + TypeScript 기반의 `www.chanmi.kr` 공식 브랜드 사이트 MVP입니다. Cloudflare Pages Functions, D1, R2, Turnstile을 붙일 수 있는 구조로 구성되어 있습니다.

## 포함된 기능

- Home: 히어로, 소개, SNS CTA, 미디어 프리뷰, 영상 프리뷰, 팬 응원 프리뷰, 비즈니스 문의
- Media: R2 커스텀 도메인으로 바꾸기 쉬운 mock 미디어 데이터
- Videos: YouTube/치지직/팬카페 외부 링크 카드
- Fan Wall: 닉네임 + 응원 메시지 작성, pending 저장, approved만 공개
- Admin: `ADMIN_TOKEN` 기반 pending/approved/hidden 관리
- SEO: title/description, Open Graph, Twitter card, JSON-LD, sitemap, robots

## 로컬 실행

```bash
pnpm install
pnpm dev
```

Vite 개발 서버는 기본적으로 `http://127.0.0.1:5173`에서 실행됩니다.

Cloudflare Pages Functions와 D1까지 같이 확인하려면 먼저 빌드 후 Pages preview를 실행합니다.

```bash
cp .dev.vars.example .dev.vars
pnpm build
pnpm db:migrate:local
pnpm cf:preview
```

## 환경 변수

프론트엔드 빌드 변수:

```bash
VITE_PUBLIC_SITE_URL=https://www.chanmi.kr
VITE_PUBLIC_ASSET_BASE_URL=https://assets.chanmi.kr
VITE_TURNSTILE_SITE_KEY=Turnstile site key
```

Cloudflare Pages Functions 변수/시크릿:

```bash
ADMIN_TOKEN=관리자 토큰
TURNSTILE_SECRET_KEY=Turnstile secret key
PUBLIC_SITE_URL=https://www.chanmi.kr
PUBLIC_ASSET_BASE_URL=https://assets.chanmi.kr
```

로컬에서 Turnstile 없이 팬 글 작성을 테스트하려면 `.dev.vars`에 `TURNSTILE_DEV_BYPASS="true"`를 둡니다. 운영 환경에는 설정하지 마세요.

## D1 설정

```bash
wrangler d1 create chanmi-db
```

생성된 `database_id`를 `wrangler.jsonc`의 `d1_databases[0].database_id`에 넣습니다.

마이그레이션:

```bash
pnpm db:migrate:local
pnpm db:migrate:remote
```

스키마 파일은 [migrations/0001_initial_fan_board.sql](migrations/0001_initial_fan_board.sql)에 있습니다.

## R2 미디어

기본 bucket 이름은 `chanmi-media`입니다.

```bash
wrangler r2 bucket create chanmi-media
```

운영에서는 `assets.chanmi.kr` 같은 R2 커스텀 도메인을 연결하고, `VITE_PUBLIC_ASSET_BASE_URL` 및 `PUBLIC_ASSET_BASE_URL`에 같은 값을 넣으면 됩니다. 현재 mock 이미지는 `public/visuals/*`에 있으며, 실제 이미지도 같은 key 구조로 올리면 교체가 쉽습니다.

## Turnstile

Cloudflare Turnstile에서 site key와 secret key를 만든 뒤:

- `VITE_TURNSTILE_SITE_KEY`: Pages build environment variable
- `TURNSTILE_SECRET_KEY`: Pages secret

Pages secret 예시:

```bash
echo "your-secret" | wrangler pages secret put TURNSTILE_SECRET_KEY --project-name chanmi
echo "your-admin-token" | wrangler pages secret put ADMIN_TOKEN --project-name chanmi
```

## 배포

```bash
pnpm build
pnpm cf:deploy
```

Cloudflare Pages Git 연동을 쓸 경우:

- Build command: `pnpm build`
- Build output directory: `dist`
- Root directory: repository root
- Functions directory: `functions`

## 도메인

현재 운영 도메인 기준:

- `www.chanmi.kr`: Cloudflare Pages custom domain
- `chanmi.kr`: `www.chanmi.kr`로 redirect

apex redirect는 Cloudflare Dashboard의 Redirect Rules에서 아래처럼 설정하는 방식을 권장합니다.

- If hostname equals `chanmi.kr`
- Then static redirect to `https://www.chanmi.kr${http.request.uri.path}`
- Status code `301`

## 주요 파일

- [src/content/site.ts](src/content/site.ts): 브랜드 정보와 공식 링크
- [src/content/media.ts](src/content/media.ts): 미디어 mock 데이터
- [src/content/videos.ts](src/content/videos.ts): 영상/채널 링크 데이터
- [functions/api/fan-posts.ts](functions/api/fan-posts.ts): 공개 팬 글 API
- [functions/api/admin/fan-posts.ts](functions/api/admin/fan-posts.ts): 관리자 목록 API
- [functions/api/admin/fan-posts/[id].ts](functions/api/admin/fan-posts/[id].ts): 승인/숨김/삭제 API
