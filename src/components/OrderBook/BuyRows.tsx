import { orderBookApi } from "@/redux/api/orderBook";
import { QuoteRow } from "./QuoteRow";

export const BuyRows: React.FC = () => {
  const { data } = orderBookApi.useGetOrderBookQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.bids.slice(0, 8),
    }),
  });

  return (
    <>
      {data?.map((row) => (
        <QuoteRow key={row[0]} row={row} color="success" />
      ))}
    </>
  );
};
