import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./styles.css";

export default function HomePage() {
  return(
    <Card className='search'>
       <CssBaseline />
          <Box
            sx={{
              marginLeft: 2,
              marginRight: 2,
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
              
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