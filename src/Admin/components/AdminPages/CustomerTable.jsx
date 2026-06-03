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
          backgroundColor: "#111F35",
          color: "white",
          height: "100%",
          // border: "2px solid red",
        }}
      >
        <CardHeader title="All Customers" />
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#111F35",
            color: "white",
            // border: "2px solid white",
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
            aria-label="simple table"
            className="text-left"
          >
            <TableHead>
              <TableRow>
                {/* <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Img
                </TableCell> */}

                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Name
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="left">
                    <div className="flex justify-start">
                      <AvatarGroup max={4}>
                        {item.orderItems?.map((orderItem) => (
                          <Avatar
                            src={orderItem.product?.imageUrl}
                            key={orderItem._id}
                            sx={{
                              width: 40,
                              height: 40,
                              "& img": {
                                objectFit: "cover",
                                objectPosition: "top",
                              },
                            }}
                          />
                        ))}
                      </AvatarGroup>
                    </div>
                  </TableCell> */}
                  <TableCell align="left" sx={{ color: "white" }}>
                    {user?.firstName}
                  </TableCell>

                  <TableCell align="left" sx={{ color: "white" }}>
                    {user?.email}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {user?.role}
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
