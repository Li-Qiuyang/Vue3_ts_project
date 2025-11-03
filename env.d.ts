/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 如果用了 setup 语法糖，可再补一行
declare module "*.vue" {
  import type { DefineSetupFnComponent } from "vue";
  const component: DefineSetupFnComponent<{}, {}, any>;
  export default component;
}
