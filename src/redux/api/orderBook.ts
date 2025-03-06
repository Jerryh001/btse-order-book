import { API } from "@/types/api";
import { Resource } from "@/types/resource";
import { api } from "./baseApi";
import { patchOrderBookData } from "./util";

export const orderBookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrderBook: build.query<Resource.OrderBook.OrderBook | undefined, void>({
      // use empty data as initial value, fill it later
      queryFn: () => ({ data: undefined }),
      onCacheEntryAdded(_arg, { cacheEntryRemoved, updateCachedData }) {
        const { ws, reconnect } = websocketWithRetry();
        cacheEntryRemoved.then(() => ws.close());
        ws.addEventListener("message", (event) => {
          const data = JSON.parse(
            event.data
          ) as API.Websocket.EventOf<API.Websocket.Topic.ORDER_BOOK>;
          if (data.topic !== API.Websocket.Topic.ORDER_BOOK) return;

          const abortController = new AbortController();
          abortController.signal.addEventListener("abort", () => {
            reconnect();
          });
          updateCachedData(patchOrderBookData(data.data, abortController));
        });
      },
    }),
  }),
});

function websocketWithRetry() {
  const ws = new WebSocket("wss://ws.btse.com/ws/oss/futures");
  function subscribe() {
    ws.send(
      JSON.stringify({
        op: "subscribe",
        args: [API.Websocket.Topic.ORDER_BOOK],
      })
    );
  }
  function unsubscribe() {
    ws.send(
      JSON.stringify({
        op: "unsubscribe",
        args: [API.Websocket.Topic.ORDER_BOOK],
      })
    );
  }
  ws.addEventListener("open", subscribe, { once: true });

  function reconnect() {
    unsubscribe();
    subscribe();
  }

  return { ws, reconnect };
}
