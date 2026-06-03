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
        backgroundColor: "#111F35",
        color: "white",
        height: "100%",
      }}
    >
      <CardHeader title="Recent Products" />
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
          sx={{ minWidth: 650 }}
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
                Color
              </TableCell>

              <TableCell
                align="left"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Category
              </TableCell>

              <TableCell
                align="left"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Price
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
            </TableRow>
          </TableHead>
          <TableBody>
            {adminProducts.adminProducts?.content?.slice(0, 10).map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Avatar
                    src={item.imageUrl}
                    sx={{
                      width: 40,
                      height: 40,
                      "& img": {
                        objectFit: "cover",
                        objectPosition: "top", // 👈 key line
                      },
                    }}
                  />
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {item.title}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {item.color}
                </TableCell>

                <TableCell align="left" sx={{ color: "white" }}>
                  {item.category?.name}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {item.price}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {item.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardProductTable;
