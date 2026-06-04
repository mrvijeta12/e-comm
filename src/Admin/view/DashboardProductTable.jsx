import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Avatar from "@mui/material/Avatar";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {
  deleteProductById,
  findAdminProducts,
} from "../../State/Admin/AdminProduct/AdminProductAction";

const DashboardProductTable = () => {
  const dispatch = useDispatch();
  const { adminProducts } = useSelector((store) => store);
  // console.log(adminProducts);

  useEffect(() => {
    const data = {
      category: "",
      color: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 1,
      pageSize: 10,
      stock: "",
    };
    dispatch(findAdminProducts(data));
  }, []);

  function handleDelete(id) {
    dispatch(deleteProductById(id));
  }
  return (
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
        title="Recent Products"
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
          pb: 5,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="recent products table">
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
              <TableCell align="left">Color</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Quantity</TableCell>
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
            {adminProducts.adminProducts?.content?.slice(0, 10).map((item) => (
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
                  <Avatar
                    src={item.imageUrl}
                    sx={{
                      width: 40,
                      height: 40,
                      "& img": {
                        objectFit: "cover",
                        objectPosition: "top",
                      },
                    }}
                  />
                </TableCell>

                <TableCell align="left">{item.title}</TableCell>

                <TableCell align="left">{item.color}</TableCell>

                <TableCell align="left">{item.category?.name}</TableCell>

                <TableCell align="left">₹{item.price}</TableCell>

                <TableCell align="left">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardProductTable;
