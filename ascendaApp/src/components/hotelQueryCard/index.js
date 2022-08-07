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

class HotelQuery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchCache: [],
      searchIdMap: new Map()
    }
  }

  autoComplete = (evt, key) => {
    if (evt !== null && evt.target.value.length >= 2) {
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
                    defaultValue={this.props.queryParams.destination}
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
                    <FormControl fullWidth>
                      <InputLabel>Rooms</InputLabel>
                      <Select
                        labelId="rooms"
                        id="rooms"
                        value={this.props.queryParams.rooms}
                        label="Rooms"
                        onChange={evt => this.props.updateQueryParams(
                          {rooms: evt.target.value}
                        )}
                      >
                        <MenuItem className='menuItem' value={1}>1</MenuItem>
                        <MenuItem className='menuItem' value={2}>2</MenuItem>
                        <MenuItem className='menuItem' value={3}>3</MenuItem>
                        <MenuItem className='menuItem' value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> 
                  <Grid item sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Adults</InputLabel>
                      <Select
                        labelId="adults"
                        id="adults"
                        value={this.props.queryParams.adults}
                        label="Adults"
                        onChange={evt => this.props.updateQueryParams(
                          {adults: evt.target.value}
                        )}
                      >
                        <MenuItem className='menuItem' value={1}>1</MenuItem>
                        <MenuItem className='menuItem' value={2}>2</MenuItem>
                        <MenuItem className='menuItem' value={3}>3</MenuItem>
                        <MenuItem className='menuItem' value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Children</InputLabel>
                      <Select
                        labelId="children"
                        id="children"
                        value={this.props.queryParams.children}
                        label="Children"
                        onChange={evt => this.props.updateQueryParams(
                          {children: evt.target.value}
                        )}
                      >
                        <MenuItem className='menuItem' value={0}>0</MenuItem>
                        <MenuItem className='menuItem' value={1}>1</MenuItem>
                        <MenuItem className='menuItem' value={2}>2</MenuItem>
                        <MenuItem className='menuItem' value={3}>3</MenuItem>
                        <MenuItem className='menuItem' value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography id="input-slider" gutterBottom>
                      Review Score
                    </Typography>
                    <Slider
                      id='rating'
                      defaultValue={this.props.sortParams.rating}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={true}
                      min={0}
                      max={5}
                      onChange={evt => this.props.updateSortParams(
                        {rating: evt.target.value}
                      )}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Typography id="input-slider" gutterBottom>
                      Price
                    </Typography>
                    <Slider
                      id='price'
                      defaultValue={this.props.sortParams.price}
                      step={100}
                      valueLabelDisplay="auto"
                      marks={true}
                      min={0}
                      max={2000}
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

/*export default class CreateRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      errorMsg: "",
      successMsg: "",
    };
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

handleRoomButtonPressed() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      votes_to_skip: this.state.votesToSkip,
      guest_can_pause: this.state.guestCanPause,
    }),
  };
  fetch("/api/create-room", requestOptions)
    .then((response) => response.json())
    .then((data) => this.props.history.push("/room/" + data.code));
}

renderCreateButtons() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
    </Grid>
  );
}
}*/