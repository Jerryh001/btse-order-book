import { API } from "@/types/api";
import { Resource } from "@/types/resource";
import { api } from "./baseApi";

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

          updateCachedData((draft) => {
            switch (data.data.type) {
              case Resource.OrderBook.Type.SNAPSHOT:
                return data.data;
              case Resource.OrderBook.Type.DELTA:
                if (!draft) return;
                if (draft.seqNum !== data.data.prevSeqNum) {
                  reconnect();
                  return;
                }
                // Workaround
                draft.seqNum = data.data.seqNum;
                draft.prevSeqNum = data.data.prevSeqNum;
                // TODO: apply delta
                return;
            }
          });
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
