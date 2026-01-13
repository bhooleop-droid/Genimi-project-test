/**
 * Reference to vite/client removed to avoid "Cannot find type definition file" error.
 * Types are defined manually below to support import.meta.env usage.
 */
// /// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_PASSWORD?: string;
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
