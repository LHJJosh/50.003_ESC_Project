import React, { Suspense } from "react";
import DisplayTop from "./pageComponents/displayTop";
import HotelQuery from '../components/hotelQueryCard';

import { HotelList } from "../components/hotelList";

class HotelSearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      checkInDay: '',
      checkOutDay: '',
      rooms: 0,
      adults: '',
      children: ''
    }
  }

  updateQuery = (updateDict) => {
    this.setState(updateDict);
  }

  render() {
    return <DisplayTop>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
          
          <HotelQuery sx={{marginRight: 10}} className='hotelQuery' updateQuery={this.updateQuery}/>
          <HotelList className='hotelList' query={this.state}/>
        
      </div>
    </DisplayTop>;
  }
}

export default HotelSearches;