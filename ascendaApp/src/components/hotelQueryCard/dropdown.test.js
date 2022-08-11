/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import HotelQueryDropdown from './dropdown.js';
import { randString, randBoolean, randIntRange } from '../../testUtils.js'

const TEST_COUNT = 10;

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

for (let i = 0; i < TEST_COUNT; i++) {
  describe('test dropdown render and callbacks', () => {
    it(`renders with correct id ${i}`, () => {
      expect(screen.queryByRole('button')).toHaveAttribute('id', id);
    });
    
    it(`renders with correct label ${i}`, () => {
      let buttonElement = screen.queryByRole('button');
      fireEvent.mouseDown(buttonElement);
      let listBoxElement = screen.queryByRole('listbox');
      expect(listBoxElement).toHaveAttribute('aria-labelledby', id);
    });
    
    it(`renders with correct menu items ${i}`, () => {
      let buttonElement = screen.queryByRole('button');
      fireEvent.mouseDown(buttonElement);
      let menuItems = screen.queryAllByTestId('menuItem');
      let i = 1;
    
      menuItems.forEach(menuItem => {
        expect(menuItem).toHaveAttribute('data-value', i.toString());
        i++;
      });
    });
    
    it(`triggers callback on menu item click ${i}`, () => {
      let buttonElement = screen.queryByRole('button');
      act(() => {
        fireEvent.mouseDown(buttonElement);
      })

      let menuItems = screen.queryAllByTestId('menuItem');
      let newIdx = randIntRange(0, menuItems.length - 1);
      while (newIdx === value - 1) {
        newIdx = randIntRange(0, menuItems.length - 1);
      }

      act(() => {
        fireEvent.click(menuItems[newIdx]);
      });
  
      expect(updateQueryParams.mock.calls.length).toBe(1);
    });
  })
}
