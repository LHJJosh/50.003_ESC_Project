import * as React from 'react';
import "./styles.css";

export default function HomePage() {
  return(
    <body>
      <div class="header">
        <a href="#default" class="logo">Ascenda</a>
        <div class="header-right">
            <a class="active" href="#home">Home</a>
            <a href="#login">Login/Sign up</a>
        </div>
      </div>
      
      <div class="search">
          Destination
          <br></br><input type="text" placeholder="Search Destination/hotel"/>
          <br></br> Check in day
          <br></br><input type="date" id="check in" name="Check in day"/>
          <br></br> Check out day
          <br></br><input type="date" id="check out" name="Check out day"/>
      </div>
    </body>
  );
}