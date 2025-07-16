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
      import: importPlugin,
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
            // 1. 외부 라이브러리
            ["^react", "^next", "^@?\\w"],

            // 2. 내부 경로
            ["^@/lib/utils", "^@/lib/types"],
            ["^@/lib/styles", "^@/ui", "^lucide-react"],
            ["^@/.*hooks", "^@/.*stores"],
            ["^@/.*components"],

            // 3. 기타 내부 모듈 (예비 catch-all)
            ["^@/"],

            // 4. 상대 경로
            ["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

            // 5. 사이드 이펙트 (예: CSS import)
            ["^\\u0000"]
          ]
        }
      ],
      "prettier/prettier": "off",
    },
  },
];

export default eslintConfig;
