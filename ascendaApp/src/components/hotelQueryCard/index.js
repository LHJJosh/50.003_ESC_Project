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

import "./styles.css";
import { allCountries } from './searchCache.js'

class HotelQuery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: "",
      adults: "",
      children: "",
      reviewScore: 0,
      price: 1000
    }
  }
  
  handleChange = (evt, key) => {
    if (typeof key !== 'undefined') {
      evt.target.id = key;
      this.setState({[key]: evt.target.value});
    }
    this.props.updateQuery({
      ...this.state,
      [evt.target.id]: evt.target.value
    });
  }

  render() {
    return <Card className='search'>
        <CssBaseline />
          <Box
            sx={{
              marginLeft: 2,
              marginRight: 2,
              marginTop: 2,
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
                    options={allCountries}
                    fullWidth
                    id="destination"
                    onChange={this.handleChange}
                    inputProps={{style: {fontSize: 14, height : 20}}} // font size of input text/>}
                    renderInput={(params) => <TextField {...params}
                    label="Destination"
                    id="destination"
                    autoComplete
                    onChange={this.handleChange}
                  />}
                  />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField 
                        type="date"
                        required
                        size='small'
                        id="checkInDay"
                        onChange={this.handleChange}
                        label="Check In Day"
                    />      
                  </Grid>
                  <Grid item sm={6}>
                    <TextField 
                        type="date"
                        required
                        size='small'
                        id="checkOutDay"
                        onChange={this.handleChange}
                        label="Check Out Day"
                    />      
                  </Grid>
                  <Grid item sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Rooms</InputLabel>
                      <Select
                        labelId="rooms"
                        id="rooms"
                        value={this.state.rooms}
                        label="Rooms"
                        onChange={v => this.handleChange(v, 'rooms')}
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
                        value={this.state.adults}
                        label="Adults"
                        onChange={v => this.handleChange(v, 'adults')}
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
                        value={this.state.children}
                        label="Children"
                        onChange={v => this.handleChange(v, 'children')}
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
                      defaultValue={0}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={true}
                      min={0}
                      max={5}
                      onChange={v => this.handleChange(v, 'reviewScore')}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Typography id="input-slider" gutterBottom>
                      Price
                    </Typography>
                    <Slider
                      defaultValue={1000}
                      step={50}
                      valueLabelDisplay="auto"
                      marks={true}
                      min={0}
                      max={1000}
                      onChange={v => this.handleChange(v, 'price')}
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