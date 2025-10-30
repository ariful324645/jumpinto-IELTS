import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Pagination></Pagination>
    </div>
  );
};

export default RootLayout;
