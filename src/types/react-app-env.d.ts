/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_BASE_URL: string;
    REACT_APP_API_ITEMS_ENDPOINT: string;
    REACT_APP_API_USER_TAGS_ENDPOINT: string;
  }
}
