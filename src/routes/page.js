import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import Signup from "../pages/Authorization/signup";
import OtpVerification from '../pages/Authorization/otpVerification';
import HomePage from '../pages/Home/page';
import Profile from '../pages/Profile/myProfile';
import Notifications from '../pages/Notifications/listNotifications';
import ListInvestments from '../pages/Investments/listInvestments';
import Payouts from '../pages/Payouts/payouts';
import Enquiry from '../pages/Enquiry/page';
import Catalogs from '../pages/Catalog/page';
import Kyc from '../pages/Kyc/kyc';

const routes = [
  { path: "/", element: <OtpVerification /> },
  { path: "/register", element: <Signup /> },
  { path: "/homepage", element: <HomePage /> },
  { path: "/my-profile", element: <Profile /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/my-investments", element: <ListInvestments /> },
  { path: "/payouts", element: <Payouts /> },
  { path: "/enquiry", element: <Enquiry /> },
  { path: "/catalogs", element: <Catalogs /> },
  { path: "/kyc", element: <Kyc /> },
];

function RouterPage() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}
export default RouterPage;