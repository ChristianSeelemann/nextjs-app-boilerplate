"use client";

import { Button as MUIButton } from "@mui/material";

interface Props {
  variant: "contained" | "outlined" | "text";
  startIcon?: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  text: string;
  classes?: string;
  disabled?: boolean;
}

export default function Button({
  variant,
  startIcon,
  onClick,
  ariaLabel,
  text,
  classes,
  disabled,
}: Props) {
  return (
    <MUIButton
      variant={variant}
      startIcon={startIcon}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled}
      sx={{
        fontFamily: "Chakra Petch Bold",
      }}
    >
      {text}
    </MUIButton>
  );
}
