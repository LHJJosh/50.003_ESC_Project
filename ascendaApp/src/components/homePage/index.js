import * as React from 'react';
import "./styles.css";

export default function HomePage() {
  return(
    <body>
      
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