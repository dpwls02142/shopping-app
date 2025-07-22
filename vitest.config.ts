import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}"], // src 디렉토리 내의 모든 .test.ts(x) 파일 포함
    environment: "jsdom", // React 테스트용으로 jsdom 환경 설정
    globals: true, // describe, it, expect 등의 전역 사용 허용
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
