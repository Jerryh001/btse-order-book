import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LastPriceRow } from "./LastPriceRow";
import { SellRows } from "./SellRows";
import { BuyRows } from "./BuyRows";

export const OrderBook: React.FC = () => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <HeaderTableCell>{"Price (USD)"}</HeaderTableCell>
            <HeaderTableCell>{"Size"}</HeaderTableCell>
            <HeaderTableCell>{"Total"}</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <SellRows />
          <LastPriceRow />
          <BuyRows />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const HeaderTableCell = styled(TableCell, {
  name: "HeaderTableCell",
})(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
