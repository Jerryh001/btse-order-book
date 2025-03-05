import { useEffect, useMemo, useRef } from "react";
import { styled, TableCell, TableRow, TableRowProps } from "@mui/material";
import { tradeApi } from "@/redux/api/trade";

export const LastPriceRow: React.FC = () => {
  const { data: lastPrice } = tradeApi.useListTradeFillsQuery(undefined, {
    selectFromResult: ({ data }) => ({ data: data?.[0] }),
  });

  const previousPrice = useRef(lastPrice);
  const color = useMemo(
    () => getColor(previousPrice.current?.price, lastPrice?.price),
    [lastPrice?.price]
  );
  useEffect(() => {
    // update previous price if the tradeId changes or no previous price
    if (
      !previousPrice.current ||
      previousPrice.current?.tradeId !== lastPrice?.tradeId
    ) {
      previousPrice.current = lastPrice;
    }
  }, [lastPrice]);

  return (
    <PriceTableRow color={color}>
      <PriceTableCell colSpan={3} align="center">
        {lastPrice?.price}
      </PriceTableCell>
    </PriceTableRow>
  );
};

function getColor(previousPrice?: number, currentPrice?: number) {
  if (
    previousPrice === undefined ||
    currentPrice === undefined ||
    previousPrice === currentPrice
  ) {
    return;
  }
  return currentPrice > previousPrice ? "green" : "red";
}

interface PriceTableRowProps extends TableRowProps {
  color?: "green" | "red";
}

const PriceTableRow = styled(TableRow, {
  name: "PriceTableRow",
  shouldForwardProp: (propName) => propName !== "color",
})<PriceTableRowProps>({
  color: "#F0F4F8",
  backgroundColor: "rgba(134, 152, 170, 0.12)",
  variants: [
    {
      props: { color: "green" },
      style: { color: "#00b15d", backgroundColor: "rgba(16, 186, 104, 0.12)" },
    },
    {
      props: { color: "red" },
      style: { color: "#FF5B5A", backgroundColor: "rgba(255, 90, 90, 0.12) " },
    },
  ],
});

const PriceTableCell = styled(TableCell, {
  name: "PriceTableCell",
})({
  color: "inherit",
});
