import { useMemo } from "react";
import { orderBookApi } from "@/redux/api/orderBook";
import { QuoteRow } from "./QuoteRow";

export const BuyRows: React.FC = () => {
  const { data } = orderBookApi.useGetOrderBookQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.bids.slice(0, 8),
    }),
  });

  const totals = useMemo(() => {
    if (!data) return [];
    return data.reduce<number[]>((acc, row) => {
      const last = acc.at(-1) ?? 0;
      if (last === undefined) return acc;
      acc.push(+row[1] + last);
      return acc;
    }, []);
  }, [data]);

  return (
    <>
      {data?.map((row, i) => {
        return (
          <QuoteRow key={row[0]} row={row} total={totals[i]} color="success" />
        );
      })}
    </>
  );
};
