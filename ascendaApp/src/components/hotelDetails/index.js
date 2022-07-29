import { useLocation } from 'react-router-dom'
import React from 'react';
import { HeaderCard } from './header';
import { DetailsCard } from './extraDetails';
import { RoomsCard } from './roomList';
import { MapsCard } from './mapView';
import axios from 'axios';

import './styles.css';

export function DetailsPage() {
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
    cloudflare_image_url: ""
  });
  const location = useLocation();

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
    }
  });

  //const myRef = useRef(null)
  //const executeScroll = () => myRef.current.scrollIntoView() 

  return (
    <div className="detailsPage">
      <HeaderCard hotelName={state.name} 
                  hotelAddress={state.address} 
                  hotelImageUrl={state.cloudflare_image_url}
                  hotelImageCount={state.number_of_images}
                  hotelId={state.id}/>
      <DetailsCard detailsHeader="Hotel Overview" 
                   detailsText={state.description}/>
      <RoomsCard //ref={myRef}
                 roomName1="Room 1" 
                 roomImg1="https://d2ey9sqrvkqdfs.cloudfront.net/diH7/2.jpg" 
                 roomRate1="$Test1"
                 roomName2="Room 2" 
                 roomImg2="https://d2ey9sqrvkqdfs.cloudfront.net/diH7/4.jpg" 
                 roomRate2="$Test2"/>
      <MapsCard hotelName={state.name}
                hotelAddress={state.address}
                hotelLat={state.latitude}
                hotelLng={state.longitude}/>
      <br/>
    </div>
  );
}