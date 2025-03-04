export interface Trade {
  /** Market symbol */
  symbol: string;
  /** Trade Side, BUY or SELL */
  side: TradeSide;
  /** Transacted size */
  size: number;
  /** Transacted price */
  price: number;
  /** Trade sequence Id */
  tradeId: number;
  /** Trade timestamp */
  timestamp: number;
}

export enum TradeSide {
  BUY = "BUY",
  SELL = "SELL",
}
