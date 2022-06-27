import React from 'react';
import { HotelSearch } from '../components/hotelSearch';
import { HotelList } from '../components/hotelList';
import DisplayTop from "./pageComponents/displayTop";

function HotelSearches() {
    return (
        
    <DisplayTop>
        <HotelSearch />
        <HotelList />
    </DisplayTop>

    );
}

export default HotelSearches;