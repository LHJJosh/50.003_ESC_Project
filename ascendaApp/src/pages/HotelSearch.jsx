import React, { Suspense } from "react";
//import { HotelList } from '../components/hotelList';
import DisplayTop from "./pageComponents/displayTop";
import HotelQuery from '../components/hotelQueryCard';


const HotelList = React.lazy(() => import("../components/hotelList"));
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
        alignItems: 'center',
        justifyContent: 'center',
        }}>
          
        
        <HotelQuery className='hotelQuery' updateQuery={this.updateQuery}/>
        <Suspense fallback={<h1>Loading hotel...</h1>}>
          <HotelList className='hotelList' query={this.state}/>
          
        </Suspense>
      </div>
    </DisplayTop>;
  }
}

export default HotelSearches;