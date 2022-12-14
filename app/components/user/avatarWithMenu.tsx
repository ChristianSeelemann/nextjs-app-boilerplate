"use client";

import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Session } from "../../../types/auth";
import Tooltip from "../ui/tooltip";

export default function AvatarWithMenu({ session }: { session: Session }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let isOnline;
  if (session) {
    const lastSeen = Math.floor(
      new Date(session.user?.lastOnline).getTime() / 1000
    );
    const fiveMinutesAgo = Math.floor(new Date().getTime() / 1000) - 300;
    if (lastSeen - fiveMinutesAgo > 0) {
      isOnline = true;
    }
  }

  if (!session) return null;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          color={
            session.user?.privacy.showLastOnline !== false
              ? isOnline
                ? "success"
                : "error"
              : "default"
          }
        >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ p: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Tooltip title="Account">
              <Avatar
                alt={session.user ? session.user.name : ""}
                src={session.user ? session.user.image : ""}
                variant="rounded"
              />
            </Tooltip>
          </IconButton>
        </Badge>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>Add another account</MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FiSettings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FiLogOut fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
