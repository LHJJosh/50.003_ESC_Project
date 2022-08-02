import React from "react";
import List from '@mui/material/List';
import axios from 'axios';
import { useState, useEffect } from "react";
import "./styles.css";
import { RoomList } from "./roomList.js";

export function RoomsCard(props){
    const [state, setState] = useState({
        roomList: [],
        completed: false,
    });
    
    async function refreshList(queryUrl){
        if (typeof queryUrl !== 'undefined'){
            await axios
            .get(queryUrl)
            // .then((res) => console.log(res.data))
            .then((res) => {
                setState({roomList: res.data.rooms,
                          completed: res.data.completed});
                if (res.data.completed == false){
                    refreshList(queryUrl)
                }
            })
            .catch((err) => console.log(err));
        }
        else{
            console.log('done');
        }
    }

    useEffect(() => {refreshList(buildQuery())}, []);

    function buildQuery() {
        let queryUrl = '/api/rooms';
        let query = props.queryParams;
        // console.log(query);
        if (query.hotel_id !== '' && 
            query.destination_id !== '' && 
            query.checkin !== '' &&
            query.checkout !== '' &&
            query.guests !== ''
            ) {
            queryUrl += `?hotel_id=${query.hotel_id}`; // diH7
            queryUrl += `&destination_id=${query.destination_id}`; // WD0M
            queryUrl += `&checkin=${query.checkin}`; // 2022-08-18
            queryUrl += `&checkout=${query.checkout}`; // 2022-08-19
            queryUrl += `&guests=${query.guests}`;
            return queryUrl
            }
        else{
            console.log(props.queryParams)
        }
    }

    // function roomImage(){
    //     state.roomList.forEach((room) => {
    //         if(room.images == []){
    //             console.log('no image')
    //         }
    //         return 
    //     })
    // }

    function renderItems(){
        return state.roomList.map((room) =>
            <div key={room.key}>
                <RoomList className='RoomList'
                            roomPrice = {room.lowest_converted_price}
                            freeCancellation = {room.free_cancellation}
                            breakfastInfo = {room.roomAdditionalInfo.breakfastInfo}
                            roomImage = {room.images}
                            roomName = {room.description}/>   
            </div>
            // <p>{room.free_cancellation}</p>
        );
    }

    return(
        <div className='roomList'>
            <List sx={{ bgcolor: 'background.paper', padding: '0px'}}>
                {renderItems()}
            </List>
        </div>
    )
}
