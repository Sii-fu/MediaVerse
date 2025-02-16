import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../admin/common/Navbar.jsx';
import Footer from '../user/common/Footer.jsx';
import Topper from '../admin/common/Topper.jsx';
import './LayoutAdmin.css';

const Layout = () => {
  return (
    <div className="admin-layout0">
       <Topper />
      <div className="admin-layout">
      <NavBar />
        <div className="admin-content-container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
