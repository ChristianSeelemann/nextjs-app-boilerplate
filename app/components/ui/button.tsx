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
  autoFocus?: boolean;
}

export default function Button({
  variant,
  startIcon,
  onClick,
  ariaLabel,
  text,
  classes,
  disabled,
  autoFocus,
}: Props) {
  return (
    <MUIButton
      variant={variant}
      startIcon={startIcon}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled}
      autoFocus={autoFocus}
      sx={{
        fontFamily: "Chakra Petch Bold",
      }}
    >
      {text}
    </MUIButton>
  );
}
