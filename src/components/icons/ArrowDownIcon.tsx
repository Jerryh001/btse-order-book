import { SvgIcon, SvgIconProps } from "@mui/material";
import ArrowDownIconBase from "@/assets/IconArrowDown.svg?react";

export const ArrowDownIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <ArrowDownIconBase />
    </SvgIcon>
  );
};
