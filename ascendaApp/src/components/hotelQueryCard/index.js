import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';
import axios from 'axios';

import HotelQueryDropdown from './dropdown';
import "./styles.css";

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
                    data-testid='queryDestination'
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
                        data-testid='queryCheckInDay'
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
                        data-testid='queryCheckOutDay'
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
                      data-testid='queryRating'
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
                      data-testid='queryPrice'
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
      </Card>
  };
}

export default HotelQuery;
