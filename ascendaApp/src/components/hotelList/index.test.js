/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';

import HotelList from '.';
import { randString, randIntRange, randDate, randDoubleRange } from '../../testUtils.js'

jest.mock('axios');

let queryParams = {
  destination_uid: randString(31),
  checkInDay: randDate(),
  checkOutDay: randDate(),
  rooms: randIntRange(1, 4),
  adults: randIntRange(1, 4),
  children: randIntRange(0, 4)
}

let sortParams = {
  price: randDoubleRange(0, 5000),
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

beforeEach(() => {
  
});

afterEach(() => { cleanup });

it('list is rendered correctly as per hotel list', async () => {
  axios.get.mockImplementation((url) => {
    if (url.startsWith('/api/hotels')) {
      return Promise.resolve({data: hotelRes});
    } else if (url.startsWith('/api/hotelPrice')) {
      return Promise.resolve({data: {hotels: priceRes}});
    }
  });
  
  act(() => {
    render(
      <HotelList className='HotelListCard'
                 queryParams={queryParams}
                 sortParams={sortParams}
                 updateQueryParams={updateQueryParams}/>
    );
  });
    
  let listCards = await waitFor(() => screen.queryByTestId('hotelListCard'));
  console.log(listCards);
});
