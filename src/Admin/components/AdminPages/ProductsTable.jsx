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
        backgroundColor: "#111F35",
        color: "white",
      }}
    >
      <CardHeader title="All Products" />
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#111F35",
          color: "white",
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
                Color
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Category
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Price
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Quantity
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminProducts.adminProducts?.content?.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleEdit(item._id)}
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
                <TableCell align="left" sx={{ color: "white" }}>
                  <DeleteSweepIcon
                    className="cursor-pointer text-violet-500"
                    onClick={() => handleDelete(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //! pagination  */}
      <section className="w-full px=[3.6rem]">
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
