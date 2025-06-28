import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoaderSpinner from './loaderspinner';

const UserProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('userRole');

    if (token && role === 'user') {
      setIsAuthorized(true);
    } else {
      navigate('/login');
    }

    setLoading(false);
  }, [navigate]);

  if (loading) return <LoaderSpinner />;

  return isAuthorized ? <Component /> : null;
};

export default UserProtectedRoute;
