import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import { HotelListItem } from './hotelListItem.js'
import { HotelListCard } from './hotelListCard.js'
import { HotelDropdown } from './hotelDropdown.js'

import "./styles.css";

class HotelListInternal extends React.Component {
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
        <HotelListCard hotelName='Studio M Hotel'
                      hotelImage={require('../../assets/cardmedia_hotel1.jpg')}
                      hotelAddress='3 Nanson Road'
                      hotelPrice='450'
                      hotelDeal='1 for 1 ??!?'/>
        
        <Divider variant='inset' component='li' />
        <HotelListCard hotelName='Park Hotel Clarke Quay'
                      hotelImage={require('../../assets/cardmedia_hotel2.jpg')}
                      hotelAddress='1 Unity Street'
                      hotelPrice='302'
                      hotelDeal='2 for 1 LOL'/>
        
        <Divider variant='inset' component='li' />
        <HotelListCard hotelName='Aqueen Hotel Paya Lebar'
                      hotelImage={require('../../assets/cardmedia_hotel3.jpg')}
                      hotelAddress='33 Jalan Afifi'
                      hotelPrice='192'
                      hotelDeal='3 for 1 :O'/>
      </List>
    </div>
  }
}

export const HotelList = HotelListInternal;