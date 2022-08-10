/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'

import HotelListCard from './hotelListCard.js';
import { randString, randIntRange, randDate, randDoubleRange} from '../../testUtils.js'

const TEST_COUNTS = 10;

for (let i = 0; i < TEST_COUNTS; i++) {
  describe('test for hotel list card', () => {
    let hotel = {
      name: randString(31),
      cloudflare_image_url: randString(31),
      id: randString(31),
      address: randString(31),
      price: randDoubleRange(0, 5000),
      rating: randIntRange(0, 5),
      distance: randDoubleRange(0, 5000)
    }
    
    let queryParams = {
      destination_uid: randString(31),
      checkInDay: randDate(),
      checkOutDay: randDate(),
      rooms: randIntRange(1, 4),
    }
    
    let updateQueryParams = jest.fn();
    
    beforeEach(() => {
      act(() => {
        render(
          <HotelListCard className='HotelListCard'
                         hotelName={hotel.name}
                         hotelImage={`${hotel.cloudflare_image_url}/${hotel.id}/i1.jpg`}
                         hotelAddress={hotel.address}
                         hotelPrice={hotel.price}
                         hotelId={hotel.id}
                         hotelRating={hotel.rating}
                         hotelDistance={hotel.distance}
                         destinationId={queryParams.destination_uid}
                         checkInDay={queryParams.checkInDay}
                         checkOutDay={queryParams.checkOutDay}
                         rooms={queryParams.rooms}
                         updateQueryParams={updateQueryParams}/>,
          {wrapper: BrowserRouter} // router component exists
        );
      });
    });
    
    afterEach(() => { cleanup });
    
    it(`renders with correct name${i}`, () => {
      expect(screen.queryByTestId('hotelName')).toHaveTextContent(hotel.name);
    });
    
    it(`renders with correct address${i}`, () => {
      expect(screen.queryByTestId('hotelAddress')).toHaveTextContent(hotel.address);
    });
    
    it(`renders with correct distance${i}`, () => {
      expect(screen.queryByTestId('hotelDistance')).toHaveTextContent(
        `${(parseFloat(hotel.distance)).toFixed(1)} km from city centre`
      );
    });
    
    it(`renders with correct rating${i}`, () => {
      expect(screen.queryByTestId('hotelRating').getAttribute('aria-label')).toContain(
        `${hotel.rating} Star`
      );
    });
    
    it(`renders with correct image${i}`, () => {
      expect(screen.queryByTestId('hotelImg')).toHaveAttribute('src',
        `${hotel.cloudflare_image_url}/${hotel.id}/i1.jpg`
      );
    });
    
    it(`renders with correct image alt${i}`, () => {
      expect(screen.queryByTestId('hotelImg')).toHaveAttribute('alt', hotel.name);
    });
    
    it(`button calls update query callback${i}`, () => {
      act(() => {
        fireEvent.click(screen.getByTestId('hotelBookButton'));
      })
      expect(updateQueryParams.mock.calls.length).toBe(1);
    });    
  });
}
