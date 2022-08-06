import { useLocation } from 'react-router-dom'
import React from 'react';
import { HeaderCard } from './header';
import { DetailsCard } from './extraDetails';
import { RoomsCard } from './roomList';
import { MapsCard } from './mapView';
import axios from 'axios';

import './styles.css';

export function DetailsPage() {
  const location = useLocation();
  const [state, setState] = React.useState({
    id: "",
    address: "",
    latitude: "",
    longitude: "",
    name: "", 
    rating: "",
    description: "",
    amenities: "",
    image_details: {
      prefix: "",
      suffix: "",
      count: 0
    },
    cloudflare_image_url: "",
    queryParams: {
      hotel_id: location.state.hotelId,
      destination_id: location.state.destinationId,
      checkin: location.state.checkInDay,
      checkout: location.state.checkOutDay,
      guests: location.state.rooms
    }
  });

  function buildQueryInternalApi() {
    return `/api/getHotel/${location.state.hotelId}`;
  };

  function buildQuery() {
    return `/api/hotelDetail?hotel_id=${location.state.hotelId}`;
  }
  
  function refreshDetails(queryUrl) {
    axios
      .get(queryUrl)
      .then((res) => setState(res.data))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (location.state !== null && location.state.hotelId !== state.id) {
      let queryUrl = buildQuery();
      refreshDetails(queryUrl);
      console.log(state.queryParams);
    }
    else{
      console.log(location.state);
    }
  });

  return (
    <div className="detailsPage">
      <HeaderCard hotelName={state.name} 
                  hotelAddress={state.address} 
                  hotelImageUrl={state.cloudflare_image_url}
                  hotelImageCount={state.number_of_images}
                  hotelId={state.id}/>
      <DetailsCard detailsHeader="Hotel Overview" 
                   detailsText={state.description}/>
      <RoomsCard className='roomList'
                 queryParams={state.queryParams}/>
      <MapsCard hotelName={state.name}
                hotelAddress={state.address}
                hotelLat={state.latitude}
                hotelLng={state.longitude}/>
      <br/>
    </div>
  );
}