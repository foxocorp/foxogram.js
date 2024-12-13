import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
  ],
  rules: {
    "sort-imports": "warn",
    "sort-keys": "warn",
  },
});