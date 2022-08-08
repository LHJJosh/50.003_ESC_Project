import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import HotelListCard from './hotelListCard.js';

function getRandomString() {
  return "a";
}

function getRandomNumber() {
  return 1;
}

function getRandomDate() {
  let start = new Date();
  let end = new Date(start.getFullYear(), 12-1, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let hotel = {
  name: getRandomString(),
  cloudflare_image_url: getRandomString(),
  id: getRandomString(),
  address: getRandomString(),
  price: getRandomNumber(),
  rating: getRandomNumber(),
  distance: getRandomNumber()
}

let queryParams = {
  destination_uid: getRandomString(),
  checkInDay: getRandomDate(),
  checkOutDay: getRandomDate(),
  rooms: getRandomNumber(),
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

it("renders with correct name", () => {
  expect(screen.queryByTestId('hotelName')).toHaveTextContent(hotel.name);
});

it("renders with correct address", () => {
  expect(screen.queryByTestId('hotelAddress')).toHaveTextContent(hotel.address);
});

it("renders with correct distance", () => {
  expect(screen.queryByTestId('hotelDistance')).toHaveTextContent(
    `${(parseFloat(hotel.distance)).toFixed(1)} km from city centre`
  );
});

it("renders with correct rating", () => {
  expect(screen.queryByTestId('hotelRating')).toHaveAttribute(
    'aria-label', `${hotel.rating} Star`);
});

it("renders with correct image", () => {
  expect(screen.queryByTestId('hotelImg')).toHaveAttribute('src',
    `${hotel.cloudflare_image_url}/${hotel.id}/i1.jpg`
  );
});

it("renders with correct image alt", () => {
  expect(screen.queryByTestId('hotelImg')).toHaveAttribute('alt', hotel.name);
});

it("button calls update query callback", () => {
  act(() => {
    fireEvent.click(screen.getByTestId('hotelBookButton'));
  })
  expect(updateQueryParams.mock.calls.length).toBe(1);
});
