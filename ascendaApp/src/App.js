import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Bookings from "./pages/Bookings";
import HotelDetails from "./pages/HotelDetails";
import Home from "./pages/Home";
import HotelSearches from "./pages/HotelSearch";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./Navbarstyle.css"

class AppInternal extends React.Component {
  render() {
    return <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hotelsearch" element={<HotelSearches />} />
        <Route path="hoteldetails" element={<HotelDetails />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  }
}

export const App = AppInternal;
