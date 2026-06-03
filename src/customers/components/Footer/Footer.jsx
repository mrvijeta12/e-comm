import React from "react";
import { NavLink } from "react-router-dom";
import { footerData } from "../../../Data/Footer/footer";

const Footer = () => {
  return (
    <div className="mt-10 px-4 lg:px-8 bg-black py-8">
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  text-white">
        {footerData &&
          footerData.map((nav, index) => (
            <div key={nav.title} className="mb-4 sm:text-center">
              <h6 className="text-xl font-bold mb-4">{nav.title}</h6>

              <ul className="flex flex-col sm:items-center ">
                {nav.item.map((link) => (
                  <NavLink
                    path={link.path}
                    key={link.title}
                    className="mb-2 hover:border-b hover:border-gray-400 w-fit"
                  >
                    {link.title}
                  </NavLink>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <div className="flex justify-center text-white">
        <p>All Right Reserved @ E-Comm</p>
      </div>
    </div>
  );
};

export default Footer;
