// @ts-check















import eslint from '@eslint/js';







import { defineConfig } from 'eslint/config';







import tseslint from 'typescript-eslint';



import { createRequire } from 'module';







var require = createRequire(import.meta.url);



var module = { exports: {} };







export default defineConfig(







  eslint.configs.recommended,







  tseslint.configs.recommended,
