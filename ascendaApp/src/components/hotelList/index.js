import React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Suspense } from "react";

import HotelListItem from './hotelListItem.js'
import { HotelDropdown } from './hotelDropdown.js'

import "./styles.css";

const HotelListCard = React.lazy(() => import("./hotelListCard.js"));

class HotelListInternals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelList: []
    }
  }

  refreshList = (queryUrl) => {
    if (typeof queryUrl !== 'undefined') {
      axios
      .get(queryUrl)
      .then((res) => this.setState({ hotelList: res.data }, () => console.log(res.data)))
      .catch((err) => console.log(err));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.refreshList(this.buildQuery());
    }
  }

  buildQuery() {
    let queryUrl = '/api/hotels'
    let query = this.props.query;
    if (query.destination_uid !== '' && 
      query.checkin !== '' &&
      query.checkout !== '' &&
      query.rooms !== ''
    ) {
      queryUrl += `?destination_id=${query.destination_uid}`; // WD0M
      queryUrl += `&checkin=${query.checkInDay}`; // 2022-08-18
      queryUrl += `&checkout=${query.checkOutDay}`; // 2022-08-19
      queryUrl += `&guests=${query.rooms}`;
      return queryUrl
    }
  }

  buildQueryInternalApi() {
    let queryUrl = '/api/listHotels/';
    if (this.props.query.destination !== "")
      queryUrl += `?destination=${this.props.query.destination}`
    if (this.props.query.rooms !== "")
      queryUrl += `&rooms=${this.props.query.rooms}`
    if (this.props.query.reviewScore !== "")
      queryUrl += `&reviewScore=${this.props.query.reviewScore}`
    if (this.props.query.price !== "")
      queryUrl += `&price=${this.props.query.price}`
    return queryUrl
  }

  renderItems = () => {
    return this.state.hotelList.slice(0, 10).map((hotel) => 
      <div key={hotel.id}>
        <Suspense fallback={<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}}>
        <h5>Loading</h5>
      </div>}>
          <HotelListCard className='HotelListCard'
                        hotelName={hotel.name}
                        hotelImage={`${hotel.cloudflare_image_url}/${hotel.id}/i1.jpg`}
                        hotelAddress={hotel.address}
                        hotelPrice={100}
                        hotelId={hotel.id}
                        hotelRating={hotel.rating}
                        hotelDistance={hotel.distance}/> 
        </Suspense>  
        <Divider variant='inset' component='li' />
      </div>
    );
  };

  render() {
    

    return <div className='hotelList'>
      <div className='dropdownDiv'>
        <HotelDropdown/>
      </div>
      <List sx={{ bgcolor: 'background.paper', padding: '0px'}}>
        {/* <HotelListItem name='Cindy Baker'
                      primaryText='Oui Oui'
                      secondary='Sandra Adams'
                      secondaryText=" — Do you have Paris recommendations? Have you ever…"/> */}
        {this.renderItems()}
      </List>
    </div>
  }
}

export const HotelList = HotelListInternals;