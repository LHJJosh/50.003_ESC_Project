import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import axios from "axios";

import { HotelListItem } from './hotelListItem.js'
import { HotelListCard } from './hotelListCard.js'
import { HotelDropdown } from './hotelDropdown.js'

import "./styles.css";

class HotelListInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelList: []
    }
  }

  refreshList = (queryUrl) => {
    axios
      .get(queryUrl)
      .then((res) => this.setState({ hotelList: res.data }, () => console.log(queryUrl)))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.refreshList(this.buildQuery());
    }
  }

  buildQuery() {
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
    return this.state.hotelList.map((hotel) => 
      <div>
        <HotelListCard className='HotelListCard'
                      hotelName={hotel.name}
                      hotelImage={require('../../assets/cardmedia_hotel1.jpg')}
                      hotelAddress={hotel.address}
                      hotelPrice={hotel.price}
                      hotelDeal='1 for 1 ??!?'
                      hotelId={hotel.id}/>    
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

export const HotelList = HotelListInternal;