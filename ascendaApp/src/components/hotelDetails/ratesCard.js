import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';  
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import './styles.css'

export function RatesCard(props){    

    function getRoomPrice(){
        return `SGD ${props.roomPrice.toFixed(2)}`;
    }

    function freeCancellation(){
        if (props.freeCancellation == true){
            return ({text: "Free Cancellation",
                     icon: <CheckCircleIcon/>})
        }
        else{
            return ({text: "No Free Cancellation",
                     icon: <CancelIcon/>})
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

        return (
            <Card sx={{ display: 'flex', alignItems: 'center'}}>
                <Box className='cardInfoBox'>

                    <CardContent sx={{ flex: 'auto' }}>

                    <Typography variant='h5' color='text.secondary' component='div' sx={{ m: -2 }}>
                        <List>
                            <ListItem>
                                <ListItemIcon style={{minWidth: '30px'}}>
                                    {freeCancellation().icon}
                                </ListItemIcon>
                                <ListItemText primary={freeCancellation().text} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{minWidth: '30px'}}>
                                    {breakfastInfo().icon}
                                </ListItemIcon>
                                <ListItemText primary={breakfastInfo().text} />
                            </ListItem>
                        </List>
                    </Typography>

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
                <Divider></Divider>
            </Card>
        );
}