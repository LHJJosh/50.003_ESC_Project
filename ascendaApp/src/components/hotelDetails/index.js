import React from 'react';
import './styles.css';
import { HeaderCard } from './header';
import { DetailsCard } from './extraDetails';
import { RoomsCard } from './roomList';
import { MapsCard } from './mapView';

export function DetailsPage() {
    return (
      <div className="detailsPage">
        <HeaderCard hotelName = "The Fullerton Hotel Singapore" hotelAddress = "1 Fullerton Square" hotelImg = "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/10.jpg"/>
        <DetailsCard  detailsHeader1 = "Location" 
                      detailsHeader2 = "Amenities" 
                      detailsText1 = "With a stay at The Fullerton Hotel Singapore, you'll be centrally located in Singapore, steps from Cavenagh Bridge and Anderson Bridge.  This 5-star hotel is close to Chinatown Heritage Center and Universal Studios Singapore®."
                      detailsText2 = "Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. If you're looking for recreational opportunities, you'll find an outdoor pool and a fitness center. This Colonial hotel also features complimentary wireless Internet access, concierge services, and gift shops/newsstands. Guests can get to nearby shops on the complimentary shuttle."/>
        <RoomsCard  roomName1 = "Test room 1" 
                    roomImg1 = "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/2.jpg" 
                    roomRate1 = "$Test1"
                    roomName2 = "Test room 2" 
                    roomImg2 = "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/4.jpg" 
                    roomRate2 = "$Test2"/>
        <MapsCard></MapsCard>
        <br/>
      </div>
    );
  }