# 임진희 프로 팬 홈페이지 (비공식)

**PC/모바일 반응형 팬 커뮤니티 + 운영진 콘텐츠 관리 화면**입니다.

## 설치 없이 미리보기

- `index.html`: 팬 홈페이지
- `admin.html`: 운영진 콘텐츠 관리
- `data/site.json`: 게시물·대회 기록·사진/영상·응원·프로필 데이터

**주의:** `file://`로 파일을 바로 열면 브라우저의 보안 정책 때문에 JSON 파일을 읽지 못할 수 있습니다. 웹 서버로 여는 것이 정상적인 방법입니다.

### Windows PC 로컬 미리보기

Python이 설치되어 있다면 압축을 푼 폴더의 터미널에서:

```powershell
python -m http.server 8000
```

브라우저에서 `http://localhost:8000/`으로 접속합니다. 운영진 화면은 `http://localhost:8000/admin.html`입니다.

## 가장 쉬운 무료 공개 방법: GitHub Pages

1. https://github.com 에서 계정을 만들거나 로그인합니다.
2. 새 저장소 **jinhee-fanclub**을 만듭니다. (GitHub Pages 무료 공개를 위해 공개 저장소 사용)
3. 이 ZIP 파일을 풀고 내부의 `index.html`, `admin.html`, `assets/`, `data/`, `.nojekyll`을 저장소 **최상위**에 업로드합니다.
4. 저장소 **Settings → Pages → Build and deployment → Source: Deploy from a branch → main / (root) → Save**로 설정합니다.
5. 공개 주소: `https://<깃허브계정>.github.io/jinhee-fanclub/` (배포가 완료된 후 접근 가능)
6. 운영진 화면: `https://<깃허브계정>.github.io/jinhee-fanclub/admin.html`

※ GitHub 화면과 정책은 변경될 수 있습니다.

## 팬 운영진이 직접 수정하는 방법

1. 저장소 **Settings → Collaborators**에서 신뢰하는 운영진 계정을 초대합니다.
2. 각 운영진은 자기 GitHub 계정에서 **Settings → Developer settings → Personal access tokens → Fine-grained tokens**에서 저장소 전용 토큰을 발급받습니다.
3. 해당 토큰의 Repository permissions → **Contents: Read and write**를 허용하고, 저장소 범위를 **이 팬사이트 저장소만** 선택합니다. 토큰에는 적절한 만료일을 지정합니다.
4. 운영진은 사이트 `admin.html`에 접속하여 뉴스, 대회 일정, 갤러리, 팬 응원 등을 추가/수정/삭제합니다.
5. **사이트 게시 · 백업** 메뉴에서 Owner/Repository/Branch(보통 main)를 입력하고 본인의 토큰으로 **GitHub에 게시하기**를 누릅니다.
6. GitHub 커밋 및 Pages 배포 후 전 세계 방문자에게 업데이트가 반영됩니다.

**중요한 제한:** 브라우저 편집 내용은 일단 해당 브라우저에만 저장됩니다. GitHub 게시 전에는 다른 사람에게 표시되지 않습니다. 여러 운영진이 동시에 편집할 경우 충돌 가능성이 있으므로 운영 규칙을 마련하고, 작업 전 최신 `data/site.json`을 불러오세요. GitHub 토큰은 메모리에만 보관하고 입력 후 삭제되며, GitHub 계정에 쓰기 권한이 없는 사용자는 게시할 수 없습니다.

## 데이터 백업

운영진 화면 → **사이트 게시 · 백업** → **현재 데이터 JSON 다운로드**로 전체 콘텐츠를 백업합니다. 필요하면 업로드로 다시 불러옵니다.

## 권장 운영 규칙

- 선수와 매니지먼트 공식 사이트라고 주장하지 마세요. 비공식 팬사이트 표시를 유지하세요.
- 결과·대회 일정은 LPGA/KLPGA 출처를 확인하고 날짜와 링크를 등록하세요.
- 선수 사진·로고·방송 영상은 권리자의 이용 허락이나 합법적인 임베드 조건을 먼저 확인하세요. 특히 Getty Images 사진은 별도 라이선스 없이 복제해 게시하면 안 됩니다.
- 현재 기본 프로필 사진은 LPGA 공식 원본 URL을 **임시 참조**하고 있습니다. 공개 배포 전 사용 허가를 검토하고, 허가받은 자체 이미지로 교체하는 것을 권장합니다.
- 공개 댓글은 바로 게시하지 않습니다. 운영진이 안전하게 검토한 메시지만 등록합니다.
- 관리자 페이지 URL은 숨겨지지 않으며, GitHub 저장소 권한이 게시를 통제합니다.
- 비밀번호, API 토큰, 개인정보를 `data/site.json`에 저장하지 마세요.
- 라이브 실시간 자동 업데이트, 회원가입/게시판, 알림, 이미지 자체 업로드 기능은 **포함되지 않습니다**. 추가 백엔드/인증/저장소 연동이 필요합니다.

## 출처

- LPGA 공식 선수 프로필: https://www.lpga.com/athletes/jin-hee-im/100380/bio
- LPGA 공식 선수 개요: https://www.lpga.com/athletes/jin-hee-im/100380/overview
- LPGA 공식 통계: https://www.lpga.com/athletes/jin-hee-im/100380/stats
- KLPGA 공식 프로필: https://klpga.co.kr/web/profile/mainRecord?playerCode=8890
- KLPGA 공식 우승 이력: https://klpga.co.kr/web/profile/history?playerCode=8890
- LPGA Korea 공식 영상: https://www.youtube.com/watch?v=CEbL2iDMO8M

기본 경기 결과는 작성 시점의 공개 기록을 토대로 입력한 **초기 예시 데이터**입니다. 특히 최신 경기 일정과 2026 시즌 성적은 사이트 게시 전에 운영진이 공식 LPGA 기록을 다시 확인해 주세요.
