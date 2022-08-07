import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Bookings from "./pages/Bookings";
import ConfirmDetails from "./pages/DeleteBooking";
import HotelDetails from "./pages/HotelDetails";
import HotelSearches from "./pages/HotelSearch";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

class AppInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {
        destination: '',
        destination_uid: '',
        checkInDay: '',
        checkOutDay: '',
        rooms: '',
        adults: '',
        children: ''
      },
      sortParams: {
        price: 500,
        rating: 0
      }
    }
  }

  updateQueryParams = (updateDict) => {
    this.setState({queryParams: {
      ...this.state.queryParams,
      ...updateDict
    }}, () => console.log(this.state.queryParams));
  }

  updateSortParams = (updateDict) => {
    this.setState({sortParams: {
      ...this.state.sortParams,
      ...updateDict
    }});
  }
  
  render() {
    return <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={
          <HotelSearches updateQueryParams={this.updateQueryParams} 
                         updateSortParams={this.updateSortParams}
                         queryParams={this.state.queryParams}
                         sortParams={this.state.sortParams}/>
        } />
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
