import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LastPriceRow } from "./LastPriceRow";
import { SellRows } from "./SellRows";
import { BuyRows } from "./BuyRows";
import { TotalContextProvider } from "./TotalContext";

export const OrderBook: React.FC = () => {
  return (
    <TotalContextProvider>
      <TableContainer>
        <OrderBookTable size="small" padding="none">
          <TableHead>
            <TableRow>
              <HeaderTableCell>{"Price (USD)"}</HeaderTableCell>
              <HeaderTableCell align="right">{"Size"}</HeaderTableCell>
              <HeaderTableCell align="right">{"Total"}</HeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <SellRows />
            <LastPriceRow />
            <BuyRows />
          </TableBody>
        </OrderBookTable>
      </TableContainer>
    </TotalContextProvider>
  );
};

const HeaderTableCell = styled(TableCell, {
  name: "HeaderTableCell",
})(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const OrderBookTable = styled(Table, {
  name: "OrderBookTable",
})({
  [`& .${tableCellClasses.root}`]: {
    borderBottom: "unset",
  },
});
