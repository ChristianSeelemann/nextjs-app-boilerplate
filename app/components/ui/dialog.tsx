"use client";

import {
  Dialog as MUIDialog,
  DialogActions as MUIDialogActions,
  DialogContent as MUIDialogContent,
  DialogContentText as MUIDialogContentText,
  DialogTitle as MUIDialogTitle,
} from "@mui/material";
import { useState } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";

export default function Dialog({
  text,
  variant,
  ariaLabel,
  classes,
  disabled,
  startIcon,
  dialogTitle,
  dialogContent,
  agreeText,
  disagreeText,
  agreeCallback,
}: {
  text: string;
  variant: "contained" | "outlined" | "text";
  ariaLabel?: string;
  classes?: string;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  dialogTitle?: string;
  dialogContent: string;
  agreeText: string;
  disagreeText: string;
  agreeCallback: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    agreeCallback();
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <Button
        text={text}
        variant={variant}
        ariaLabel={ariaLabel}
        onClick={handleClickOpen}
        classes={classes}
        disabled={disabled}
        startIcon={startIcon}
      />
      <MUIDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "0.4rem",
          },
        }}
      >
        {dialogTitle && (
          <MUIDialogTitle
            id="alert-dialog-title"
            className="dark:bg-dark-800 bg-light-200 p-6 text-light-900 font-chakrabold dark:text-dark-100"
          >
            {dialogTitle}
          </MUIDialogTitle>
        )}
        <MUIDialogContent className="dark:bg-dark-800 bg-light-200 p-6">
          <MUIDialogContentText
            id="alert-dialog-description"
            className="font-bodymedium text-light-900 dark:text-dark-100"
          >
            {dialogContent}
          </MUIDialogContentText>
        </MUIDialogContent>
        <MUIDialogActions className="dark:bg-dark-800 bg-light-200 p-6 text-light-900 dark:text-dark-100">
          <Button
            text={disagreeText}
            variant="outlined"
            onClick={handleClose}
            ariaLabel={disagreeText}
            classes="border-green-600 hover:bg-green-600 hover:border-green-600 text-green-600 hover:text-white"
            autoFocus
          />
          <Button
            text={agreeText}
            variant="outlined"
            onClick={handleAgree}
            ariaLabel={agreeText}
            classes="border-red-600 hover:bg-red-600 hover:border-red-600 text-red-600 hover:text-white"
          />
        </MUIDialogActions>
      </MUIDialog>
    </>
  );
}
