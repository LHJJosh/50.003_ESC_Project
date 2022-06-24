import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../Navbar";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default Layout;