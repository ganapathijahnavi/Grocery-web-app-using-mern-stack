import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StyledNavbar, StyledNavbarBrand } from './styledComponents';

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const checkAuthStatus = () => {
    const userToken = localStorage.getItem("jwtToken");
    const adminToken = localStorage.getItem("adminJwtToken");
    const storedName = localStorage.getItem("userName");

    console.log(localStorage.getItem("userName")); 

    setIsAdmin(!!adminToken);
    setIsLoggedIn(!!userToken || !!adminToken);
    setUsername(storedName || "");
  };

  useEffect(() => {
    checkAuthStatus();

    window.addEventListener("login", checkAuthStatus);
    window.addEventListener("logout", checkAuthStatus);
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("login", checkAuthStatus);
      window.removeEventListener("logout", checkAuthStatus);
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("adminJwtToken");
      localStorage.removeItem("userName");

      setIsLoggedIn(false);
      setIsAdmin(false);
      setUsername("");

      window.dispatchEvent(new Event("logout"));
      navigate("/login");
    }
  };

  const userLinks = (
  <>
    <NavLink to="/" className="nav-link">Home</NavLink>
    <NavLink to="/shopping" className="nav-link">Shopping</NavLink> 
    <NavLink to="/my-cart" className="nav-link">MyCart</NavLink>
    <NavLink to="/my-orders" className="nav-link">Orders</NavLink>
    <NavLink to="/my-history" className="nav-link">History</NavLink>
  </>
);


  const adminLinks = (
    <>
      <NavLink to="/admin/dashboard" className="nav-link">Home</NavLink>
      <NavLink to="/admin/all-products" className="nav-link">Products</NavLink>
      <NavLink to="/admin/orders" className="nav-link">Orders</NavLink>
      <NavLink to="/admin/users" className="nav-link">Users</NavLink>
    </>
  );

  return (
    <StyledNavbar expand="lg" variant="light" fixed="top">
      <StyledNavbarBrand as={Link} to={isAdmin ? "/admin/dashboard" : "/"}>G-Mart</StyledNavbarBrand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto">
          {isAdmin ? adminLinks : userLinks}
        </Nav>
        <Nav>
          {!isLoggedIn ? (
            <NavLink to="/login" className="nav-link">Login / Signup</NavLink>
          ) : (
            <NavDropdown
              title={<span>👤 Hi, {username || "User"}</span>}
              id="profileDropdown"
              align="end"
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

export default Header;
