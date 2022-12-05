"use client";

import { MenuItem } from "@mui/material";

export default function AvatarMenu({ handleClose }: any) {
  return (
    <>
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </>
  );
}
