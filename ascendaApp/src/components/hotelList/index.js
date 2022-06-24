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

  refreshList = () => {
    axios
      .get('/api/getHotelView/')
      .then((res) => this.setState({ hotelList: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.refreshList();
    console.log(this.state.hotelList);
  }

  render() {
    const renderHotelList = this.state.hotelList.map((hotel) => 
      <div>
        <HotelListCard hotelName={hotel.name}
                      hotelImage={require('../../assets/cardmedia_hotel1.jpg')}
                      hotelAddress={hotel.address}
                      hotelPrice={hotel.price}
                      hotelDeal='1 for 1 ??!?'/>    
        <Divider variant='inset' component='li' />
      </div>
    );

    return <div className='hotelList'>
      <div className='dropdownDiv'>
        <HotelDropdown/>
      </div>

      <List sx={{ bgcolor: 'background.paper', padding: '0px'}}>
        {/* <HotelListItem name='Cindy Baker'
                      primaryText='Oui Oui'
                      secondary='Sandra Adams'
                      secondaryText=" — Do you have Paris recommendations? Have you ever…"/> */}
        { renderHotelList }
      </List>
    </div>
  }
}

export const HotelList = HotelListInternal;