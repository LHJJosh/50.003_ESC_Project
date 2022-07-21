import * as React from 'react';
import Button from '@mui/material/Button';
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
import { Link } from "react-router-dom";
import "./styles.css";


class HotelQuery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: "",
      adults: "",
      children: ""
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
              marginLeft: 1,
              marginRight: 1,
              marginTop: 1,
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
                    <TextField
                      fullWidth
                      id="destination"
                      label="Destination"
                      onChange={this.handleChange}
                      inputProps={{style: {fontSize: 14, height : 20}}} // font size of input text
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                        type="date"
                        required
                        size='small'
                        id="checkInDay"
                        onChange={this.handleChange}
                        label="Check In Day"
                    />      
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                        type="date"
                        required
                        size='small'
                        id="checkOutDay"
                        onChange={this.handleChange}
                        label="Check Out Day"
                    />      
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12}>
                    <Button
                      component={Link} to="/hotelsearch"
                      fullWidth
                      variant="contained"
                    >
                      Search Destination
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
      </Card>
  };  
      // <div class="search">
      //     Destination
      //     <br></br><input type="text" placeholder="Search Destination"/>
      //     <br></br> Check in day
      //     <br></br><input type="date" id="check in" name="Check in day"/>
      //     <br></br> Check out day
      //     <br></br><input type="date" id="check out" name="Check out day"/>
      // </div>
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