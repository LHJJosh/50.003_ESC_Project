import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import axios from 'axios';

import HotelQuery from './index.js';
import { randString, randIntRange, randDate, randDoubleRange} from '../../testUtils.js'

const AXIOS_TEST_COUNTS = 10;

configure({ adapter: new Adapter() });
jest.mock('axios');

for (let i = 0; i < AXIOS_TEST_COUNTS; i++) {
  describe('axios test for autocomplete', () => {
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
    let autocompleteRes = [];
    for (let i = 0; i < randIntRange(1, 7); i++) {
      autocompleteRes.push({
        'term': randString(31),
        'uid': randString(5)
      });
    }
    let searchCache = [];
    let searchMap = new Map();
    autocompleteRes.forEach(data => {
      searchMap.set(data['term'], data['uid']);
      searchCache.push(data['term']);
    });
    
    var instance = null;
    let event = {target: {
      type: 'text',
      value: randString(2)
    }}
    
    beforeEach(() => {
      axios.get.mockImplementation((url) => {
        return Promise.resolve({data: autocompleteRes});
      });
      
      act(() => {
        instance = shallow(
          <HotelQuery className='hotelQuery' 
                      updateQueryParams={updateQueryParams}
                      updateSortParams={updateSortParams}
                      queryParams={queryParams}
                      sortParams={sortParams}/>
        );
      });
    
      let destAutocomplete = instance.find({'data-testid': 'queryDestination'});
      destAutocomplete.prop('onInputChange')(event, undefined);
    });
    
    afterEach(() => { cleanup });
    
    it(`api is called on autocomplete suggestion ${i}`, () => {
      expect(axios.get).toHaveBeenCalled();
    });
    
    it(`api is called with correct url ${i}`, () => {
      expect(axios.get).toHaveBeenCalledWith(
        `/api/destinations?term=${event.target.value}`
      );
    });
    
    it(`api is called with correct url ${i}`, () => {
      expect(instance.state('searchCache')).toEqual(searchCache);
    });
    
    it(`api is called with correct url ${i}`, () => {
      expect(instance.state('searchIdMap')).toEqual(searchMap);
    });
  });
}
