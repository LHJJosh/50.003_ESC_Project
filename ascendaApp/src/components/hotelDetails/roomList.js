import React from "react";
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useState, useEffect } from "react";
import "./styles.css";
import { RoomCard } from "./roomCard.js";
import { alignProperty } from "@mui/material/styles/cssUtils";

export function RoomsCard(props){
    const [state, setState] = useState({
        roomList: [],
        uniqueList: [],
        completed: false,
    });
    
    async function refreshList(queryUrl){
        if (typeof queryUrl !== 'undefined'){
            await axios
            .get(queryUrl)
            // .then((res) => console.log(res.data))
            .then((res) => {
                let typeList = [];
                let uniqueList = [];
                res.data.rooms.forEach((room) => {
                    if (!typeList.includes(room.type)){
                        typeList.push(room.type);
                        uniqueList.push(room);
                    }            
                });
                setState({roomList: res.data.rooms,
                          completed: res.data.completed,
                          uniqueList: uniqueList});
                if (res.data.completed == false){
                    refreshList(queryUrl)
                };
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
        function formatGuests(adults, children, rooms){
            let numGuests = adults + children;
            if (rooms >= numGuests){
              var guests = new Array(rooms).fill(0);
              guests.splice(-1, 1, numGuests);
            }
            else {
              let R = numGuests%(rooms);
              if (R == 0){
                var guests = new Array(rooms).fill(numGuests/rooms);
              }
              else{
                let newR = numGuests%(rooms-1);
                if (newR == 0){
                  var guests = new Array(rooms).fill(Math.floor(numGuests/rooms));
                  guests.splice(0, 1, Math.ceil(numGuests/rooms));
                }
                else{
                  let M = numGuests-newR
                  var guests = new Array(rooms).fill(M/(rooms-1));
                  guests.splice(0, 1, newR);
                }
              }  
            }
            return guests.join('|');
          }
        if (query.hotel_uid !== '' && 
            query.destination_uid !== '' && 
            query.checkInDay !== '' &&
            query.checkOutDay !== '' &&
            query.rooms !== '' &&
            query.adults !== '' &&
            query.children !== '' 
            ) {
            queryUrl += `?hotel_id=${query.hotel_uid}`; // diH7
            queryUrl += `&destination_id=${query.destination_uid}`; // WD0M
            queryUrl += `&checkin=${query.checkInDay}`; // 2022-08-18
            queryUrl += `&checkout=${query.checkOutDay}`; // 2022-08-19
            queryUrl += `&guests=${formatGuests(query.adults, query.children, query.rooms)}`;
            // queryUrl += `&guests=${query.rooms}`;
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
        return (
            <Grid sx={{ flexGrow: 1}} container spacing={0} padding>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {state.uniqueList.map((room) => (
                            <Grid key={room.key} item>
                                <RoomCard className='RoomList'
                                            type = {room.type}
                                            roomImage = {room.images}
                                            roomName = {room.description}
                                            roomList = {state.roomList}/>
                                <div className="vspace1em"></div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            // <p>{room.free_cancellation}</p>
        );
    }

    return(
        <div className='roomsCard'>
            <h3>Available Rooms</h3>
            <Grid container spacing={0}>
                {renderItems()}
            </Grid>
        </div>
    )
}
