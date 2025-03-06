import { alpha, styled, TableRow } from "@mui/material";

interface QuoteTableRowProps {
  color?: "success" | "error";
}

export const QuoteTableRow = styled(TableRow, {
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
