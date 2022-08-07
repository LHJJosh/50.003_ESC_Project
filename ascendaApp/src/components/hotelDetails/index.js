import { useLocation } from 'react-router-dom'
import React from 'react';
import { HeaderCard } from './header';
import { DetailsCard } from './extraDetails';
import { RoomsCard } from './roomList';
import { MapsCard } from './mapView';
import axios from 'axios';

import './styles.css';

export class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      address: "",
      latitude: 0,
      longitude: 0,
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
    }
  }

  buildQueryInternalApi() {
    return `/api/getHotel/${this.props.queryParams.hotel_uid}`;
  };

  buildQuery() {
    return `/api/hotelDetail?hotel_id=${this.props.queryParams.hotel_uid}`;
  }
  
  refreshDetails(queryUrl) {
    axios
      .get(queryUrl)
      .then((res) => this.setState(res.data))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.refreshDetails(this.buildQuery());
  }

  render() {
    return (
      <div className="detailsPage">
        <HeaderCard hotelName={this.state.name} 
                    hotelAddress={this.state.address} 
                    hotelImageUrl={this.state.cloudflare_image_url}
                    hotelImageCount={this.state.number_of_images}
                    hotelId={this.state.id}/>
        <DetailsCard detailsHeader="Hotel Overview" 
                     detailsText={this.state.description}/>
        <RoomsCard className='roomList'
                   queryParams={this.props.queryParams}/>
        <MapsCard hotelName={this.state.name}
                  hotelAddress={this.state.address}
                  hotelLat={this.state.latitude}
                  hotelLng={this.state.longitude}/>
        <br/>
      </div>
    );
  }
}