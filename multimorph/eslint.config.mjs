import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // explicitly include all JavaScript and TypeScript files
    ignores: ["node_modules/**", "dist/**", "build/**"], // optional: ignore generated or build folders
    ...compat.config({
      extends: ["next/core-web-vitals", "next/typescript"],
    }),
  },
];

export default eslintConfig;
