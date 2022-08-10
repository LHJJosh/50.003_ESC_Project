import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import HeaderCard from './header.js';
import { randString, randIntRange } from '../../testUtils.js'

configure({ adapter: new Adapter() });

const TEST_COUNT = 5;
 
for (let i = 0; i < TEST_COUNT; i++) {
   describe('tests for query dropdown', () => {
    let hotel = {
      name: randString(15),
      address: randString(31),
      cloudflare_image_url: randString(31),
      number_of_images: randIntRange(0, 31),
      id: randString(5)
    }

    let instance = null;
    
    beforeEach(() => {
      act(() => {
        instance = shallow(
          <HeaderCard hotelName={hotel.name} 
                      hotelAddress={hotel.address} 
                      hotelImageUrl={hotel.cloudflare_image_url}
                      hotelImageCount={hotel.number_of_images}
                      hotelId={hotel.id}/>
        );
      });
    });
    
    afterEach(() => { 
      cleanup;
    });

    it(`renders with correct hotel image state ${i}`, () => {
      instance.state('imgData').forEach(imgData => {
        expect(imgData.img).toContain(
          `${hotel.cloudflare_image_url}/${hotel.id}/i`,
        );
      });
    });
  });
}
