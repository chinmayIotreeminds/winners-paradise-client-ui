import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const customerDetails = localStorage.getItem('customerDetails');
    const isAuthenticated = customerDetails !== null && customerDetails !== undefined;
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
