import { Resource } from "@/types/resource";
import { TableCell, TableRow, Typography } from "@mui/material";

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
  return (
    <TableRow key={row[0]} hover>
      <TableCell>
        <Typography color={color} variant="body2" fontWeight={500}>
          {row[0]}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" fontWeight={500}>
          {row[1]}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" fontWeight={500}>
          {total}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
