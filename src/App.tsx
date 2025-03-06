import { Box, Typography } from "@mui/material";
import { OrderBook } from "./components/OrderBook";

function App() {
  return (
    <Box width={300} m="auto">
      <Typography>Order Book</Typography>
      <OrderBook />
    </Box>
  );
}

export default App;
