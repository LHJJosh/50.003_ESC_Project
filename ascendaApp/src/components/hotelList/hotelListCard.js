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


class HotelListCardInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }
  
  render() {
    return <Card sx={{ display: 'flex' }}>
    <CardMedia
      component='img'
      sx={{ width: 200, height: 200 }}
      image={this.props.hotelImage}
      alt={this.props.hotelName}
    />

    <Box className='cardInfoBox'>

      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component='div' variant='h5'>
          {this.props.hotelName}
        </Typography>
          
        <Typography variant='subtitle1' color='text.secondary' component='div'>
          {this.props.hotelAddress}
        </Typography>

        <Rating
          name='simple-controlled'
          value={this.state.value}
          onChange={(event, newValue) => {
            this.setState({value: newValue});
          }}
        />        
      </CardContent>

    </Box>

    <Divider className='cardDivider' orientation="vertical" flexItem />

    <Box className='cardBookBox'>
      <CardContent>
        <Typography component='div' variant='body1'>
          SGD {this.props.hotelPrice}
        </Typography>
          
        <Typography variant='subtitle1' color='text.secondary' component='div'>
          {this.props.hotelDeal}
        </Typography>

        <Button variant='outlined' startIcon={<LocalOfferIcon />} aria-label='book'>
          Book Deal
        </Button>

      </CardContent>
    </Box>

  </Card>
  }
    
}

export const HotelListCard = HotelListCardInternal