import { Resource } from "../resource";

export namespace ListTradeFills {
  // usually there will be a request type here, but this endpoint doesn't require any
  // export type Request = void;
  export type Response = Resource.Trade.Trade[];
}
