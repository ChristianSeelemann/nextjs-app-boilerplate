import {
  styled,
  tooltipClasses,
  TooltipProps,
  Tooltip as MUITooltip,
} from "@mui/material";

export default function Tooltip({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <MUITooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgb(38 38 38)",
      color: "#CBD5E1",
      fontSize: 11,
      "&.MuiTooltip-tooltip": {
        padding: 8,
        paddingBottom: 6,
      },
    },
  }));

  return <LightTooltip title={title}>{children}</LightTooltip>;
}
