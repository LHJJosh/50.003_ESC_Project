import React from 'react';
import './styles.css';


export function HeaderCard(props) {

    function onClickHandler(){
      alert('Implement reroute to rooms component')
    }

    return (
      <div className="headerCard">
        <div className="headerText">
          <h1>{props.hotelName}</h1>
          <p>{props.hotelAddress}</p>
          <button className="roomOptionsButton" onClick={onClickHandler}>Room Options</button>
        </div>
        <div className="headerGallery">
          <img src={props.hotelImg}/>
          <p> to implement slider gallery </p>
        </div>
      </div>
    );
  }
