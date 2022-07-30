import React, { Suspense } from "react";
import DisplayTop from "./pageComponents/displayTop";
import HotelQuery from '../components/hotelQueryCard';

import { HotelList } from "../components/hotelList";

class HotelSearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {
        destination_uid: '',
        checkInDay: '',
        checkOutDay: '',
        rooms: '',
      },
      sortParams: {
        price: 1000,
        rating: 0
      }
    }
  }

  updateQueryParams = (updateDict) => {
    this.setState({queryParams: {
      ...this.state.queryParams,
      ...updateDict
    }});
  }

  updateSortParams = (updateDict) => {
    this.setState({sortParams: {
      ...this.state.sortParams,
      ...updateDict
    }});
  }

  render() {
    return <DisplayTop>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
          
          <HotelQuery sx={{marginRight: 10}} 
                      className='hotelQuery' 
                      updateQueryParams={this.updateQueryParams}
                      updateSortParams={this.updateSortParams}/>
          <HotelList className='hotelList' 
                     queryParams={this.state.queryParams}
                     sortParams={this.state.sortParams}/>
        
      </div>
    </DisplayTop>;
  }
}

export default HotelSearches;