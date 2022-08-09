/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import axios from 'axios';

import HotelQuery from './index.js';
import { randString, randIntRange, randDoubleRange, randDate } from '../../testUtils.js'
jest.mock('axios');

const CHANGE_DEST_COUNT = 10;
const CHANGE_SLIDER_COUNT = 5;

let queryParams = {
  hotel_uid: randString(4),
  destination: randString(31),
  destination_uid: randString(4),
  checkInDay: randDate(),
  checkOutDay: randDate(),
  rooms: randIntRange(1, 4),
  adults: randIntRange(1, 4),
  children: randIntRange(0, 4),
}

let sortParams = {
  price: randDoubleRange(0, 5000),
  rating: randIntRange(0, 5)
}

let updateQueryParams = jest.fn();
let updateSortParams = jest.fn();

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    return Promise.resolve({data: [
      {'term': 'a', 'uid': 'a'}
    ]});
  });

  act(() => {
    render(
      <HotelQuery className='hotelQuery' 
                  updateQueryParams={updateQueryParams}
                  updateSortParams={updateSortParams}
                  queryParams={queryParams}
                  sortParams={sortParams}/>
    );
  });
});

afterEach(() => { 
  cleanup;
  jest.clearAllMocks();
});

it("renders with correct default destination", () => {
  expect(screen.queryByDisplayValue(queryParams.destination)).toHaveAttribute(
    'id', 'destination');
  expect(screen.queryByRole('combobox')).toHaveAttribute(
    'value', queryParams.destination);
});

it("renders with correct default check in day", () => {
  expect(screen.queryByTestId('queryCheckInDay').querySelector('input')).toHaveAttribute(
    'value', queryParams.checkInDay.toString()
  );
});

it("renders with correct default check out day", () => {
  expect(screen.queryByTestId('queryCheckOutDay').querySelector('input')).toHaveAttribute(
    'value', queryParams.checkOutDay.toString()
  );
});

it("renders with correct default price", () => {
  expect(screen.queryByTestId('queryPrice').querySelector('input')).toHaveAttribute(
    'value', sortParams.price.toString()
  );
});

it("renders with correct default rating", () => {
  expect(screen.queryByTestId('queryRating').querySelector('input')).toHaveAttribute(
    'value', sortParams.rating.toString()
  );
});

for (let i = 0; i < CHANGE_DEST_COUNT; i++) {
  it("destination can be changed", () => {
    let destAutocomplete = screen.queryByTestId('queryDestination');
    let destInp = destAutocomplete.querySelector('input');
    let testInp = randString(1);
    act(() => {
      destInp.focus();
      fireEvent.change(destInp, { target: { value: testInp } })
      fireEvent.keyDown(destAutocomplete, { key: 'ArrowDown' })
      fireEvent.keyDown(destAutocomplete, {key: 'Enter'});
    });

    expect(destInp).toHaveValue(testInp);
  });
}

for (let i = 0; i < CHANGE_SLIDER_COUNT; i++) {
  it("sort callback count tallies with fields", () => {
    let ratingSlider = screen.queryByTestId('queryRating');
    let ratingInp = ratingSlider.querySelector('input');
    act(() => {
      ratingInp.focus();
      fireEvent.change(ratingInp, { target: { value: "3" } })
      fireEvent.change(ratingInp, { target: { value: "2" } })
    });

    expect(updateSortParams.mock.calls.length).toBe(1);
  });
}
