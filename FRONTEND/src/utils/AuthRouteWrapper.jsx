// AuthRouteWrapper.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRouteWrapper = ({element}) => {
  const location = useLocation();
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  if (storedUserData) {
    return element;
  }else{ 
    return <Navigate to="/login" state={{ from: location.pathname }}/>; 
  }
};
export default AuthRouteWrapper;
