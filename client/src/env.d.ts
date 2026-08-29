/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Analytics Configuration
      readonly VITE_ANALYTICS_ENDPOINT?: string;
      readonly VITE_ANALYTICS_WEBSITE_ID?: string;

      // Forge API Configuration (Storage)
      readonly BUILT_IN_FORGE_API_URL?: string;
      readonly BUILT_IN_FORGE_API_KEY?: string;

      // Runtime Environment
      readonly NODE_ENV: "development" | "production" | "test";
      readonly PORT?: string;
    }
  }

  interface ImportMetaEnv {
    readonly VITE_ANALYTICS_ENDPOINT?: string;
    readonly VITE_ANALYTICS_WEBSITE_ID?: string;
  }
}

declare const __VERCEL_ENV__: string | undefined;
