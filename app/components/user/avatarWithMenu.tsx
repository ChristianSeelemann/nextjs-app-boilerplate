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
import { signOut } from "next-auth/react";
import { useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { GoDashboard } from "react-icons/go";
import { Session } from "../../../types/auth";
import Button from "../ui/button";
import Tooltip from "../ui/tooltip";
import ColorModeToggle from "../colormode/colorModeToggle";
import { usePathname } from "next/navigation";
import { NextLinkComposed } from "../ui/link";

const items = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <GoDashboard fontSize="large" />,
  },
  {
    title: "Edit Profile",
    link: "/user/me/edit",
    icon: <FaUserEdit fontSize="large" />,
  },
  {
    title: "Settings",
    link: "/dashboard/settings",
    icon: <FiSettings fontSize="large" />,
  },
];

export default function AvatarWithMenu({ session }: { session: Session }) {
  const path = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let isOnline;
  if (session && session.user?.lastOnline) {
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
        PaperProps={{
          className: "menu",
          elevation: 0,
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
        <MenuItem
          component={NextLinkComposed}
          to="user/me"
          onClick={() => handleClose()}
          key="Watch Profile"
          className={
            path === "/user/me" ? "menuitemtop menuitem-active" : "menuitemtop"
          }
        >
          <Avatar
            alt={session.user ? session.user.name : ""}
            src={session.user ? session.user.image : ""}
            variant="rounded"
          />
          Watch Profile
        </MenuItem>
        <Divider />
        {items &&
          items.map((item) => (
            <MenuItem
              component={NextLinkComposed}
              to={item.link}
              onClick={() => handleClose()}
              key={item.title}
              className={
                path === item.link ? "menuitem menuitem-active" : "menuitem"
              }
            >
              <ListItemIcon className="menuicon" sx={{ mr: -0.5 }}>
                {item.icon}
              </ListItemIcon>
              {item.title}
            </MenuItem>
          ))}
        <Divider />
        <ColorModeToggle session={session} handleClose={handleClose} />
        <MenuItem
          className="menuitem !bg-transparent focus-within:!bg-light-200 dark:focus-within:!bg-dark-900"
          onClick={() => signOut()}
        >
          <Button
            text="Logout"
            startIcon={<FiLogOut fontSize="large" />}
            ariaLabel="Logout"
            variant="contained"
            classes="defaultbutton font-chakrabold w-full !bg-primary-600 hover:!bg-primary-700 hover:!text-light-50"
            onClick={() => handleClose()}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
