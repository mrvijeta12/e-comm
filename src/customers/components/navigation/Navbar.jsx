"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { navigationData } from "../../../config/Navbar/navbar.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthModel from "../Auth/AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../State/Auth/Action";

const token = localStorage.getItem("token");
// console.log(token);

const Navbar = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [openMonMenu, setOpenMobMenu] = useState(false);
  const [navdropdownOpen, setNavdropdownOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const authref = useRef(null);
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // console.log(open);

  //! login avater
  useEffect(() => {
    function handleAvatarDropdown(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }
    window.addEventListener("mousedown", handleAvatarDropdown);
    return () => window.removeEventListener("mousedown", handleAvatarDropdown);
  }, []);

  useEffect(() => {
    if (location.pathname) {
      setDropdown(false);
    }
  }, [location.pathname]);

  //! url set

  function handleClick(category, section, item) {
    setNavdropdownOpen(false);
    navigate(`/${category.id}/${section.id}/${item.id}`);
  }

  function handleOpen() {
    navigate("/login", {
      state: { background: location }, // save current page
    });
  }

  // useEffect(() => {
  //   setOpen(false);
  // }, [location.pathname]);

  function handleLogout() {
    dispatch(logout());
  }

  // useEffect(() => {
  //   if (location.pathname === "/login" || location.pathname === "/register") {
  //     setOpenAuthModel(true);
  //   } else {
  //     setOpenAuthModel(false);
  //   }
  // }, [location.pathname]);

  return (
    <div className="bg-white">
      {/*  //!Mobile menu */}
      <Dialog
        open={openMonMenu}
        onClose={setOpenMobMenu}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpenMobMenu(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5 cursor-pointer" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6 " />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigationData.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigationData?.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li
                              key={item.name}
                              className="flow-root -m-2 mb-2 block p-2 text-gray-500"
                              onClick={() => {
                                handleClick(category, section, item);
                                setOpenMobMenu(false);
                              }}
                            >
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigationData.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div> */}

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                >
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create account
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/*  //!Mobile menu end */}
      <header className="fixed top-0 z-50 bg-white  w-full ">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border border-red-50"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* //! bar for mobile view nav open  */}
              <button
                type="button"
                onClick={() => setOpenMobMenu(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5 cursor-pointer" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6 " />
              </button>
              {/* //!Logo */}
              <div className=" flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt={navigationData.logo.alt}
                    src={navigationData.logo.src}
                    className="w-[150px]"
                  />
                </Link>
              </div>
              {/* Flyout menus */}
              {/* //! desktop */}
              {/* //! category menu (women men)  */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch ">
                <div className="flex h-full space-x-8">
                  {navigationData.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex ">
                        <PopoverButton
                          className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600 cursor-pointer"
                          onClick={() => setNavdropdownOpen(true)}
                        >
                          {category.name}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                          />
                        </PopoverButton>
                      </div>
                      {/* //!  desktop panel */}
                      {navdropdownOpen && (
                        <PopoverPanel
                          transition
                          className=" z-50  absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                        >
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 top-1/2 bg-white shadow-sm"
                          />
                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                {/* <div className="col-start-2 grid grid-cols-2 gap-x-8 border border-red-500">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-base sm:text-sm"
                                    >
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                      />
                                      <a
                                        href={item.href}
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 z-10"
                                        />
                                        {item.name}
                                      </a>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div> */}
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p
                                        id={`${section.name}-heading`}
                                        className="font-medium text-gray-900"
                                      >
                                        {section.name}
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`${section.name}-heading`}
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        {section.items.map((item) => (
                                          <li
                                            key={item.name}
                                            className="flex hover:text-gray-800"
                                            onClick={() =>
                                              handleClick(
                                                category,
                                                section,
                                                item,
                                              )
                                            }
                                          >
                                            {item.name}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      )}
                    </Popover>
                  ))}
                  {/* //! company and store  */}
                  {/* {navigationData.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))} */}
                </div>
              </PopoverGroup>

              {/* //! avatar part  */}
              <div className="ml-auto flex items-center">
                {auth?.user?.firstName ? (
                  <div className="flex lg:ml-6 relative">
                    <div
                      className="relative rounded-full bg-violet-600 text-white font-extrabold p-3 h-10 w-10 flex items-center justify-center"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <h4>{auth?.user?.firstName?.[0]?.toUpperCase()}</h4>
                    </div>
                    {dropdown && (
                      <ul
                        className="absolute top-10 right-0 z-50 px-2 py-3 space-y-2 min-w-[100px] bg-white shadow-lg rounded-lg border border-gray-400 min-w-[150px]"
                        ref={avatarRef}
                      >
                        {/* <li className=" hover:border-b hover:border-b-gray-400 ">
                          <Link>Profile</Link>
                        </li> */}
                        <li className=" hover:border-b hover:border-b-gray-400 ">
                          <Link to="/orders">My Orders</Link>
                        </li>
                        <li className=" hover:border-b hover:border-b-gray-400">
                          <Link onClick={handleLogout}>Log Out</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : !token ? (
                  <div className=" flex flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                    >
                      Sign in
                    </button>
                    {/* <span aria-hidden="true" className="h-6 w-px bg-gray-200" /> */}
                  </div>
                ) : null}
                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a>
                </div> */}
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.cart?.cartItems?.length || 0}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
