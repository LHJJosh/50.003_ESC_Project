import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { top100Films } from './searchCache.js'

import './styles.css'

class HotelSearchInternal extends React.Component {
  render() {
    return <div className='hotelSearch'>
      <Autocomplete
        className='searchAutocomplete'
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Hotel" />}
      />
    </div>
  }
}

export const HotelSearch = HotelSearchInternal;
