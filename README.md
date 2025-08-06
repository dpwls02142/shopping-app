# SHOPPING APP

> 본 리포지토리는 [토스쇼핑](https://toss.im/shopping-seller) 클론 코딩 프로젝트입니다.
> 프로젝트 데모는 [해당 사이트](https://shopping-app-ivory.vercel.app/)에서 볼 수 있습니다.

## 스크린샷

![Image](https://github.com/user-attachments/assets/7561f41d-29bc-47eb-9b59-9578665076d6)

## 실행 방법

```bash
# package 설치
pnpm install
# .env.local 생성 후 base url 설정
API_BASE_URL=https://back-shopping-app.vercel.app
# 개발 환경 실행
pnpm dev
# 빌드
pnpm build
# 빌드 환경 실행
pnpm start
```

## 안내 사항

본 프로젝트는 mock DB를 기반으로 작동하기에 production 환경에서는 장바구니에 상품을 담는 기능까지만 제공합니다만,
로컬 환경에서는 json-server를 활용해 상품 구매 기능(PATCH 요청)을 테스트 할 수 있습니다.

### 로컬 환경에서 전체 기능 테스트 방법

1. 다음 명령어로 로컬 환경에서 json-server를 실행합니다.

```bash
pnpm json-server
```

2. lib/utils/index.ts 파일 내 getApiUrl 함수를 아래와 같이 수정합니다.

```ts
const getApiUrl = (endpoint: string) => {
  // 서버 측
  if (typeof window === "undefined") {
    const apiBaseUrl = "http://localhost:3001";
    if (apiBaseUrl) {
      return `${apiBaseUrl}/${endpoint}`;
    }
  }
  // 클라이언트 측에선 상대 경로
  return `http://localhost:3001/${endpoint}`;
};
```

## 사용 기술 스택

| 분류        | 기술 스택                                                             |
| ----------- | --------------------------------------------------------------------- |
| 프레임워크  | React v19.0.0, Next.js v15.1.0 (App Router), TypeScript v5            |
| 상태 관리   | Zustand v5.0.6 (클라이언트 상태), tanstack-query v.5.83.0 (서버 상태) |
| 폼 관리     | React Hook Form v7.60.0                                               |
| 스타일링    | Tailwind CSS v3.4.1, shadcn/ui, radix-ui                              |
| 패키지 관리 | pnpm                                                                  |
| 데이터      | Faker.js v9.9.0, json-server v1.0.0-beta.3                            |
| 기타 도구   | ESLint v9, Prettier v3.6.2, Husky v9.1.7                              |

## 프레임워크 및 라이브러리 선택 이유

> 보다 자세한 내용은 [여기서](https://growth-log-kappa.vercel.app/blog/projects/clone%20coding/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%84%B8%ED%8C%85) 보실 수 있습니다.

### 프레임워크

- **Next.js (App Router)**
  - 기본적으로 서버 컴포넌트를 사용하므로 클라이언트 측 번들 크기를 최소화할 수 있어 초기 로딩 속도가 향상됨
  - 서버에서 먼저 받아와진 데이터를 스트리밍하여 점진적으로 렌더링하기 위해서

### 상태 관리

- **Zustand**
  - 장바구니에 상품을 담거나 하루 특가의 타이머등 전역에서 관리되어야 하는 상태가 있기 때문에

- **tanstack-query**
  - 상품 주문시 mutate를 활용해 데이터 업데이트를 효율적으로 관리하기 위해서

### 폼 관리

- **React Hook Form**
  - 복잡한 필드간의 연결성을 관리하기 위해서

### 스타일링

- **Tailwind CSS + shadcn/ui**
  - 불필요한 CSS를 제거해 번들 사이즈를 최소로 유지하기 위해서

### 패키지 관리

- **pnpm**
  - 개인 PC의 디스크 공간을 절약하기 위해서

### 데이터

- **Faker.js + json-server**
  - 가상 API 환경을 구성하기 위해서
