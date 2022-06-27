import React from 'react';
import './styles.css';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect , useRef , useState } from 'react';


// function Map({center, zoom}) {
//     const ref = useRef(null);
//     // const style = { height: "50vh"};
//     const [map, setMap] = useState();

//     // useEffect(() => {
//     //     new window.google.maps.Map(ref.current !== null, {
//     //         center,
//     //         zoom,
//     //     });
//     // });

//     // return <div className="map" ref={ref} id="map"/>

//     useEffect(() => {
//         if (ref.current && !map) {
//             setMap(new window.google.maps.Map(ref.current, {
//                 center,
//                 zoom,
//             }));
//         }
//     }, [ref, map]);
//     return <div className="map" ref={ref}/>
// }

export function MapsCard() {

    const center = { lat: -25.363, lng: 131.044 };
    const zoom = 15;

    function Map({center, zoom}) {
        const ref = useRef(null);
        const [map, setMap] = useState();
    
        
        useEffect(() => {
            if (ref.current && !map) {
                setMap(new window.google.maps.Map(ref.current, {
                    center,
                    zoom,
                }));
            }
        }, [ref, map]);
        return <div className="map" ref={ref}/>
    }


    return (
        <div className="mapsCard">
            <h1>map</h1>
            <Wrapper apiKey="AIzaSyCSteiXlovzDH_5ByE6nU_hXpIw_A1hJKo">
                <Map center = {center} zoom = {zoom}/>
            </Wrapper>
        </div>
    );



    // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSteiXlovzDH_5ByE6nU_hXpIw_A1hJKo&callback=initMap"></script>
    // function initMap(){

    // }
    
    // return(
    //     <div className="mapsCard">
    //         <h1>I AM VERY HAPPY TODAY :D</h1>
    //         <div className="mapsContainer">

    //         </div>
    //     </div>
    // )
}



