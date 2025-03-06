import { API } from "@/types/api";
import { api } from "./baseApi";

export const tradeApi = api.injectEndpoints({
  endpoints: (build) => ({
    listTradeFills: build.query<
      API.Trade.ListTradeFills.Response | undefined,
      void
    >({
      // use empty data as initial value, fill it later
      queryFn: () => ({ data: undefined }),
      onCacheEntryAdded(_arg, { cacheEntryRemoved, updateCachedData }) {
        const ws = new WebSocket(
          `wss://${import.meta.env.VITE_WS_SERVER_HOST}/ws/futures`
        );
        cacheEntryRemoved.then(() => ws.close());
        ws.addEventListener("message", (event) => {
          const data = JSON.parse(
            event.data
          ) as API.Websocket.EventOf<API.Websocket.Topic.TRADE_HISTORY>;

          updateCachedData(() => data.data);
        });
        ws.addEventListener("open", () => {
          ws.send(
            JSON.stringify({
              op: "subscribe",
              args: [API.Websocket.Topic.TRADE_HISTORY],
            })
          );
        });
      },
    }),
  }),
});
