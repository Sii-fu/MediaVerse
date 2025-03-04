import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LandingPage2 from "./component/landingpage/LandingPage.jsx";
import LandingPage from "./component/LandingPage.jsx";
import Navbar from "./component/user/common/Navbar.jsx";
import ScrollToTop from "./component/user/common/ScrollToTop.jsx";
import Search from "./component/user/search/Search.jsx";
import HomeUser from "./component/user/home/Home.jsx";
import Discussion from "./component/user/discussion/Discussion.jsx";
import Mylist from "./component/user/mylist/Mylist.jsx";
import Merch from "./component/user/merch/Merch.jsx";
import ProfileUser from "./component/user/profile/ProfilePage.jsx";
import Cart from "./component/user/merch/Cart.jsx";
import UserOrder from "./component/user/merch/UserOrder.jsx";
import ProductSection from "./component/user/merch/ProductSection.jsx";
import ProductDetails from "./component/user/merch/ProductDetails.jsx";
import MovieDetailsPage from "./component/user/movie/MovieDetailsPage.jsx";
import CompanySection from "./component/user/company/CompanySection.jsx";
import CompanyDetailsPage from "./component/user/company/CompanyDetailsPage.jsx";
import Music from "./component/user/music/Music.jsx";
import BrowsePage from "./component/user/search/BrowsePage.jsx";
import MusicDetailsPage from "./component/user/music/MusicDetails.jsx";
import MusicSearch from "./component/user/music/MusicSearch.jsx";

import LayoutUser from "./component/Layout/LayoutUser.jsx";
import LayoutAdmin from "./component/Layout/LayoutAdmin.jsx";
import LayoutCompany from "./component/Layout/LayoutCompany.jsx";

import HomeAdmin from "./component/admin/home/Home.jsx";
import UserList from "./component/admin/user/UserList.jsx";
import CompanyList from "./component/admin/company/CompanyList.jsx";
import MerchandiserList from "./component/admin/merch/MerchandiserList.jsx";
import AddRole from "./component/admin/role/AddRole.jsx";
import ViewRole from "./component/admin/role/ViewRole.jsx";
import ProfileAdmin from "./component/admin/profile/ProfilePage.jsx";
import Report from "./component/admin/report/Report.jsx";

import HomeCompany from "./component/company/home/Home.jsx";
import DashboardCompany from "./component/company/dashboard/Dashboard.jsx";
import DisscussionCompany from "./component/company/discussion/DiscussionCompany.jsx";
import Review from "./component/company/review/Review.jsx";
import MediaForm from "./component/company/mediaform/MediaForm.jsx";
import CompanyMovieDetailsPage from "./component/company/movie/MovieDetailsPage.jsx";
import CompanyCollaborate from "./component/company/collaborate/CompanyCollaborate.jsx";
import CollabDetailsCompany from "./component/company/collaborate/CollabDetails.jsx";
import ProfileCompany from "./component/company/profile/ProfilePage.jsx";
import DiscussionCompanyDetails from "./component/company/discussion/DiscussionCompanyDetails.jsx";



import Login from "./component/Login.jsx";
import Registration from "./component/Registration/Registration.jsx";
import CompanyRegistration from "./component/Registration/CompanyRegistration.jsx";
import UserRegistration from "./component/Registration/UserRegistration.jsx";

import "./App.css";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleCancelItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (product) => {
    alert("Item added to cart!");
    setCartItems([...cartItems, product]);
  };

  const handleConfirmOrder = () => {
    alert("Order confirmed!");
    setCartItems([]);
  };

  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_Id");
    const storedUserType = localStorage.getItem("userType");
    const storedUsername = localStorage.getItem("username");
    setUserType(storedUserType);
    setUsername(storedUsername);

    console.log(
      "userType:------------------",
      localStorage.getItem("userType")
    );
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="container">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LandingPage2/>} />
          <Route path="/Login" element={<Login setUserType={setUserType} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration/user" element={<UserRegistration />} />
          <Route
            path="/registration/company"
            element={<CompanyRegistration />}
          />

          {/* Protected routes based on user type */}
          {userType === "user" && (
            <Route element={<LayoutUser />}>
              {/* User-specific routes */}
              <Route path="/:username/home" element={<HomeUser />} />
              <Route path="/:username/search" element={<Search />} />
              <Route path="/:username/discussion" element={<Discussion />} />
              <Route path="/:username/mylist" element={<Mylist />} />
              {/* <Route path="/:username/merch" element={<Merch products={products} />} /> */}
              <Route path="/:username/profile" element={<ProfileUser />} />
              <Route path="/:username/merch/cart" element={<Cart />} />
              <Route path="/:username/merch/order" element={<UserOrder />} />
              <Route path="/:username/merch" element={<ProductSection />} />
              <Route
                path="/:username/product/:productId"
                element={<ProductDetails />}
              />
              <Route
                path="/:username/media/:mediaID"
                element={<MovieDetailsPage />}
              />
              <Route path="/:username/company" element={<CompanySection />} />
              <Route
                path="/:username/company/:companyID"
                element={<CompanyDetailsPage />}
              />
              <Route path="/:username/music" element={<Music />} />
              <Route path="/:username/browse/:genre" element={<BrowsePage />} />
              {/* /:movieId */}
              <Route
                path="/:username/music/:musicID"
                element={<MusicDetailsPage />}
              />
              <Route path="/:username/musicsearch" element={<MusicSearch />} />
            </Route>
          )}

          {userType === "admin" && (
            <Route element={<LayoutAdmin />}>
              <Route path="/:username/home" element={<HomeAdmin />} />
              <Route path="/:username/report" element={<Report />} />
              <Route path="/:username/userlist" element={<UserList />} />
              <Route path="/:username/companylist" element={<CompanyList />} />
              <Route
                path="/:username/merchandiserlist"
                element={<MerchandiserList />}
              />
              <Route path="/:username/addrole" element={<AddRole />} />
              <Route path="/:username/viewrole" element={<ViewRole />} />
              <Route path="/:username/profile" element={<ProfileAdmin />} />
            </Route>
          )}

          {userType === "merchandiser" && (
            <Route element={<LayoutMerch />}>
              <Route path="/:username/home" element={<HomeMerch />} />
              <Route path="/:username/profile" element={<ProfileMerch />} />
              <Route path="/:username/productform" element={<ProductForm />} />
              <Route
                path="/merchandiser/:username/product/:productID"
                element={<MerchProductDetailsPage />}
              />
              <Route
                path="/:username/merchandiser/collaborate"
                element={<MerchandiserCollaborate />}
              />
              <Route
                path="/:username/merchandiser/collaborate/details/:com_id"
                element={<CollabDetailsMerch />}
              />
              <Route
                path="/:username/merchandiser/orders"
                element={<MerchOrder />}
              />
            </Route>
          )}

          {userType === "company" && (
            <Route element={<LayoutCompany />}>
              <Route path="/:username/home" element={<DashboardCompany />} />
              <Route path="/:username/mymedia" element={<HomeCompany />} />
              <Route path="/:username/discussion" element={<DisscussionCompany />} />
              <Route path="/:username/discussion/:id" element={<DiscussionCompanyDetails />} />
              <Route path="/:username/review" element={<Review />} />
              <Route path="/:username/mediaform" element={<MediaForm />} />
              <Route path="/:username/profile" element={<ProfileCompany />} />
              <Route
                path="/company/:username/media/:mediaID"
                element={<CompanyMovieDetailsPage />}
              />
              <Route
                path="/:username/company/collaborate"
                element={<CompanyCollaborate />}
              />
              <Route
                path="/:username/company/collaborate/details/:mer_id"
                element={<CollabDetailsCompany />}
              />
            </Route>
          )}
          {/* Fallback route if userType is not set */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
