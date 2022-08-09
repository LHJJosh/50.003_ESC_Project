import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import axios from 'axios';

import HotelList from '.';

configure({ adapter: new Adapter() });
jest.mock('axios');

function getRandomString(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+`[]\\;\',./_+{}|:"<>?~';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomDoubleFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min
}

function getRandomDate() {
  let start = new Date();
  let end = new Date(start.getFullYear(), 12-1, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let queryParams = {
  destination_uid: getRandomString(31),
  checkInDay: getRandomDate(),
  checkOutDay: getRandomDate(),
  rooms: randomIntFromInterval(1, 4),
  adults: randomIntFromInterval(1, 4),
  children: randomIntFromInterval(0, 4)
}

let sortParams = {
  price: randomDoubleFromInterval(0, 5000),
  rating: randomIntFromInterval(0, 5),
}

let hotelMap = new Map();
for (let i = 0; i < randomIntFromInterval(1, 7); i++) {
  let id = getRandomString(4);
  hotelMap.set(id, {
    id: id, 
    rating: randomIntFromInterval(0, 5), 
    price: randomDoubleFromInterval(0, 5000).toString()
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

it('api is called on render', () => {
  expect(axios.get).toHaveBeenCalled(); // toHaveBeenCalledTimes(1);
});

it('hotel api is called with correct url', () => {
  let numGuests = queryParams.adults + queryParams.children;
  let guests = new Array(queryParams.rooms).fill(numGuests);

  expect(axios.get).toHaveBeenCalledWith(
    `/api/hotels?destination_id=${queryParams.destination_uid}` + 
    `&checkin=${queryParams.checkInDay}` + 
    `&checkout=${queryParams.checkOutDay}` + 
    `&guests=${guests.join('|')}`
  );
});

it('price api is called with correct url', () => {
  let numGuests = queryParams.adults + queryParams.children;
  let guests = new Array(queryParams.rooms).fill(numGuests);

  expect(axios.get).toHaveBeenCalledWith(
    `/api/hotelPrice?destination_id=${queryParams.destination_uid}` + 
    `&checkin=${queryParams.checkInDay}` + 
    `&checkout=${queryParams.checkOutDay}` + 
    `&guests=${guests.join('|')}`
  );
});

it('hotel map is updated correctly', () => {
  expect(instance.state('hotels')).toEqual(hotelMap);
});

it('rating is within bounds', () => {
  instance.state('hotelList').forEach(hotelItem => {
    expect(hotelItem.rating).toBeGreaterThanOrEqual(0);
    expect(hotelItem.rating).toBeLessThanOrEqual(5);
  });
});

it('price is within bounds', () => {
  instance.state('hotelList').forEach(hotelItem => {
    expect(parseFloat(hotelItem.price)).toBeGreaterThanOrEqual(0);
    expect(parseFloat(hotelItem.price)).toBeLessThanOrEqual(5000);
  });
});

it('list is filtered by rating correctly', () => {
  instance.state('filteredList').forEach(hotelItem => {
    expect(parseInt(hotelItem.rating)).toBeGreaterThanOrEqual(sortParams.rating);
  });
});

it('list is filtered by price correctly', () => {
  instance.state('filteredList').forEach(hotelItem => {
    expect(parseFloat(hotelItem.price)).toBeLessThanOrEqual(parseFloat(sortParams.price));
  });
});
