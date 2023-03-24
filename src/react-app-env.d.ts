/// <reference types="react-scripts" />

// 这里会合并源码
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_BASE_URL: string
  }
}
