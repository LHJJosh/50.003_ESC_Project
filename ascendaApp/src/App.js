import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Bookings from "./pages/Bookings";
import HomePage from "./components/homePage";
import { HotelList } from './components/hotelList';
import { HotelSearch } from './components/hotelSearch';
import { DetailsPage } from "./components/hotelDetails";

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";


class AppInternal extends React.Component {
  render() {
    return <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          {/* <Route index element={<HomePage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="listings" element={<HotelList />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="details" element={<DetailsPage />} />
          <Route path="*" element={<NoPage />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  }
}

export const App = AppInternal;
