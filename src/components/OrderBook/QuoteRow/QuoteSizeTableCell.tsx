import { alpha, styled, TableCell } from "@mui/material";

interface QuoteSizeTableCellProps {
  highLightColor?: "success" | "error";
}

export const QuoteSizeTableCell = styled(TableCell, {
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
