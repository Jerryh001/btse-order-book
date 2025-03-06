import { orderBookApi } from "@/redux/api/orderBook";
import { createContext, useContext, useMemo } from "react";

const TotalContext = createContext(0);

/**
 * providing the total for the max value of color bar
 */
export const TotalContextProvider: React.FC<
  Omit<React.ComponentProps<typeof TotalContext.Provider>, "value">
> = (props) => {
  const { data } = orderBookApi.useGetOrderBookQuery();

  const value = useMemo(() => {
    const askTotal =
      data?.asks.slice(-8).reduce((acc, row) => acc + +row[1], 0) ?? 0;
    const bidTotal =
      data?.bids.slice(0, 8).reduce((acc, row) => acc + +row[1], 0) ?? 0;

    return Math.max(askTotal, bidTotal);
  }, [data]);

  return <TotalContext.Provider value={value} {...props} />;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTotalContext = () => useContext(TotalContext);
