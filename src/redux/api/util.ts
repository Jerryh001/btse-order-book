import { Resource } from "@/types/resource";
import { Draft } from "immer";

export function patchOrderBookData(
  newData: Resource.OrderBook.OrderBook,
  /** abort called when the seqNum is not matched */
  abortController: AbortController
) {
  return function (draft: Draft<Resource.OrderBook.OrderBook | undefined>) {
    switch (newData.type) {
      case Resource.OrderBook.Type.SNAPSHOT:
        return newData;
      case Resource.OrderBook.Type.DELTA:
        if (!draft) return;
        if (draft.seqNum !== newData.prevSeqNum) {
          abortController.abort();
          return;
        }
        draft.seqNum = newData.seqNum;
        draft.prevSeqNum = newData.prevSeqNum;
        patchQuotes(draft.asks, newData.asks);
        patchQuotes(draft.bids, newData.bids);

        return;
    }
  };
}

/** merge new quotes to the old quotes */
function patchQuotes(
  draft: Draft<Resource.OrderBook.Quote[]>,
  newData: Resource.OrderBook.Quote[]
) {
  for (const newBid of newData) {
    const [price, size] = newBid;
    const index = draft.findIndex(([p]) => p === price);

    if (index === -1) {
      if (size !== "0") {
        draft.push(newBid);
      }

      continue;
    }

    // remove if size is "0"
    if (size === "0") {
      draft.splice(index, 1);
    } else {
      const bid = draft[index];
      // should not happen, for type checking
      if (!bid) continue;
      bid[1] = size;
    }
  }

  draft.sort(([a], [b]) => +b - +a);
}
