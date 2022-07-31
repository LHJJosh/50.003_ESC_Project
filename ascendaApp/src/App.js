import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Bookings from "./pages/Bookings";
import ConfirmDetails from "./pages/DeleteBooking";
import HotelDetails from "./pages/HotelDetails";
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
        <Route index element={<HotelSearches />} />
        <Route path="hoteldetails" element={<HotelDetails />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="confirmationDetails" element={<ConfirmDetails />}/>
        <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  }
}

export const App = AppInternal;
