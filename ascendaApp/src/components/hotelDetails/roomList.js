import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';  
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

import previewAlt from '../../assets/cardmedia_noPreviewAvailable.png';
import './styles.css'
//Fixing
export function RoomList(props){    

    function getRoomPrice(){
        return `SGD ${props.roomPrice.toFixed(2)}`;
    }

    function freeCancellation(){
        if (props.freeCancellation == false){
            return ({text: "No Free Cancellation",
                    icon: <CancelIcon/>})
        }
        else{
            return ({text: "Free Cancellation",
                    icon: <CheckCircleIcon/>})
        }
    }

    function breakfastInfo(){
        if (props.breakfastInfo == "hotel_detail_room_only"){
            return ({text:"No Breakfast Included",
                    icon: <NoMealsIcon/>})
        }
        else{
            return ({text: "Breakfast Included",
                    icon: <RestaurantIcon/>})
        }
    }

    function loadImage(){
        let imageUrl = ''
        try{
            imageUrl = props.roomImage[0].url;
        }
        catch(err){
            imageUrl = previewAlt;
        }
        return imageUrl
    }

        return (
            <Card sx={{ display: 'flex', mx: 15, my:5}}>
                <Box sx={{ width: 200, height: 200 }}>
                    <CardMedia
                    component='img'
                    sx={{ width: 200, height: 200 }}
                    image={loadImage()}
                    alt={props.roomName}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = previewAlt;
                      }}
                    />
                </Box>
                <Box className='cardInfoBox'>

                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component='div' variant='h4'>
                        {props.roomName}
                    </Typography>

                    <div class="vspace1em"></div>

                    <Typography variant='h5' color='text.secondary' component='div'>
                        <List>
                            <ListItemIcon>
                                {freeCancellation().icon}
                            </ListItemIcon>
                            <ListItemText primary={freeCancellation().text} />
                        </List>
                    </Typography>
                    <Typography variant='h5' color='text.secondary' component='div'>
                        <List>
                            <ListItemIcon>
                                {breakfastInfo().icon}
                            </ListItemIcon>
                            <ListItemText primary={breakfastInfo().text} />
                        </List>
                    </Typography>

                    <div class="vspace1em"></div>

                    </CardContent>

                </Box>

                <Box className='cardBookBox'>
                    <CardContent>
                    <Typography component='div' variant='h5'>
                        {getRoomPrice()}
                    </Typography>
                    
                    <div class="vspace1em"></div>

                    <Button className='roomButton' 
                        variant='outlined' 
                        startIcon={<LocalOfferIcon />} 
                        aria-label='book' 
                        component={Link} to="/bookings"
                        state={{key: props.key,
                                roomName: props.roomName,
                                price: getRoomPrice()}}
                    >
                        Book Room
                    </Button>

                    </CardContent>
                </Box>
            </Card>
        );
}