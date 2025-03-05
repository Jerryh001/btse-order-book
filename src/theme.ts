import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#F0F4F8",
      secondary: "#8698AA",
    },
    background: {
      default: "#131B29",
    },
    success: {
      main: "#00b15d",
    },
    error: {
      main: "#FF5B5A",
    },
    action: {
      hover: "#1E3059",
    },
  },
});
