import React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Suspense } from "react";

import HotelListItem from './hotelListItem.js'

import "./styles.css";

const HotelListCard = React.lazy(() => import("./hotelListCard.js"));

class HotelListInternals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelList: [],
      hotels: new Map()
    }
  }

  updateHotelInfo = async (queryUrl) => {
    if (typeof queryUrl !== 'undefined') {
      console.log(queryUrl);

      let hotelRes = await axios.get(`/api/hotels${queryUrl}`)
                                .catch((err) => console.log(err));
      this.state.hotels.clear();
      await hotelRes.data.forEach(data => {
        this.state.hotels.set(data['id'], {
          ...data,
          price: Number.MAX_VALUE
        });
      });
      
      let priceRes = await axios.get(`/api/hotelPrice${queryUrl}`)
                                .catch((err) => console.log(err));
      priceRes.data.hotels.forEach(data => {
        if (this.state.hotels.has(data['id'])) {
          this.state.hotels.set(data['id'], {
            ...this.state.hotels.get(data['id']),
            ...data
          });
        }
      });

      this.refreshList();
    }
  }

  refreshList = () => {
    let newHotelList = [];
    this.state.hotels.forEach(data => {
      newHotelList.push(data)
    })

    newHotelList = newHotelList.filter(
      item => item.price < this.props.sortParams.price || item.price === Number.MAX_VALUE)
    newHotelList = newHotelList.filter(
      item => item.rating >= this.props.sortParams.rating)
    newHotelList.sort((a, b) => a.price - b.price);
    this.setState({hotelList: newHotelList});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryParams !== this.props.queryParams) {
      this.updateHotelInfo(this.buildQuery());
    }
    if (prevProps.sortParams !== this.props.sortParams) {
      this.refreshList();
    }
  }

  buildQuery() {    
    let queryUrl = '';
    let query = this.props.queryParams;
    if (query.destination_uid !== '' && 
      query.checkInDay !== '' &&
      query.checkOutDay !== '' &&
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
    let query = this.props.queryParams;
    if (query.destination !== "")
      queryUrl += `?destination=${query.destination}`
    if (query.rooms !== "")
      queryUrl += `&rooms=${query.rooms}`
    if (query.rating !== "")
      queryUrl += `&rating=${query.rating}`
    if (query.price !== "")
      queryUrl += `&price=${query.price}`
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
                         hotelPrice={hotel.price}
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