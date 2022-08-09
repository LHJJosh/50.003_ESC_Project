/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import HotelQueryDropdown from './dropdown.js';
import { randString, randBoolean, randIntRange } from '../../testUtils.js'

const CLICK_UPDATE_COUNT = 5;
const CLICK_CALLBACK_COUNT = 5;

let id = randString(31);
let label = randString(31);
let isZeroAllowed = randBoolean();
let updateQueryParams = jest.fn();
let queryParams = {};
let value = randIntRange(1, 4);
queryParams[id] = value;

beforeEach(() => {
  act(() => {
    render(
      <HotelQueryDropdown id={id} label={label}
                          updateQueryParams={updateQueryParams}
                          queryParams={queryParams}
                          isZeroAllowed={isZeroAllowed}/>
    );
  });
});

afterEach(() => { 
  cleanup;
  jest.clearAllMocks();
});

it("renders with correct id", () => {
  expect(screen.queryByRole('button')).toHaveAttribute('id', id);
});

it("renders with correct label", () => {
  let buttonElement = screen.queryByRole('button');
  fireEvent.mouseDown(buttonElement);
  let listBoxElement = screen.queryByRole('listbox');
  expect(listBoxElement).toHaveAttribute('aria-labelledby', id);
});

it("renders with correct menu items", () => {
  let buttonElement = screen.queryByRole('button');
  fireEvent.mouseDown(buttonElement);
  let menuItems = screen.queryAllByTestId('menuItem');
  let i = 1;

  menuItems.forEach(menuItem => {
    expect(menuItem).toHaveAttribute('data-value', i.toString());
    i++;
  });
});

for (let i = 0; i < CLICK_CALLBACK_COUNT; i++) {
  it(`triggers callback on menu item click ${i}`, () => {
    let buttonElement = screen.queryByRole('button');
    fireEvent.mouseDown(buttonElement);
    let menuItems = screen.queryAllByTestId('menuItem');
    fireEvent.click(menuItems[0]);

    expect(updateQueryParams.mock.calls.length).toBe(1);
  });
}

for (let i = 0; i < CLICK_UPDATE_COUNT; i++) {
  it(`updates right value on item click ${i}`, () => {
    let buttonElement = screen.queryByRole('button');
    fireEvent.mouseDown(buttonElement);
    let menuItems = screen.queryAllByTestId('menuItem');
    
    let randomChoice = randIntRange(0, menuItems.length - 1);
    fireEvent.click(menuItems[randomChoice]);
  
    let expectedValue = menuItems[0].getAttribute('data-value');
    expect(screen.queryByText(expectedValue)).toBeInTheDocument();
  });  
}