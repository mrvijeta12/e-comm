import React, { useState } from "react";
import { adminNavbarData } from "./AdminNavbar/AdminNavbarData";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
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
import UpdateProduct from "./AdminPages/UpdateProduct.jsx";
import Header from "./AdminPages/Header.jsx";
import AdminOrderDetail from "./AdminPages/AdminOrderdetail.jsx";

const Admin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(true);

  function hideDrawer() {
    setSideBarVisible(!sideBarVisible);
  }

  // console.log(sideBarVisible);

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "260px",
        py: 2,
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {adminNavbarData.map((item) => (
          <ListItem key={item.name} disablePadding>
            <NavLink
              to={item.path}
              end={item.path === "/admin"}
              className="w-full"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: "10px",
                    ...(isActive && {
                      backgroundColor: "#ede9fe",
                      color: "#7c3aed",
                      borderLeft: "4px solid #7c3aed",
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#7c3aed" : "#6b7280",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.label} />
                </ListItemButton>
              )}
            </NavLink>
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
    <div className="flex h-screen overflow-hidden bg-gray-100 p-4 gap-4">
      <CssBaseline />

      {/* Sidebar */}
      <div
        className={`
        ${sideBarVisible ? "w-[260px]" : "w-0"}
        flex-shrink-0
        overflow-hidden
        transition-all
        duration-300
      `}
      >
        <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200">
          {drawer}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-y-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <Header hideDrawer={hideDrawer} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/customers" element={<CustomerTable />} />
          <Route path="/orders" element={<OrderTable />} />
          <Route path="/products/:productId" element={<UpdateProduct />} />
          <Route
            path="/orders-details/:orderId"
            element={<AdminOrderDetail />}
          />
          <Route path="/products" element={<ProductsTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
