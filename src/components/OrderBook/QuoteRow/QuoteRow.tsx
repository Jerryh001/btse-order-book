import { useMemo, useRef } from "react";
import { TableCell, Typography } from "@mui/material";
import { Resource } from "@/types/resource";
import { useTotalContext } from "../TotalContext";
import { QuoteSizeTableCell } from "./QuoteSizeTableCell";
import { QuoteTableRow } from "./QuoteTableRow";

export interface QuoteRowProps {
  row: Resource.OrderBook.Quote;
  color?: "success" | "error";
  total?: number;
}

export const QuoteRow: React.FC<QuoteRowProps> = ({
  row,
  color,
  total = 0,
}) => {
  const totalForAll = useTotalContext();
  const totalBarSize = (total / totalForAll) * 100;

  const previousSize = useRef(row[1]);

  const highLightColor = useMemo(
    () => getHighLightColor(row[1], previousSize.current),
    [row]
  );

  if (previousSize.current !== row[1]) {
    previousSize.current = row[1];
  }

  return (
    <QuoteTableRow key={row[0]} color={color} hover>
      <TableCell>
        <Typography color={color} variant="body2" fontWeight={500}>
          {(+row[0]).toLocaleString("en-US")}
        </Typography>
      </TableCell>
      <QuoteSizeTableCell highLightColor={highLightColor} align="right">
        <Typography variant="body2" fontWeight={500}>
          {(+row[1]).toLocaleString("en-US")}
        </Typography>
      </QuoteSizeTableCell>
      <TableCell
        style={{
          // this style changes very frequently, do not extract to a styled component
          background: `linear-gradient(to right, transparent ${
            100 - totalBarSize
          }%, ${
            color === "success"
              ? "rgba(16, 186, 104, 0.12)"
              : color === "error"
              ? "rgba(255, 90, 90, 0.12)"
              : "transparent"
          } ${100 - totalBarSize}%)`,
        }}
        align="right"
      >
        <Typography variant="body2" fontWeight={500}>
          {total.toLocaleString("en-US")}
        </Typography>
      </TableCell>
    </QuoteTableRow>
  );
};

function getHighLightColor(newSize: string, oldSize: string) {
  const newSizeNum = +newSize;
  const oldSizeNum = +oldSize;

  if (newSizeNum > oldSizeNum) {
    return "success";
  } else if (newSizeNum < oldSizeNum) {
    return "error";
  }
  return;
}
