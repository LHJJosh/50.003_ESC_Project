import React from 'react';
import './styles.css';
   
export function DetailsCard(props) {

    function DetailsText(props){
        return(
            <div className="detailsText">
                <h3>{props.detailsHeader}</h3>
                <div dangerouslySetInnerHTML={{ __html: props.detailsText }} />
            </div>
        )
        }

    return (
        <div className="detailsCard">
          <DetailsText detailsHeader={props.detailsHeader} detailsText={props.detailsText}/>
        </div>
    );
    }