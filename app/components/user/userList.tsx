"use client";

import { Avatar, Box } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { NextLinkComposed } from "../ui/link";
import { FaUserEdit } from "react-icons/fa";
import { FiChevronsRight } from "react-icons/fi";

import type { User } from "../../../types/auth";

export default function UserList({
  user,
  users,
}: {
  user: User;
  users: User[];
}) {
  let isOnline = false;
  if (user && user.lastOnline) {
    const lastSeen = Math.floor(new Date(user.lastOnline).getTime() / 1000);
    const fiveMinutesAgo = Math.floor(new Date().getTime() / 1000) - 300;
    if (lastSeen - fiveMinutesAgo > 0) {
      isOnline = true;
    }
  }

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "",
      width: 40,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar
          alt={params.value}
          src={params.value}
          component={NextLinkComposed}
          to={"/user/" + params.row.alias}
          className="h-8 w-8"
          variant="rounded"
        />
      ),
    },
    {
      field: "nickname",
      headerName: "Nickname",
      flex: 1,
      minWidth: 150,
      cellClassName: "mt-[0.12rem]",
      renderCell: (params: GridRenderCellParams) => (
        <NextLinkComposed to={"/user/" + params.row.alias}>
          {params.value}
        </NextLinkComposed>
      ),
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      minWidth: 150,
      cellClassName: "mt-[0.12rem]",
      renderCell: (params: GridRenderCellParams) => (
        <NextLinkComposed to={"/user/" + params.row.alias}>
          {params.value}
        </NextLinkComposed>
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      minWidth: 150,
      cellClassName: "mt-[0.12rem]",
      renderCell: (params: GridRenderCellParams) => (
        <NextLinkComposed to={"/user/" + params.row.alias}>
          {params.value}
        </NextLinkComposed>
      ),
    },
    {
      field: "isOnline",
      headerName: "Online",
      width: 70,
      headerAlign: "center",
      headerClassName: "border-none",
      cellClassName: "!justify-center mt-[0.12rem]",
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex items-center justify-center">
          {isOnline ? (
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
          )}
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "",
      width: 60,
      sortable: false,
      headerAlign: "center",
      cellClassName: "!justify-center mt-[0.12rem]",
      renderCell: (params: GridRenderCellParams) =>
        user?.role?.includes("superadmin") ? (
          <NextLinkComposed to={"/user/" + params.row.alias + "/edit"}>
            <FaUserEdit className="text-xl" />
          </NextLinkComposed>
        ) : (
          <NextLinkComposed to={"/user/" + params.row.alias}>
            <FiChevronsRight className="text-xl" />
          </NextLinkComposed>
        ),
    },
  ];

  // Get rows from users
  let rowArray: any = [];
  if (users) {
    users.forEach((user) => {
      rowArray.push({
        id: user?._id,
        nickname: user?.name,
        avatar: user?.image,
        alias: user?.alias,
        isOnline: user?.lastOnline,
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
    });
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rowArray}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnMenu
          className="font-body dark:text-dark-100 dark:border-white/30 border-black/[0.15]"
          hideFooterPagination={users.length < 100 ? true : false}
          hideFooter={users.length < 100 ? true : false}
          autoHeight
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-columnSeparator": {
              color: "transparent",
            },
            "html.light &.MuiDataGrid-root .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid rgb(0 0 0 / 0.15);",
            },
            "html.dark &.MuiDataGrid-root .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid rgb(255 255 255 / 0.3)",
            },
            "html.dark &.MuiDataGrid-root .MuiIconButton-root": {
              color: "rgb(255 255 255 / 54%)",
            },
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "solid transparent 0px",
            },
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "solid transparent 0px",
            },
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
              outline: "solid transparent 0px",
            },
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within .MuiDataGrid-columnHeaderTitle":
              {
                fontWeight: "bold",
              },
          }}
        />
      </Box>
    </>
  );
}
