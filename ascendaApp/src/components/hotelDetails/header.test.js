/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen, cleanup } from "@testing-library/react";

import HeaderCard from './header.js';
import { randString, randIntRange } from '../../testUtils.js'

const TEST_COUNT = 5;
 
for (let i = 0; i < TEST_COUNT; i++) {
   describe('tests for query dropdown', () => {
    let state = {
      name: randString(15),
      address: randString(31),
      cloudflare_image_url: randString(31),
      number_of_images: randIntRange(0, 31),
      id: randString(5)
    } 
    
    beforeEach(() => {
      act(() => {
        render(
          <HeaderCard hotelName={state.name} 
                      hotelAddress={state.address} 
                      hotelImageUrl={state.cloudflare_image_url}
                      hotelImageCount={state.number_of_images}
                      hotelId={state.id}/>
        );
      });
    });
    
    afterEach(() => { 
      cleanup;
    });

    it(`renders with correct hotel name ${i}`, () => {
      expect(screen.queryByTestId('headerHotelName')).toHaveTextContent(
        state.name);
    });
    
    it(`renders with correct hotel address ${i}`, () => {
      expect(screen.queryByTestId('headerHotelAddress')).toHaveTextContent(
        state.address);
    });
  });
}
