import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../Admin/components/Admin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Admin />} />
    </Routes>
  );
};

export default AdminRoutes;
