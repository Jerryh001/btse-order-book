import { useMemo, useRef } from "react";
import { alpha, styled, TableCell, TableRow, Typography } from "@mui/material";
import { Resource } from "@/types/resource";

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
          {row[0]}
        </Typography>
      </TableCell>
      <QuoteSizeTableCell highLightColor={highLightColor} align="right">
        <Typography variant="body2" fontWeight={500}>
          {row[1]}
        </Typography>
      </QuoteSizeTableCell>
      <TableCell align="right">
        <Typography variant="body2" fontWeight={500}>
          {total}
        </Typography>
      </TableCell>
    </QuoteTableRow>
  );
};

interface QuoteTableRowProps {
  color?: "success" | "error";
}

const QuoteTableRow = styled(TableRow, {
  name: "QuoteTableRow",
  shouldForwardProp: (prop) => prop !== "color",
})<QuoteTableRowProps>(({ theme }) => ({
  "@keyframes mount-success": {
    from: {
      // rgba(0, 177, 93, 0.5)
      backgroundColor: alpha(theme.palette.success.main, 0.5),
    },
  },
  "@keyframes mount-error": {
    from: {
      // rgba(255, 91, 90, 0.5)
      backgroundColor: alpha(theme.palette.error.main, 0.5),
    },
  },
  animationDuration: `${theme.transitions.duration.shortest}ms`,
  animationTimingFunction: theme.transitions.easing.easeIn,
  variants: [
    {
      props: { color: "success" },
      style: { animationName: "mount-success" },
    },
    {
      props: { color: "error" },
      style: { animationName: "mount-error" },
    },
  ],
}));

interface QuoteSizeTableCellProps {
  highLightColor?: "success" | "error";
}

const QuoteSizeTableCell = styled(TableCell, {
  name: "QuoteSizeTableCell",
  shouldForwardProp: (prop) => prop !== "highLightColor",
})<QuoteSizeTableCellProps>(({ theme }) => ({
  "@keyframes highlight-success": {
    from: {
      // rgba(0, 177, 93, 0.5)
      backgroundColor: alpha(theme.palette.success.main, 0.5),
    },
  },
  "@keyframes highlight-error": {
    from: {
      // rgba(255, 91, 90, 0.5)
      backgroundColor: alpha(theme.palette.error.main, 0.5),
    },
  },
  animationDuration: `${theme.transitions.duration.shortest}ms`,
  animationTimingFunction: theme.transitions.easing.easeIn,
  variants: [
    {
      props: { highLightColor: "success" },
      style: { animationName: "highlight-success" },
    },
    {
      props: { highLightColor: "error" },
      style: { animationName: "highlight-error" },
    },
  ],
}));

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
