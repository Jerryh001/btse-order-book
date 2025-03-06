/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  /** host name of backend websocket */
  readonly VITE_WS_SERVER_HOST: string;
}
