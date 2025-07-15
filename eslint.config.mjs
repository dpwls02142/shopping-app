import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname }); // ← 이 부분이 있어야 해요!

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "import": importPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 외부 라이브러리 (React 관련 먼저)
            ["^react", "^next", "^@?\\w"],
            // 내부 모듈들을 타입별로 그룹핑
            ["^@/.*hooks"], // hooks
            ["^@/.*components"], // components  
            ["^@/.*stores"], // stores
            ["^@/.*types"], // types
            ["^@/.*utils"], // utils
            ["^@/"], // 기타 내부 모듈
            // 상대 경로
            ["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // 사이드 이펙트 imports
            ["^\\u0000"]
          ]
        }
      ],
      "prettier/prettier": "off"
    },
  },
];

export default eslintConfig;