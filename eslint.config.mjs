import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

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
            // 1. 외부 라이브러리 (React 생태계 먼저)
            ["^react", "^next", "^@?\\w"],

            // 2. 내부 모듈 (상위 레벨 → 하위 레벨)
            ["^@/types"],
            ["^@/lib", "^@/utils"],
            ["^@/app/.*/hooks", "^@/.*hooks"],     // hooks
            ["^@/app/.*/stores", "^@/.*stores"],   // stores  
            ["^@/ui"],                             // UI 컴포넌트
            ["^@/app/.*/components", "^@/.*components"], // components
            ["^@/"],                               // 기타

            // 3. 상대 경로
            ["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

            // 4. 사이드 이펙트
            ["^\\u0000"]
          ]
        }
      ],
      "prettier/prettier": "off"
    },
  },
];

export default eslintConfig;