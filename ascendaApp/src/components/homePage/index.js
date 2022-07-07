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


export default function HomePage() {
  const [num, setNum] = React.useState('');
  const handleChange = (event) => {
    setNum(event.target.value);
  };

  return(
    <Card className='search'>
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
                    <TextField
                      fullWidth
                      id="Destination"
                      label="Destination"
                      inputProps={{style: {fontSize: 14, height : 20}}} // font size of input text
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                        type="date"
                        required
                        size='small'
                        id="checkInDay"
                        name="Check In Day"
                    />      
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                        type="date"
                        required
                        size='small'
                        id="checkOutDay"
                        name="Check Out Day"
                    />      
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel id="rooms">Rooms</InputLabel>
                      <Select
                        labelId="rooms"
                        id="rooms"
                        value={num}
                        label="Rooms"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel id="adults">Adults</InputLabel>
                      <Select
                        labelId="adults"
                        id="adults"
                        value={num}
                        label="Adults"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel id="rooms">Children</InputLabel>
                      <Select
                        labelId="children"
                        id="children"
                        value={num}
                        label="Children"
                        onChange={handleChange}
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
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
      // <div class="search">
      //     Destination
      //     <br></br><input type="text" placeholder="Search Destination"/>
      //     <br></br> Check in day
      //     <br></br><input type="date" id="check in" name="Check in day"/>
      //     <br></br> Check out day
      //     <br></br><input type="date" id="check out" name="Check out day"/>
      // </div>
  );
}