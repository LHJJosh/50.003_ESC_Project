import React from 'react';
import './styles.css';

export function RoomsCard(props) {

    function onClickHandler(){
      alert('Implement redirect to Booking Page')
    }

    function RoomCard(props){
        return(
            <div className="roomCard">
                <div className="roomsImg">
                    <img src={props.roomImg}/>
                </div>
                <div className="roomsText">
                    <div className="roomsInfo">
                        <h3>{props.roomName}</h3>
                        <p>{props.roomRate}</p>
                    </div>
                    <button className="bookNowButton" onClick={onClickHandler}>Book Now!</button>
                </div>
            </div>
        )
    }

    return (
      <div className="roomsCard">
        <h2>Room Options</h2>
        <RoomCard roomImg={props.roomImg1} roomName={props.roomName1} roomRate={props.roomRate1}/>
        <RoomCard roomImg={props.roomImg2} roomName={props.roomName2} roomRate={props.roomRate2}/>
      </div>
    );
  }