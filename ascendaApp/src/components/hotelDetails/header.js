import React from 'react';
import ImageGallery from './gallery';
import './styles.css';


export default class HeaderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: []
    }
  }

  render() {
    this.state.imgData = [];
    for (let i = 1; i <= this.props.hotelImageCount; i++) {
      this.state.imgData.push({
        img: `${this.props.hotelImageUrl}/${this.props.hotelId}/i${i}.jpg`,
        title: '',
        author: ''
      })
    }

    return (
      <div className="headerCard">
        <div className="headerGallery">
          <ImageGallery itemData={this.state.imgData} rowHeight={200} width={250}/>
        </div>
        <div className="headerText">
          <h1 data-testid='headerHotelName'>{this.props.hotelName}</h1>
          <p data-testid='headerHotelAddress'>{this.props.hotelAddress}</p>
        </div>
      </div>
    );
  }
}
