import React from "react";
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
	return (
      <nav className="nav" 	role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Ascenda</a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/hotelsearch" className="nav-link">
                  Hotel Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/hoteldetails" className="nav-link">
                  Hotel Details
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