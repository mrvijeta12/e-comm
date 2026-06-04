import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getAllOrder,
  outForDeliveryOrder,
  shipOrder,
} from "../../../State/Admin/AdminOrder/AdminOrderAction";
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
import { getOrderById } from "../../../State/Order/orderAction";
import { useNavigate } from "react-router-dom";
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

const OrderTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminOrders } = useSelector((store) => store);
  console.log("order store", adminOrders);
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
  const handleOutForDeliveryOrder = async (id) => {
    await dispatch(outForDeliveryOrder(id));
    handleClose();
  };
  const handleViewOrder = async (orderId) => {
    navigate(`/admin/orders-details/${orderId}`);
    handleClose();
  };

  // const handlePlaceOrder = async (id) => {
  //   await dispatch(shipOrder(id));
  //   handleClose();
  // };

  useEffect(() => {
    dispatch(getAllOrder());
  }, []);
  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#fff",
          color: "#111827",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <CardHeader
          title="All Orders"
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
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              whiteSpace: "nowrap",
            }}
            aria-label="all orders table"
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
                <TableCell align="left">Img</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Total Price</TableCell>
                <TableCell align="left">Discount</TableCell>
                <TableCell align="left">Discounted Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Payment Status</TableCell>
                <TableCell align="left">Order Status</TableCell>
                <TableCell align="left">Actions</TableCell>
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
              {adminOrders.orders?.map((item) => (
                <TableRow
                  key={item._id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f9fafb",
                    },
                  }}
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

                  <TableCell align="left">
                    {item.orderItems
                      ?.map((orderItem) => orderItem.product?.title)
                      .join(", ")}
                  </TableCell>

                  <TableCell align="left">₹{item.totalPrice}</TableCell>

                  <TableCell align="left">{item.discount}%</TableCell>

                  <TableCell align="left">
                    ₹{item.totalDiscountedPrice}
                  </TableCell>

                  <TableCell align="left">{item.totalItems}</TableCell>

                  <TableCell align="left">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${getStatusClass(
                        item.paymentDetails?.paymentStatus,
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

                  <TableCell align="left">
                    <MoreVertIcon
                      className="text-violet-500 cursor-pointer hover:text-violet-700"
                      onClick={(e) => handleClick(e, item._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 0.5,
                width: "180px",
                borderRadius: 2,
                boxShadow: 3,
              },
            }}
          >
            <MenuItem onClick={() => handleViewOrder(selectedOrderId)}>
              View Order
            </MenuItem>

            <MenuItem>Place Order</MenuItem>

            <MenuItem onClick={() => handleConfirmOrder(selectedOrderId)}>
              Confirm Order
            </MenuItem>

            <MenuItem onClick={() => handleShipOrder(selectedOrderId)}>
              Ship Order
            </MenuItem>

            <MenuItem onClick={handleClose}>Cancel Order</MenuItem>

            <MenuItem
              onClick={() => handleOutForDeliveryOrder(selectedOrderId)}
            >
              Out For Delivery
            </MenuItem>

            <MenuItem onClick={() => handleDeliverOrder(selectedOrderId)}>
              Deliver Order
            </MenuItem>

            <MenuItem
              sx={{ color: "error.main" }}
              onClick={() => handleDeleteOrder(selectedOrderId)}
            >
              Delete
            </MenuItem>
          </Menu>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTable;
