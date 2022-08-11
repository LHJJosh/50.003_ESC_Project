import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import axios from 'axios';

import HotelList from '.';
import { randString, randIntRange, randDate, randDoubleRange} from '../../testUtils.js'

configure({ adapter: new Adapter() });
jest.mock('axios');

const AXIOS_TEST_COUNTS = 10;

function formatGuests(adults, children, rooms){
  let numGuests = adults + children;
  if (rooms >= numGuests){
    var guests = new Array(rooms).fill(0);
    guests.splice(-1, 1, numGuests);
  }
  else {
    let R = numGuests%(rooms);
    if (R === 0){
      guests = new Array(rooms).fill(numGuests/rooms);
    }
    else{
      let newR = numGuests%(rooms-1);
      if (newR === 0){
        guests = new Array(rooms).fill(Math.floor(numGuests/rooms));
        guests.splice(0, 1, Math.ceil(numGuests/rooms));
      }
      else{
        let M = numGuests-newR
        guests = new Array(rooms).fill(M/(rooms-1));
        guests.splice(0, 1, newR);
      }
    }  
  }
  return guests.join('|');
}

for (let i = 0; i < AXIOS_TEST_COUNTS; i++) {
  describe('axios tests for hotel and price queries', () => {
    let queryParams = {
      destination_uid: randString(31),
      checkInDay: randDate(),
      checkOutDay: randDate(),
      rooms: randIntRange(1, 4),
      adults: randIntRange(1, 4),
      children: randIntRange(0, 4)
    }
    
    let sortParams = {
      price: randDoubleRange(0, 4999),
      rating: randIntRange(0, 5),
    }
    
    let hotelMap = new Map();
    for (let i = 0; i < randIntRange(1, 7); i++) {
      let id = randString(4);
      hotelMap.set(id, {
        id: id, 
        rating: randIntRange(0, 5), 
        price: randDoubleRange(0, 5000).toString()
      });
    }
    let hotelRes = Array.from(hotelMap, ([k, {price, ...rest}]) => rest);
    let priceRes = Array.from(hotelMap, ([k, {rating, ...rest}]) => rest);
    
    let updateQueryParams = jest.fn();
    var instance = null;
    
    beforeEach(() => {
      axios.get.mockImplementation((url) => {
        if (url.startsWith('/api/hotels')) {
          return Promise.resolve({data: hotelRes});
        } else if (url.startsWith('/api/hotelPrice')) {
          return Promise.resolve({data: {hotels: priceRes}});
        }
      });
      
      act(() => {
        instance = shallow(
          <HotelList className='HotelListCard'
                     queryParams={queryParams}
                     sortParams={sortParams}
                     updateQueryParams={updateQueryParams}/>
        );
      });
    });
    
    afterEach(() => { cleanup });
    
    it(`api is called on render${i}`, () => {
      expect(axios.get).toHaveBeenCalled(); // toHaveBeenCalledTimes(1);
    });
    
    it(`hotel api is called with correct url${i}`, () => {
      let numGuests = queryParams.adults + queryParams.children;
      let guests = new Array(queryParams.rooms).fill(numGuests);
    
      expect(axios.get).toHaveBeenCalledWith(
        `/api/hotels?destination_id=${queryParams.destination_uid}` + 
        `&checkin=${queryParams.checkInDay}` + 
        `&checkout=${queryParams.checkOutDay}` + 
        `&guests=${formatGuests(queryParams.adults, queryParams.children, queryParams.rooms)}`
      );
    });
    
    it(`price api is called with correct url${i}`, () => {
      let numGuests = queryParams.adults + queryParams.children;
      let guests = new Array(queryParams.rooms).fill(numGuests);
    
      expect(axios.get).toHaveBeenCalledWith(
        `/api/hotelPrice?destination_id=${queryParams.destination_uid}` + 
        `&checkin=${queryParams.checkInDay}` + 
        `&checkout=${queryParams.checkOutDay}` + 
        `&guests=${formatGuests(queryParams.adults, queryParams.children, queryParams.rooms)}`
      );
    });
    
    it(`hotel map is updated correctly${i}`, () => {
      expect(instance.state('hotels')).toEqual(hotelMap);
    });
    
    it(`rating is within bounds${i}`, () => {
      instance.state('hotelList').forEach(hotelItem => {
        expect(hotelItem.rating).toBeGreaterThanOrEqual(0);
        expect(hotelItem.rating).toBeLessThanOrEqual(5);
      });
    });
    
    it(`price is within bounds${i}`, () => {
      instance.state('hotelList').forEach(hotelItem => {
        expect(parseFloat(hotelItem.price)).toBeGreaterThanOrEqual(0);
        expect(parseFloat(hotelItem.price)).toBeLessThanOrEqual(5000);
      });
    });
    
    it(`list is filtered by rating correctly${i}`, () => {
      instance.state('filteredList').forEach(hotelItem => {
        expect(parseInt(hotelItem.rating)).toBeGreaterThanOrEqual(sortParams.rating);
      });
    });
    
    it(`list is filtered by price correctly${i}`, () => {
      instance.state('filteredList').forEach(hotelItem => {
        expect(parseFloat(hotelItem.price)).toBeLessThanOrEqual(parseFloat(sortParams.price));
      });
    });
  });
}
