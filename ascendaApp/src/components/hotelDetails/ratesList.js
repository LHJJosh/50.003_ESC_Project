import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import axios from 'axios';
import { useState, useEffect } from "react";
import "./styles.css";
import { RatesCard } from "./ratesCard.js";
import Divider from '@mui/material/Divider';

export function RatesList(props){
    const [state, setState] = useState({
        uniqueList: props.uniqueList
    });

    function renderItems(){
        return state.uniqueList.map((room, index) =>
            <div key={room.key}>
                <ListItem>
                    <RatesCard className='ratesCard'
                                roomPrice = {room.lowest_converted_price}
                                freeCancellation = {room.free_cancellation}
                                breakfastInfo = {room.roomAdditionalInfo.breakfastInfo}/>
                </ListItem>   
            </div>
            // <p>{room.free_cancellation}</p>
        );
    }

    return(
        <div className='ratesList'>
            <List sx={{ bgcolor: 'background.paper', padding: '0px'}}>
                {renderItems()}
            </List>
        </div>
    )
}
