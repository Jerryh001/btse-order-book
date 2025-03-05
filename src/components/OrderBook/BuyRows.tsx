import { TableCell, TableRow, Typography } from "@mui/material";
import { orderBookApi } from "@/redux/api/orderBook";

export const BuyRows: React.FC = () => {
  const { data } = orderBookApi.useGetOrderBookQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.bids.slice(0, 8),
    }),
  });

  return (
    <>
      {data?.map((row) => (
        <TableRow key={row[0]} hover>
          <TableCell>
            <Typography color="success" variant="body2" fontWeight={500}>
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
              {0}
            </Typography>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
