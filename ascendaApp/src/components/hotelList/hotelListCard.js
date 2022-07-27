import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

import previewAlt from '../../assets/cardmedia_noPreviewAvailable.png';
import './styles.css'

class HotelListCardInternal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return <Card sx={{ display: 'flex' }}>
    <CardMedia
      component='img'
      sx={{ width: 200, height: 200 }}
      image={this.props.hotelImage}
      alt={this.props.hotelName}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = previewAlt;
      }}
    />

    <Box className='cardInfoBox'>

      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component='div' variant='h4'>
          {this.props.hotelName}
        </Typography>

        <div class="vspace1em"></div>
          
        <Typography variant='h5' color='text.secondary' component='div'>
          {this.props.hotelAddress}
        </Typography>
        <Typography variant='h5' color='text.secondary' component='div'>
          {(parseFloat(this.props.hotelDistance)).toFixed(1)} km from city centre
        </Typography>

        <div class="vspace1em"></div>

        <Rating
          name='simple-controlled'
          defaultValue={this.props.hotelRating}
          precision={0.5}
          size="large"
          readOnly
        /> 
      </CardContent>

    </Box>

    <Divider className='cardDivider' orientation="vertical" flexItem />

    <Box className='cardBookBox'>
      <CardContent>
        <Typography component='div' variant='h5'>
          SGD {this.props.hotelPrice}
        </Typography>

        <Button className='hotelButton' 
          variant='outlined' 
          startIcon={<LocalOfferIcon />} 
          aria-label='book' 
          component={Link} to="/hoteldetails"
          state={{hotelId: this.props.hotelId}}
        >
          Book Deal
        </Button>

      </CardContent>
    </Box>

  </Card>
  }
    
}

export const HotelListCard = HotelListCardInternal