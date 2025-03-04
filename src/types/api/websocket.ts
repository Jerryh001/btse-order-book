import { Resource } from "../resource";
import { ResponseWrapper } from "./common";
import { ListTradeFills } from "./trade";

export enum Topic {
  TRADE_HISTORY = "tradeHistoryApi:BTCPFC",
  ORDER_BOOK = "update:BTCPFC",
}

export type DataMap = {
  [Topic.TRADE_HISTORY]: ListTradeFills.Response;
  [Topic.ORDER_BOOK]: Resource.OrderBook.OrderBook;
};

// use `T extends T` to destruct the type of `T`
// https://stackoverflow.com/questions/69167148/why-ts-toolbelt-library-use-o-extends-unknown-expression
export type EventOf<T extends Topic> = T extends T
  ? ResponseWrapper<T, DataMap[T]>
  : never;

export type Events = EventOf<Topic>;
