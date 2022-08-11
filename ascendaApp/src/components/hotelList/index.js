import React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './loader.js'
// import HotelListItem from './hotelListItem.js'
import "./styles.css";

const HotelListCard = React.lazy(() => import("./hotelListCard.js"));


class HotelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: [],
      hotelList: [],
      hotels: new Map(),
      updatedHotelList: [],
      hasMore: true,
      perPage: 10,
      completed: false,
      emptyForm: true,
      noRooms: false
    }
  }

  updateHotelInfo = async (queryUrl) => {
    if (typeof queryUrl !== 'undefined') {
      // console.log(queryUrl);
      this.state.emptyForm = false;
      let hotelRes = await axios.get(`/api/hotels${queryUrl}`)
                                .catch((err) => {
                                  console.log(err);
                                  if (err.response.status == 500 || err.response.status == 400){
                                    this.setState({completed: true})
                                    this.setState({noRooms: true})
                                  }
                                });
      if (typeof hotelRes != 'undefined'){
        this.state.hotels.clear();
        await hotelRes.data.forEach(data => {
          this.state.hotels.set(data['id'], {
            ...data,
            price: Number.MAX_VALUE
          });
        });
      }
      let priceRes = await axios.get(`/api/hotelPrice${queryUrl}`)
                                .catch((err) => {
                                  console.log(err);
                                  if (err.response.status == 500 || err.response.status == 400){
                                    this.setState({completed: true})
                                    this.setState({noRooms: true})
                                  }
                                });
      if (typeof priceRes != 'undefined'){
        // console.log(priceRes)
        priceRes.data.hotels.forEach(data => {
          if (this.state.hotels.has(data['id'])) {
            // console.log(data['price'])
            this.setState({noRooms: false});
            this.state.hotels.set(data['id'], {
              ...this.state.hotels.get(data['id']),
              ...data
            });
            this.state.completed = true;
          } // no data left as Number.MAX_VALUE
        });
      }
      this.state.hotelList = Array.from(this.state.hotels, ([k, v]) => v);
      this.refreshList();

      if (this.state.completed == false){
        this.updateHotelInfo(queryUrl);
      };
    }
  }

  refreshList = () => {
    this.state.filteredList = this.state.hotelList.filter(item => 
      (item.price < this.props.sortParams.price || item.price === Number.MAX_VALUE) &&
      item.rating >= this.props.sortParams.rating
    );
    this.state.filteredList.sort((a, b) => a.price - b.price);
    // console.log(this.state.filteredList);
    this.setState({updatedHotelList: this.state.filteredList.slice(
      0, Math.min(this.state.filteredList.length, 10))});
  }

  componentDidMount() {
    this.updateHotelInfo(this.buildQuery());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryParams !== this.props.queryParams) {
      this.setState({completed: false})
      this.setState({noRooms: false})
      this.updateHotelInfo(this.buildQuery());
    }
    if (prevProps.sortParams !== this.props.sortParams) {
      this.refreshList();
    }
  }

  buildQuery() {    
    let queryUrl = '';
    let query = this.props.queryParams;
    function formatGuests(adults, children, rooms){
      let numGuests = adults + children;
      if (rooms > numGuests){
        var guests = new Array(rooms).fill(0);
        guests.splice(0, 1, numGuests);
      }
      else {
        let R = numGuests%(rooms);
        let L = Math.floor(numGuests/rooms);
        let H = Math.ceil(numGuests/rooms);
        console.log(L + '; ' + H)
        var guests = new Array(rooms).fill(L);
        for (let i=0; i<R; i++){
          guests.splice(i, 1, H)
          console.log(guests)
        }
      }
      return guests.join('|');
    }
    if (query.destination_uid !== '' && 
      query.checkInDay !== '' &&
      query.checkOutDay !== '' &&
      query.rooms !== '' &&
      query.adults !== '' &&
      query.children !== '' 
    ) {
      queryUrl += `?destination_id=${query.destination_uid}`; // WD0M
      queryUrl += `&checkin=${query.checkInDay}`; // 2022-08-18
      queryUrl += `&checkout=${query.checkOutDay}`; // 2022-08-19
      queryUrl += `&guests=${formatGuests(query.adults, query.children, query.rooms)}`;
      // queryUrl += `&guests=${query.rooms}`;
      // sessionStorage.setItem("queryUrl", queryUrl)
      return queryUrl
    }
  }

  buildQueryInternalApi() {
    let queryUrl = '/api/listHotels/';
    let query = this.props.queryParams;
    if (query.destination !== "")
      queryUrl += `?destination=${query.destination}`
    if (query.rooms !== "")
      queryUrl += `&rooms=${query.rooms}`
    if (query.rating !== "")
      queryUrl += `&rating=${query.rating}`
    if (query.price !== "")
      queryUrl += `&price=${query.price}`
    return queryUrl
  }
  
  loadProducts = () => {   
    setTimeout(() => {       
      let dataLength = this.state.updatedHotelList.length;
      let nextSet = this.state.filteredList.slice(dataLength, dataLength + this.state.perPage);
      this.state.updatedHotelList.push(...nextSet);
      this.setState({updatedHotelList: this.state.updatedHotelList});
    }, 1000);
  };

  render() {
    return <div className='hotelList' id='hotelList'>
      {this.state.completed || this.state.emptyForm ? <div></div>: <div><Loader></Loader><br></br></div>}
      {this.state.noRooms ? <h2 className='noHotels'> No Available Hotels</h2> : <div></div>}
      <InfiniteScroll
        className='infiniteScroll'
        dataLength={this.state.updatedHotelList.length}
        next={this.loadProducts}
        hasMore={this.state.hasMore}>
        <List sx={{ bgcolor: 'background.paper', padding: '0px'}}>
        
        {this.state.updatedHotelList.map((hotel, index) => 
          <div key={index}>
            <Suspense fallback={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <h5>Loading</h5>
              </div>
            }>
              <HotelListCard className='HotelListCard'
                             hotelName={hotel.name}
                             hotelImage={`${hotel.cloudflare_image_url}/${hotel.id}/i1.jpg`}
                             hotelAddress={hotel.address}
                             hotelPrice={hotel.price}
                             hotelId={hotel.id}
                             hotelRating={hotel.rating}
                             hotelDistance={hotel.distance}
                             destinationId={this.props.queryParams.destination_uid}
                             checkInDay={this.props.queryParams.checkInDay}
                             checkOutDay={this.props.queryParams.checkOutDay}
                             rooms={this.props.queryParams.rooms}
                             updateQueryParams={this.props.updateQueryParams}
                             data-testid='hotelListCard'/> 
            </Suspense>
            <Divider variant='inset' component='li' />
          </div>
        )}
        
        </List>
      </InfiniteScroll>
    </div>
  }
}

export default HotelList;
   