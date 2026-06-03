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
          backgroundColor: "#111F35",
          color: "white",
        }}
      >
        <CardHeader title="All Orders" />
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#111F35",
            color: "white",
            // overflowX: "auto",
          }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="text-left"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ color: "white" }}>
                  Img
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  Title
                </TableCell>

                <TableCell align="left" sx={{ color: "white" }}>
                  Total Price
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  Discount
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  Discounted price
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  Quantity
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  Payment Status
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  Order Status
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrders.orders?.map((item) => (
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
                    {item.totalPrice}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.discount}
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
                  <TableCell>
                    <MoreVertIcon
                      className="text-violet-500 cursor-pointer"
                      onClick={(e) => handleClick(e, item._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  mt: 0.5,
                  width: "150px",

                  transform: "translateX(-10px)",
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

              <MenuItem onClick={() => handleDeleteOrder(selectedOrderId)}>
                Delete
              </MenuItem>
            </Menu>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTable;
