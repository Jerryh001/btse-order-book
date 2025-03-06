import { useMemo } from "react";
import { orderBookApi } from "@/redux/api/orderBook";
import { QuoteRow } from "./QuoteRow";

export const SellRows: React.FC = () => {
  const { data } = orderBookApi.useGetOrderBookQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.asks.slice(-8),
    }),
  });

  const totals = useMemo(() => {
    if (!data) return [];

    // totals for sell rows should be calculated from bottom to top
    return data.toReversed().reduce<number[]>((acc, row) => {
      const last = acc[0] ?? 0;
      acc.unshift(+row[1] + last);
      return acc;
    }, []);
  }, [data]);

  return (
    <>
      {data?.map((row, i) => (
        <QuoteRow key={row[0]} row={row} total={totals[i]} color="error" />
      ))}
    </>
  );
};
