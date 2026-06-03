import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getAllOrder,
  shipOrder,
} from "../../State/Admin/AdminOrder/AdminOrderAction.jsx";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, IconButton } from "@mui/material";
const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-500 text-white";
    case "confirmed":
      return "bg-blue-500 text-white";
    case "shipped":
      return "bg-indigo-500 text-white";
    case "delivered":
      return "bg-green-500 text-white";
    case "cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const DashboardRecentOrderTable = () => {
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((store) => store);
  // console.log("order store", adminOrders);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleShipOrder = async (id) => {
    await dispatch(shipOrder(id));
    handleClose();
  };
  const handleDeliverOrder = async (id) => {
    await dispatch(deliverOrder(id));
    handleClose();
  };
  const handleConfirmOrder = async (id) => {
    await dispatch(confirmOrder(id));
    handleClose();
  };
  const handleDeleteOrder = async (id) => {
    await dispatch(deleteOrder(id));
    handleClose();
  };
  // const handleCancelledOrder = async (id) => {
  //   await dispatch(shipOrder(id));
  //   handleClose();
  // };

  // const handlePlaceOrder = async (id) => {
  //   await dispatch(shipOrder(id));
  //   handleClose();
  // };

  useEffect(() => {
    dispatch(getAllOrder());
  }, []);
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
        <CardHeader title="Recent Orders" />
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
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Img
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Title
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Discounted Price
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Quantity
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Payment Status
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Order Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrders.orders?.slice(0, 10).map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
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
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.orderItems
                      ?.map((orderItem) => orderItem.product?.title)
                      .join(", ")}
                  </TableCell>

                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.totalDiscountedPrice}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.totalItems}
                  </TableCell>

                  <TableCell align="left">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${getStatusClass(
                        item.orderStatus,
                      )}`}
                    >
                      {item.paymentDetails?.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${getStatusClass(
                        item.orderStatus,
                      )}`}
                    >
                      {item.orderStatus}
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

export default DashboardRecentOrderTable;
