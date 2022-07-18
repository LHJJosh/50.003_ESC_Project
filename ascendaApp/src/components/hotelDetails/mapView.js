import React from 'react';
import './styles.css';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export function MapsCard(){
    const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyCSteiXlovzDH_5ByE6nU_hXpIw_A1hJKo"});

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="mapsCard">
            <div className="mapsText">
                <h3>The Fullerton Hotel Singapore</h3>
                <p>1 Fullerton Square</p>
            </div>
            <Map/>
        </div>
    );
}

function Map(){  
    const center = {lat: 1.28624, lng: 103.852889};
    return (
        <div>
            <GoogleMap zoom = {18} center = {center} mapContainerClassName="map">
                <Marker position = {center}/>
            </GoogleMap>
        </div>
    )
}

