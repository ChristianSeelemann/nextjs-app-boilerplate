"use client";

import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import Dns from "@mui/icons-material/Dns";
import { GoDashboard } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import Tooltip from "../ui/tooltip";
import { User } from "../../../types/auth";
import { NextLinkComposed } from "../ui/link";
import { usePathname } from "next/navigation";

const userItems = [
  { icon: <People />, label: "Userlist", link: "/user" },
  { icon: <Dns />, label: "Statistics", link: "/user/statistics" },
];

const mainItems = [
  { icon: <FaUserEdit />, label: "Edit Profile", link: "/user/me/edit" },
  { icon: <FiSettings />, label: "Settings", link: "/dashboard/settings" },
];

const DashboardNavi = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function DashboardNavigation({ user }: { user: User }) {
  const path = usePathname();
  const [openUsers, setOpenUsers] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
        })}
      >
        <Paper
          elevation={0}
          sx={{ maxWidth: 256, backgroundColor: "transparent" }}
        >
          <DashboardNavi component="nav" disablePadding className="menu">
            <ListItem
              component={NextLinkComposed}
              to="/dashboard"
              disablePadding
              className={
                path === "/dashboard"
                  ? "menuitem !py-1 menuitem-active"
                  : "menuitem !py-1"
              }
            >
              <ListItemButton>
                <ListItemIcon className="menuicon">
                  <GoDashboard />
                </ListItemIcon>
                <ListItemText
                  primary="Overview"
                  primaryTypographyProps={{
                    fontFamily: "Bai Jamjuree Medium",
                  }}
                />
              </ListItemButton>
              <Tooltip title="Project Settings">
                <IconButton
                  className="menuicon"
                  size="large"
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      height: "80%",
                      display: "block",
                      left: 0,
                      width: "1px",
                      bgcolor: "divider",
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight
                    sx={{ position: "absolute", right: 4, opacity: 0 }}
                  />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            {mainItems &&
              mainItems.map((item) => (
                <ListItemButton
                  key={item.label}
                  component={NextLinkComposed}
                  to={item.link}
                  className={
                    path === item.link ? "menuitem menuitem-active" : "menuitem"
                  }
                  sx={{ py: 0, minHeight: 42 }}
                >
                  <ListItemIcon className="menuicon">{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontFamily: "Bai Jamjuree Medium",
                    }}
                  />
                </ListItemButton>
              ))}
            {user.role && user.role.includes("superadmin") && (
              <>
                <Divider />
                <Box
                  className="menuitem !bg-transparent border-l-4 border-l-red-600 !py-0"
                  sx={{
                    pb: openUsers ? 2 : 0,
                  }}
                >
                  <ListItemButton
                    alignItems="flex-start"
                    onClick={() => setOpenUsers(!openUsers)}
                    sx={{
                      px: 3,
                      pt: 2.5,
                      pb: openUsers ? 0 : 2.5,
                      "&:hover, &:focus": {
                        "& svg": { opacity: openUsers ? 1 : 0 },
                      },
                    }}
                  >
                    <ListItemText
                      primary="User Management"
                      className="text-light-800 dark:text-dark-50"
                      primaryTypographyProps={{
                        fontSize: 16,
                        fontFamily: "Bai Jamjuree Medium",
                        lineHeight: "20px",
                        mb: "2px",
                      }}
                      secondary="Manage users and permissions"
                      secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: "16px",
                        sx: {
                          color: !openUsers ? "red" : "transparent",
                        },
                      }}
                      sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                      sx={{
                        mr: -1,
                        opacity: 0,
                        transform: openUsers ? "rotate(-180deg)" : "rotate(0)",
                        transition: "0.2s",
                      }}
                    />
                  </ListItemButton>
                  {openUsers &&
                    userItems &&
                    userItems.map((item) => (
                      <ListItemButton
                        key={item.label}
                        component={NextLinkComposed}
                        to={item.link}
                        className={
                          path === item.link
                            ? "menuitem menuitem-active"
                            : "menuitem"
                        }
                        sx={{ py: 0, minHeight: 42 }}
                      >
                        <ListItemIcon sx={{ color: "inherit" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontFamily: "Bai Jamjuree Medium",
                          }}
                        />
                      </ListItemButton>
                    ))}
                </Box>
              </>
            )}
          </DashboardNavi>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
