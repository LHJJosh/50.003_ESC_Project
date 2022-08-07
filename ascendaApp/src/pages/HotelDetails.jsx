import React from 'react';
import { DetailsPage } from '../components/hotelDetails';
import DisplayTop from "./pageComponents/displayTop";

function HotelDetails(props) {
  return (
    <DisplayTop>
        <DetailsPage queryParams={props.queryParams}/>
    </DisplayTop>
  );
}

export default HotelDetails;