import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {
  const userDetails = useSelector((state) => state?.userDetails);

  if (userDetails) {
    return <Outlet />;
  }
  return <Navigate to='/login' replace />;
};

export default UserPrivateRoute;
