"use client";

import { Alert as MUIAlert } from "@mui/material";

export default function Alert({
  type,
  text,
}: {
  type: "error" | "warning" | "info" | "success";
  text: string;
}) {
  return (
    <MUIAlert severity={type} className="font-bodymedium">
      {text}
    </MUIAlert>
  );
}
