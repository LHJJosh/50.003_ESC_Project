import React from 'react';
import ImageGallery from './gallery';
import './styles.css';


export function HeaderCard(props){
  const [state, setState] = React.useState({
    imgData: []
  });

  React.useEffect(() => {
    state.imgData = []
    for (let i = 1; i <= props.hotelImageCount; i++) {
      state.imgData.push({
        img: `${props.hotelImageUrl}/${props.hotelId}/i${i}.jpg`,
        title: '',
        author: ''
      })
    }
  })

  return (
    <div className="headerCard">
      <div className="headerGallery">
        <ImageGallery itemData={state.imgData} rowHeight={200} width={250}/>
      </div>
      <div className="headerText">
        <h1>{props.hotelName}</h1>
        <p>{props.hotelAddress}</p>
      </div>
    </div>
  );
}
