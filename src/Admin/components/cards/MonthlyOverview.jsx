import React, { useEffect, useMemo } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../State/Admin/AdminOrder/AdminOrderAction";
import { findAdminProducts } from "../../../State/Admin/AdminProduct/AdminProductAction";
import { getAllUsers } from "../../../State/Auth/Action";

const data = [
  // {
  //   label: "Sales",
  //   value: "245K",
  //   icon: <ShoppingCartIcon />,
  //   bg: "#3B82F6", // blue
  // },
  {
    label: "Customers",
    value: "1.2K",
    icon: <PeopleIcon />,
    bg: "#22C55E", // green
  },
  {
    label: "Products",
    value: "320",
    icon: <InventoryIcon />,
    bg: "#F97316", // orange
  },
  {
    label: "Revenue",
    value: "$12.5K",
    icon: <AttachMoneyIcon />,
    bg: "#A855F7", // purple
  },
];

const MonthlyOverview = () => {
  const dispatch = useDispatch();
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
    dispatch(getAllOrder());
    dispatch(getAllUsers());
  }, []);

  const adminProducts = useSelector((store) => store.adminProducts);
  const adminOrders = useSelector((store) => store.adminOrders);
  const auth = useSelector((store) => store.auth);
  console.log("adminProducts", adminProducts);
  const total = useMemo(() => {
    return adminOrders.orders?.reduce(
      (acc, curr) => acc + curr.totalDiscountedPrice,
      0,
    );
  }, [adminOrders]);

  const monthlyCardData = useMemo(() => {
    return [
      {
        label: "Customers",
        value: auth.users?.length,
        icon: <PeopleIcon />,
        bg: "#22C55E", // green
      },
      {
        label: "Products",
        value: adminProducts.adminProducts?.totalProducts,
        icon: <InventoryIcon />,
        bg: "#F97316", // orange
      },
      {
        label: "Revenue",
        value: total > 1000 ? (total / 1000).toFixed(3) + "k" : total || 0,
        icon: <AttachMoneyIcon />,
        bg: "#A855F7", // purple
      },
    ];
  }, [adminOrders, adminProducts, auth]);

  const formatted = total > 1000 ? (total / 1000).toFixed(3) + "k" : total;
  // console.log(formatted);

  return (
    <div className="flex flex-col w-full h-full bg-[#111F35] text-white  p-4 shadow-md rounded-md">
      <div className="mb-8 flex justify-between">
        <div>
          <h3 className=" text-xl mb-3">Monthly Overview</h3>
          {/* <h4 className="text-sm font-semibold">
            Total 65% growth of this month
          </h4> */}
        </div>
        {/* <div>
          <MoreVertIcon />
        </div> */}
      </div>
      <div className="flex gap-4">
        {monthlyCardData.map((item) => (
          <div
            key={item.label}
            className="flex-1 flex items-center gap-3  rounded-lg  "
          >
            <div
              className=" rounded-md p-2 h-10 w-10 flex items-center justify-center text-white"
              style={{ backgroundColor: item.bg }}
            >
              {item.icon}
            </div>

            <div>
              <h6 className="font-medium text-sm">{item.label}</h6>
              <h3 className="text-xl font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyOverview;
