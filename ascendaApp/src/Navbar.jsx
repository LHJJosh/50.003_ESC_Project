import React from "react";
import { Nav, NavItem} from 'reactstrap';
import { NavLink, Router } from 'react-router-dom';
import "./Navbarstyle.css"

const Navbar = (props) => {
	return (
      <nav className="navbar navbar-expand-md sticky-top" 	role="navigation">
        <div className="header"> {/*container-fluid*/}
            <a className="navbar-brand" href="#">ASCENDA</a>
            <Nav className="mr-auto">
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