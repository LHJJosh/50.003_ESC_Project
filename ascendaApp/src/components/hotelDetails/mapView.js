import React from 'react';
import './styles.css';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export function MapsCard(props){
    const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyCSteiXlovzDH_5ByE6nU_hXpIw_A1hJKo"});

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="mapsCard">
            <div className="mapsText">
                <h3>{props.hotelName}</h3>
                <p>{props.hotelAddress}</p>
            </div>
            <Map hotelLat={parseFloat(props.hotelLat)} hotelLng={parseFloat(props.hotelLng)}/>
        </div>
    );
}

function Map(props){  
    const center = {lat: props.hotelLat, lng: props.hotelLng};
    return (
        <div>
            <GoogleMap zoom = {18} center = {center} mapContainerClassName="map">
                <Marker position = {center}/>
            </GoogleMap>
        </div>
    )
}

