import React, { useState } from "react";
import { adminNavbarData } from "./AdminNavbar/AdminNavbarData";
import { Route, Routes, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Dashboard from "./AdminPages/Dashboard.jsx";
import CustomerTable from "./AdminPages/CustomerTable.jsx";
import OrderTable from "./AdminPages/OrderTable.jsx";
import ProductsTable from "./AdminPages/ProductsTable.jsx";
import CreateProduct from "./AdminPages/CreateProduct.jsx";
import AdminOrderdetail from "./AdminPages/AdminOrderdetail.jsx";
import UpdateProduct from "./AdminPages/UpdateProduct.jsx";

const Admin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "250px",
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {adminNavbarData?.map((item, index) => (
          <ListItem
            key={item.name}
            onClick={() => navigate(item.path)}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex h-screen w-full">
      <CssBaseline />

      {/* Drawer */}
      <div className="w-[260px] h-screen sticky top-0 border border-r-gray-300">
        {drawer}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 border border-green-500 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/customers" element={<CustomerTable />} />
          <Route path="/orders" element={<OrderTable />} />
          <Route path="/products/:productId" element={<UpdateProduct />} />
          <Route
            path="/orders-details/:orderId"
            element={<AdminOrderdetail />}
          />

          <Route path="/products" element={<ProductsTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
