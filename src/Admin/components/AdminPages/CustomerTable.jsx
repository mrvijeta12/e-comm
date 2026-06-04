import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Menu, MenuItem, IconButton, Card, CardHeader } from "@mui/material";
import { getAllUsers } from "../../../State/Auth/Action";

const CustomerTable = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const users = useSelector((state) => state.auth.users);

  return (
    <div className="h-full">
      <Card
        sx={{
          backgroundColor: "#fff",
          color: "#111827",
          height: "100%",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <CardHeader
          title="All Customers"
          sx={{
            color: "#111827",
            borderBottom: "1px solid #e5e7eb",
          }}
        />

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            overflowX: "auto",
            overflowY: "auto",
            width: "100%",
            height: "100%",
            paddingBottom: "50px",
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              whiteSpace: "nowrap",
            }}
            aria-label="customers table"
          >
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  color: "#111827",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  borderBottom: "1px solid #e5e7eb",
                },
              }}
            >
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
              </TableRow>
            </TableHead>

            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  color: "#111827",
                  borderBottom: "1px solid #f3f4f6",
                },
              }}
            >
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f9fafb",
                    },
                  }}
                >
                  <TableCell align="left">
                    {`${user?.firstName || ""} ${user?.lastName || ""}`}
                  </TableCell>

                  <TableCell align="left">{user?.email}</TableCell>

                  <TableCell align="left">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
                        user?.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user?.role}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default CustomerTable;
