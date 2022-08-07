import React, { useEffect, useState } from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import HotelListItem from './hotelListItem.js'

import "./styles.css";

const HotelListCard = React.lazy(() => import("./hotelListCard.js"));


class HotelListInternals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: [],
      hotelList: [],
      hotels: new Map(),
      updatedHotelList: [],
      hasMore: true,
      perPage: 10
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
        } else {
          console.log('no data')
        }
      });

      this.state.hotelList = Array.from(this.state.hotels, ([k, v]) => v);
      this.refreshList();
    }
  }

  refreshList = () => {
    this.state.filteredList = this.state.hotelList.filter(item => 
      (item.price < this.props.sortParams.price || item.price === Number.MAX_VALUE) &&
      item.rating >= this.props.sortParams.rating
    );
    this.state.filteredList.sort((a, b) => a.price - b.price);
    console.log(this.state.filteredList);
    this.setState({updatedHotelList: this.state.filteredList.slice(0,10)});
  }

  componentDidMount() {
    this.updateHotelInfo(this.buildQuery());
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
      sessionStorage.setItem("queryUrl", queryUrl)
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
  
  loadProducts = () => {   
    setTimeout(() => {       
      let dataLength = this.state.updatedHotelList.length;
      let nextSet = this.state.filteredList.slice(dataLength, dataLength + this.state.perPage);
      this.state.updatedHotelList.push(...nextSet);
      this.setState({updatedHotelList: this.state.updatedHotelList});
    }, 1000);
  };

  render() {
    return <div className='hotelList' id='hotelList'>
      <InfiniteScroll
        className='infiniteScroll'
        dataLength={this.state.updatedHotelList.length}
        next={this.loadProducts}
        hasMore={this.state.hasMore}>
        <List sx={{ bgcolor: 'background.paper', padding: '0px'}}>
        
        {this.state.updatedHotelList.map((hotel, index) => 
          <div key={index}>
            <Suspense fallback={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <h5>Loading</h5>
              </div>
            }>
              <HotelListCard className='HotelListCard'
                             hotelName={hotel.name}
                             hotelImage={`${hotel.cloudflare_image_url}/${hotel.id}/i1.jpg`}
                             hotelAddress={hotel.address}
                             hotelPrice={hotel.price}
                             hotelId={hotel.id}
                             hotelRating={hotel.rating}
                             hotelDistance={hotel.distance}
                             destinationId={this.props.queryParams.destination_uid}
                             checkInDay={this.props.queryParams.checkInDay}
                             checkOutDay={this.props.queryParams.checkOutDay}
                             rooms={this.props.queryParams.rooms}/> 
            </Suspense>
            <Divider variant='inset' component='li' />
          </div>
        )}
        
        </List>
      </InfiniteScroll>
    </div>
  }
}

export const HotelList = HotelListInternals;
   