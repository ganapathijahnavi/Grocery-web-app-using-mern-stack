import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('userRole');

    if (token && role === 'admin') {
      setIsAuthorized(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return isAuthorized ? <Component /> : null;
};

export default AdminProtectedRoute;
