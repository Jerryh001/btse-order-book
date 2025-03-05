import {
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{"Price (USD)"}</TableCell>
            <TableCell>{"Size"}</TableCell>
            <TableCell>{"Total"}</TableCell>
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
