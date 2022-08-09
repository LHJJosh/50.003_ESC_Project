import React from "react";
import DisplayTop from "./pageComponents/displayTop";
import HotelQuery from '../components/hotelQueryCard';
import HotelList from "../components/hotelList";
// import { HotelForm } from "../components/hotelQueryCard/form";

class HotelSearches extends React.Component {
  render() {
    return <DisplayTop>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
          <HotelQuery sx={{marginRight: 10}} 
                      className='hotelQuery' 
                      updateQueryParams={this.props.updateQueryParams}
                      updateSortParams={this.props.updateSortParams}
                      queryParams={this.props.queryParams}
                      sortParams={this.props.sortParams}/>
          <HotelList className='hotelList' 
                     queryParams={this.props.queryParams}
                     sortParams={this.props.sortParams}
                     updateQueryParams={this.props.updateQueryParams}/>
        
      </div>
    </DisplayTop>;
  }
}

export default HotelSearches;

