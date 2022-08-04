import React, { Suspense } from "react";
import DisplayTop from "./pageComponents/displayTop";
import HotelQuery from '../components/hotelQueryCard';

import { HotelList } from "../components/hotelList";
//import HotelForm from "../components/hotelQueryCard/form";
import { HotelForm } from "../components/hotelQueryCard/form";
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

  /*|| JSON.parse(localStorage.getItem('state'))
  componentDidMount() {
    const json = window.localStorage.getItem('destination_uid')
    const destination_uid = JSON.parse(json)
    this.setState({destination_uid: destination_uid })
  }
  componentDidUpdate(prevProps, prevStates){
    const json = JSON.stringify(this.state.queryParams.destination_uid)
    window.localStorage.setItem('destination_uid', json)
  }
  /*
  JSON.parse(localStorage.getItem('state')) || 
  useEffect= (() => {
    this.setState(JSON.parse(window.localStorage.getItem('state')));
  }, []);

  useEffect = (() => {
    window.localStorage.setItem('state', this.state);
  }, [this.state]);

  setState(state) {
    localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }*/

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

