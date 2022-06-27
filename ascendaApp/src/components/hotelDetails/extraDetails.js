import React from 'react';
import './styles.css';
   
export function DetailsCard(props) {

    function DetailsText(props){
        return(
            <div className="detailsText">
                <h3>{props.detailsHeader}</h3>
                <p>{props.detailsText}</p>
            </div>
        )
        }

    return (
        <div className="detailsCard">
        <h2>Hotel Details</h2>
        <DetailsText detailsHeader={props.detailsHeader1} detailsText={props.detailsText1}/>
        <DetailsText detailsHeader={props.detailsHeader2} detailsText={props.detailsText2}/>
        </div>
    );
    }