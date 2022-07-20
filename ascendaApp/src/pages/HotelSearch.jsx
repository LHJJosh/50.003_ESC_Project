import React from 'react';
import { HotelList } from '../components/hotelList';
import DisplayTop from "./pageComponents/displayTop";
import HotelQuery from '../components/hotelQueryCard';

import './styles.css'


function HotelSearches() {
    return (
        
    <DisplayTop>
        <HotelQuery className='hotelQuery'/>
        <HotelList className='hotelList'/>
    </DisplayTop>

    );
}

export default HotelSearches;