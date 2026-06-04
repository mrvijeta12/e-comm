import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAdminProducts } from "../../../State/Admin/AdminProduct/AdminProductAction";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Avatar from "@mui/material/Avatar";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { deleteProductById } from "../../../State/Admin/AdminProduct/AdminProductAction";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { adminProducts } = useSelector((store) => store);
  // console.log("adminProducts", adminProducts?.adminProducts?.totalPages);
  const navigate = useNavigate();
  const location = useLocation();

  const handelPaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("pageNumber", value);
    const query = searchParams.toString();
    navigate({ search: `${query}` });
  };

  const pageNumber =
    Number(new URLSearchParams(location.search).get("pageNumber")) || 1;

  // console.log(page);

  useEffect(() => {
    const data = {
      category: "",
      color: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: pageNumber,
      pageSize: 10,
      stock: "",
    };
    dispatch(findAdminProducts(data));
  }, [dispatch, pageNumber]);

  function handleDelete(id) {
    dispatch(deleteProductById(id));
  }

  function handleEdit(productId) {
    navigate(`/admin/products/${productId}`);
  }
  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        color: "#111827",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardHeader
        title="All Products"
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
        <Table sx={{ minWidth: 650 }} aria-label="all products table">
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
              <TableCell align="left">Delete</TableCell>
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
            {adminProducts.adminProducts?.content?.map((item) => (
              <TableRow
                key={item._id}
                hover
                onClick={() => handleEdit(item._id)}
                sx={{
                  cursor: "pointer",
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

                <TableCell align="left">
                  <DeleteSweepIcon
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <section className="w-full">
        <div className="px-4 py-5 flex justify-center">
          <Pagination
            color="secondary"
            count={adminProducts?.adminProducts?.totalPages}
            onChange={handelPaginationChange}
          />
        </div>
      </section>
    </Card>
  );
};

export default ProductsTable;
