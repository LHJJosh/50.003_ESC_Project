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
    customerType: "",
    lat: "",
    lng: "",
    name: "",
    price: "",
    reviewScore: ""
  });
  const location = useLocation();
  
  function refreshDetails(queryUrl) {
    axios
      .get(queryUrl)
      .then((res) => setState(res.data))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (location.state !== null && location.state.hotelId !== state.id) {
      let queryUrl=`/api/getHotel/${location.state.hotelId}`
      refreshDetails(queryUrl);
    }
  });

 
  //const myRef = useRef(null)

  //const executeScroll = () => myRef.current.scrollIntoView() 

  return (
    <div className="detailsPage">
      <HeaderCard hotelName={state.name} hotelAddress={state.address} hotelImg="https://d2ey9sqrvkqdfs.cloudfront.net/diH7/10.jpg"/>
      <DetailsCard detailsHeader1="Location" 
                   detailsHeader2="Amenities" 
                   detailsText1="With a stay at The Fullerton Hotel Singapore, you'll be centrally located in Singapore, steps from Cavenagh Bridge and Anderson Bridge.  This 5-star hotel is close to Chinatown Heritage Center and Universal Studios Singapore®."
                   detailsText2="Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. If you're looking for recreational opportunities, you'll find an outdoor pool and a fitness center. This Colonial hotel also features complimentary wireless Internet access, concierge services, and gift shops/newsstands. Guests can get to nearby shops on the complimentary shuttle."/>
      <RoomsCard //ref={myRef}
                 roomName1="Room 1" 
                 roomImg1="https://d2ey9sqrvkqdfs.cloudfront.net/diH7/2.jpg" 
                 roomRate1="$Test1"
                 roomName2="Room 2" 
                 roomImg2="https://d2ey9sqrvkqdfs.cloudfront.net/diH7/4.jpg" 
                 roomRate2="$Test2"/>
      <MapsCard hotelName={state.name}
                hotelAddress={state.address}
                hotelLat={state.lat}
                hotelLng={state.lng}/>
      <br/>
    </div>
  );
}