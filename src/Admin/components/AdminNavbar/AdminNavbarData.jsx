import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const adminNavbarData = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: <InventoryIcon />,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCartIcon />,
  },
  {
    label: "Customers",
    path: "/admin/customers",
    icon: <PeopleIcon />,
  },
  {
    label: "Add Product",
    path: "/admin/product/create",
    icon: <AddBoxIcon />,
  },
];
