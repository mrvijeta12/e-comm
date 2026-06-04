import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ hideDrawer }) => {
  return (
    <header className="flex flex-col w-full h-[70] mb-4   bg-white text-gray-500 p-4 shadow-md rounded-md">
      <span>
        <MenuIcon onClick={hideDrawer} />
      </span>
    </header>
  );
};

export default Header;
