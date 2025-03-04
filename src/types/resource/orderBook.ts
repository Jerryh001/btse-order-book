export interface OrderBook {
  /** Bid quotes */
  bids: Quote[];
  /** Asks quotes */
  asks: Quote[];
  /** Current sequence number */
  seqNum: number;
  /** Previous sequence number */
  prevSeqNum: number;
  /** snapshot or delta */
  type: Type;
  /** Timestamp of the orderbook */
  timestamp: number;
  /** Orderbook symbol */
  symbol: string;
}

export enum Type {
  /** Snapshot of the orderbook with a maximum of 50 levels */
  SNAPSHOT = "snapshot",
  /** Updates of the orderbook */
  DELTA = "delta",
}

/** a Tuple contains stringified number */
export type Quote = [price: string, size: string];
