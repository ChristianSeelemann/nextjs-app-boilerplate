"use client";

import {
  Badge,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuList,
  Paper,
  Popper,
  Avatar as MuiAvatar,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Session } from "../../../types/auth";
import AvatarMenu from "./avatarMenu";

export default function Avatar({ session }: { session: Session }) {
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

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (!session) return null;

  return (
    <>
      <IconButton
        ref={anchorRef}
        id="avatar-button"
        aria-controls={open ? "avatar-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          p: 0,
        }}
      >
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
          <MuiAvatar
            alt={session.user ? session.user.name : ""}
            src={session.user ? session.user.image : ""}
            variant="rounded"
          />
        </Badge>
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper
              sx={{
                mt: 1.5,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="avatar-menu"
                  aria-labelledby="avatar-button"
                  onKeyDown={handleListKeyDown}
                >
                  <AvatarMenu handleClose={handleClose} />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
