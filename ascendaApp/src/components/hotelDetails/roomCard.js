import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';  
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RatesList } from "./ratesList.js";

import previewAlt from '../../assets/cardmedia_noPreviewAvailable.png';
import './styles.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function RoomCard(props){    
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const [state, setState] = useState({
        uniqueList: [],
    });

    function populateRatesList(){
        let ratesList = [];
        props.roomList.forEach((room, index) => {
            if (room.type == props.type){
                ratesList.push(room);
            }
            // console.log(room);
        });
        return ratesList
    }
  
    function populateUniqueList(){
        
        let ratesList = populateRatesList();

        // function filterRooms(room){
        //     this.forEach((uroom) => {
                
        //     });
        // }
        // let uniqueList = ratesList.filter()
        
        // var keys = ['free_cancellation', 'roomAdditionalInfo.breakfastInfo']
        
        const uniqueList = [];

        ratesList.map(x => {
            let sameInstances = uniqueList.filter(a => 
                a.free_cancellation == x.free_cancellation && 
                a.roomAdditionalInfo.breakfastInfo == x.roomAdditionalInfo.breakfastInfo
            )
            if (sameInstances.length === 0) {
                uniqueList.push(x);
            }
        });
        // console.log(ratesList);
        // console.log(uniqueList);
        
        // var uniqueList = ratesList.reduce((prices, room) =>{
        //     let temp = prices[room.free_cancellation];
        //     if(!temp) temp = room;
        //     else if (price.price < room.price)
        // })
        
        // var uniqueList = ratesList.filter(
        //     (s => o =>
        //         (k => !s.has(k) && s.add(k))
        //         (keys.map(k => o[k]).join('|'))
        //     )
        //     (new Set)
        // );

        // var uniqueList = ratesList.reduce((newRatesList, current) => {
        //     if (!newRatesList.some(x => x.free_cancellation == current.free_cancellation && x.roomAdditionalInfo.breakfastInfo == current.roomAdditionalInfo.breakfastInfo && x.lowest_converted_price > current.lowest_converted_price)){
        //         newRatesList.push(current);
        //     }
        //     return newRatesList;
        // }, []);

        // ratesList.forEach((newRoom) => {
        //     if (uniqueList.length != 0){
        //         uniqueList.forEach((uniqueRoom, index) => {
        //             if ((newRoom.free_cancellation == uniqueRoom.free_cancellation) && (newRoom.roomAdditionalInfo.breakfastInfo == uniqueRoom.roomAdditionalInfo.breakfastInfo)){
        //                 console.log("room already exists")
        //                 let bestRate = Math.min(newRoom.lowest_converted_price, uniqueRoom.lowest_converted_price);
        //                 if (bestRate == newRoom.lowest_converted_price){
        //                     console.log("but this room is cheaper")
        //                     uniqueList.splice(index, 1);
        //                     uniqueList.push(newRoom);
        //                     return;
        //                 }
        //                 else{
        //                     console.log("but this room more expensive, don't add")
        //                 }
        //             }
        //             else{
        //                 console.log("room doesn't exist yet")
        //                 uniqueList.push(newRoom);
        //                 return;
        //             }
        //         });
        //     }
        //     else{
        //         uniqueList.push(newRoom);
        //         console.log("first room EVER")
        //     }
        // });
        setState({uniqueList: uniqueList}); 
    }

    useEffect(() => {
        populateUniqueList();
        // console.log(state.uniqueList);
    }, []);

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
        <Card sx={{ maxWidth: 300, borderRadius: 2}}>
            <CardHeader
                title={props.roomName}
                style={{ textAlign: 'center' }}
            />
            <CardMedia
            component='img'
            sx={{ width: 300, height: 200, overflow: 'hidden'}}
            image={loadImage()}
            alt={props.roomName}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = previewAlt;
                }}
            />
            <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary">
                    Show details
                </Typography>
                <ExpandMore expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show details"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <RatesList className='ratesList'
                           uniqueList={state.uniqueList}/>
            </Collapse>
        </Card>
    );
}