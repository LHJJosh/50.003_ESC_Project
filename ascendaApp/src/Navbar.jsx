import React from "react";
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
	return (
      <nav className="navbar navbar-expand-md navbar-light sticky-top" 	role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/home">Brand</a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to="/" className="nav-link">
                  Index Page
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/bookings" className="nav-link">
                  Bookings
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>
  )
};

export default Navbar;