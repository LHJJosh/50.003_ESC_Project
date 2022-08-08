import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';
import axios from 'axios';

import "./styles.css";

class HotelQueryDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <FormControl fullWidth>
      <InputLabel>{this.props.id}</InputLabel>
      <Select
        labelId={this.props.id}
        id={this.props.id}
        value={this.props.queryParams[[this.props.id]]}
        label={this.props.label}
        onChange={evt => this.props.updateQueryParams(
          {[this.props.id]: evt.target.value}
        )}
      >
        {this.props.isZeroAllowed && <MenuItem className='menuItem' value={0}>0</MenuItem>}
        <MenuItem className='menuItem' value={1}>1</MenuItem>
        <MenuItem className='menuItem' value={2}>2</MenuItem>
        <MenuItem className='menuItem' value={3}>3</MenuItem>
        <MenuItem className='menuItem' value={4}>4</MenuItem>
      </Select>
    </FormControl>
  }
}

class HotelQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCache: [],
      searchIdMap: new Map()
    }
  }

  autoComplete = (evt, key) => {
    if (evt !== null && 
      evt.target.type === 'text' && 
      evt.target.value.length >= 2
    ) {
      let query = `/api/destinations?term=${evt.target.value}`;
      axios
        .get(query)
        .then((res) => {
          let newCache = new Set();
          this.state.searchIdMap.clear();
          res.data.forEach(data => {
            newCache.add(data['term']);
            this.state.searchIdMap.set(data['term'], data['uid']);
          });
          this.setState({searchCache: Array.from(newCache)});
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    return <Card className='search'>
        <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
              <Typography component="h1" variant="h5" align = "left">
                DESTINATION
              </Typography>
              <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <Autocomplete
                    value={this.props.queryParams.destination}
                    options={this.state.searchCache}
                    fullWidth
                    id="destination"
                    onChange={(event, newValue) => 
                      this.props.updateQueryParams({
                        destination_uid: this.state.searchIdMap.get(newValue),
                        destination: newValue
                      }
                    )}
                    onInputChange={this.autoComplete}
                    autoHighlight={true}
                    autoSelect={true}
                    renderInput={(params) => <TextField {...params}
                      label="Destination"
                      id="destination"
                    />}
                  />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField 
                        type="date"
                        required
                        size='small'
                        id="checkInDay"
                        onChange={evt => this.props.updateQueryParams(
                          {[evt.target.id]: evt.target.value}
                        )}
                        label="Check In Day"
                        defaultValue={this.props.queryParams.checkInDay}
                    />      
                  </Grid>
                  <Grid item sm={6}>
                    <TextField 
                        type="date"
                        required
                        size='small'
                        id="checkOutDay"
                        onChange={evt => this.props.updateQueryParams(
                          {[evt.target.id]: evt.target.value}
                        )}
                        label="Check Out Day"
                        defaultValue={this.props.queryParams.checkOutDay}
                    />      
                  </Grid>
                  <Grid item sm={4}>
                    <HotelQueryDropdown id="rooms" label="Rooms"
                                        updateQueryParams={this.props.updateQueryParams}
                                        queryParams={this.props.queryParams}/>
                  </Grid> 
                  <Grid item sm={4}>
                    <HotelQueryDropdown id="adults" label="Adults"
                                        updateQueryParams={this.props.updateQueryParams}
                                        queryParams={this.props.queryParams}/>
                  </Grid>
                  <Grid item sm={4}>
                    <HotelQueryDropdown id="children" label="Children" isZeroAllowed
                                        updateQueryParams={this.props.updateQueryParams}
                                        queryParams={this.props.queryParams}/>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography id="input-slider" gutterBottom>Review Score</Typography>
                    <Slider
                      id='rating'
                      value={this.props.sortParams.rating}
                      valueLabelDisplay="auto"
                      marks={true}
                      min={0}
                      max={5}
                      step={1}
                      onChange={evt => this.props.updateSortParams(
                        {rating: evt.target.value}
                      )}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Typography id="input-slider" gutterBottom>Price</Typography>
                    <Slider
                      id='price'
                      value={this.props.sortParams.price}
                      valueLabelDisplay="auto"
                      marks={true}
                      min={0}
                      max={5000}
                      step={100}
                      onChange={evt => this.props.updateSortParams(
                        {price: evt.target.value}
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
      </Card>
  };
}

export default HotelQuery;
