import React from 'react';
import { HotelList } from '../components/hotelList';
import DisplayTop from "./pageComponents/displayTop";
import HotelQuery from '../components/hotelQueryCard';



class HotelSearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      checkInDay: '',
      checkOutDay: '',
      rooms: '',
      adults: '',
      children: ''
    }
  }

  updateQuery = (updateDict) => {
    this.setState(updateDict);
  }

  render() {
    return <DisplayTop>
      <HotelQuery className='hotelQuery' updateQuery={this.updateQuery}/>
      <HotelList className='hotelList' query={this.state}/>
    </DisplayTop>;
  }
}

export default HotelSearches;