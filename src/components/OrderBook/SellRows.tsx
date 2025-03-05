import { TableCell, TableRow, Typography } from "@mui/material";
import { orderBookApi } from "@/redux/api/orderBook";

export const SellRows: React.FC = () => {
  const { data } = orderBookApi.useGetOrderBookQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.asks.slice(-8),
    }),
  });

  return (
    <>
      {data?.map((row) => (
        <TableRow key={row[0]} hover>
          <TableCell>
            <Typography color="error" variant="body2" fontWeight={500}>
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
