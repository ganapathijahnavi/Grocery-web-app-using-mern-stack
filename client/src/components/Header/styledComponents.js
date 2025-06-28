import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';



export const StyledNavbar = styled(Navbar)`
  background-color: #e8f5e9;
  padding: 10px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  z-index: 1000;

  .nav-link {
    color: #2e7d32 !important;
    font-weight: 500;
    margin-right: 15px;
    transition: color 0.3s ease;

    &:hover {
      color: #1b5e20 !important;
    }
  }

  .navbar-toggler {
    border-color: #2e7d32;
  }

  .dropdown-menu {
    background-color: #f1f8e9;
  }

  .dropdown-item {
    color: #2e7d32;
  }

  .dropdown-item:hover {
    background-color: #c8e6c9;
    color: #1b5e20;
  }
`;

export const StyledNavbarBrand = styled(Navbar.Brand)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #2e7d32 !important;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: #1b5e20 !important;
  }
`;
