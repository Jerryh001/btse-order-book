import { useEffect, useMemo, useRef } from "react";
import {
  alpha,
  styled,
  TableCell,
  TableRow,
  TableRowProps,
  Typography,
} from "@mui/material";
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
    <PriceTableRow variant={color}>
      <TableCell colSpan={3} align="center">
        <Typography color={color} fontWeight={700}>
          {lastPrice?.price}
        </Typography>
      </TableCell>
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
  return currentPrice > previousPrice ? "success" : "error";
}

interface PriceTableRowProps extends TableRowProps {
  variant?: "success" | "error";
}

const PriceTableRow = styled(TableRow, {
  name: "PriceTableRow",
  shouldForwardProp: (propName) => propName !== "variant",
})<PriceTableRowProps>(({ theme }) => ({
  backgroundColor: alpha(theme.palette.text.secondary, 0.12),
  variants: [
    {
      props: { variant: "success" },
      style: {
        // rgba(16, 186, 104, 0.12)
        backgroundColor: alpha("#10BA68", 0.12),
      },
    },
    {
      props: { variant: "error" },
      style: {
        //rgba(255, 90, 90, 0.12)
        backgroundColor: alpha("#FF5A5A", 0.12),
      },
    },
  ],
}));
