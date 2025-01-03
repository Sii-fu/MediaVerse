import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../company/common/Navbar.jsx";
import Footer from "../user/common/Footer.jsx";
import Topper from "../company/common/Topper.jsx";
import "./LayoutCompany.css";

const Layout = () => {
  return (
    <div className="company-layout0">
      <div className="company-layout">
        <NavBar />
        <div className="company-content-container">
          <Topper />
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
