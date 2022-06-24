import React from "react";
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const tabs = [{
  route: "/home",
  icon: faHome,
  label: "Home"
},
{
  route: "/bookings",
  icon: faCreditCard,
  label: "Bookings"
},
/*{
  route: "/search",
  icon: faSearch,
  label: "Search"
},
{
  route: "/login",
  icon: faUserCircle,
  label: "Login"
}*/]

const Navbar = (props) => {
	return (
    <div>
      {/* Top Bar*/}
      <nav className="navbar navbar-expand-md navbar-light sticky-top" 	role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Home</a>
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

      {/* Bottom Tab Navigator*/}
      <nav className="navbar fixed-bottom navbar-light" role="navigation">
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            {
              tabs.map((tab, index) =>(
                <NavItem key={`tab-${index}`}>
                  <NavLink to={tab.route} className="nav-link" activeClassName="active">
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      <FontAwesomeIcon size="lg" icon={tab.icon}/>
                      <div>{tab.label}</div>
                    </div>
                  </NavLink>
                </NavItem>
              ))
            }
          </div>
        </Nav>
      </nav>
    </div>
  )
};

export default Navbar;