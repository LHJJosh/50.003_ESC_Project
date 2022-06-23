import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import PickDate from "./pageComponents/datePicker";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const [value, setValue] = React.useState<Date | null>(null);
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AirlineSeatReclineExtraIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align = "left">
            Primary Guest
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} columns={30}>
              <Grid item xs={30} sm={6}>
                <TextField
                  autoComplete="title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={30} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={30} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={30} sm={15}>
                <TextField
                  required
                  fullWidth
                  id="countryCode"
                  label="Country Code"
                  name="countryCode"
                  autoComplete="Country Code"
                />
              </Grid>
              <Grid item xs={30} sm={15}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="phoneNumber"
                  id="phoneNumber"
                  autoComplete="Phone Number"
                />
              </Grid>
              <Grid item xs={30}>
                <TextField
                  required
                  fullWidth
                  name="specialRequest"
                  label="Special Request"
                  type="specialRequest"
                  id="specialRequest"
                  autoComplete="Special Request"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br>
        </br>
        <Typography component="h1" variant="h5" align = "left">
            Primary Guest
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} columns={30}>
              <Grid item xs={30} sm={10}>
                <TextField
                  autoComplete="membership-number"
                  name="membershipNumber"
                  required
                  fullWidth
                  id="membershipNumber"
                  label="Membership Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={30} sm={10}>
                <TextField
                  autoComplete="membership-name"
                  name="membershipName"
                  required
                  fullWidth
                  id="membershipName"
                  label="Membership Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={30} sm={10}>
                <TextField
                  required
                  fullWidth
                  id="membershipLastName"
                  label="Membership Last Name"
                  name="membershipLastName"
                  autoComplete="membership-last-name"
                />
              </Grid>
            </Grid>
          </Box>
        <br>
        </br>

        <Typography component="h1" variant="h5">
            Payment Details
        </Typography>

        <Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} columns={30}>
              <Grid item xs={30} sm={15}>
                <TextField
                  autoComplete="card-number"
                  name="cardNumber"
                  required
                  fullWidth
                  id="cardNumber"
                  label="Card Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={30} sm={15}>
                <TextField
                  required
                  fullWidth
                  id="nameOnCard"
                  label="Name On Card"
                  name="nameOnCard"
                  autoComplete="name-on-card"
                />
              </Grid>
              <Grid item xs={30} sm={15}>
                <TextField 
                    type="date"
                    required
                    fullWidth
                    id="date"
                    name="date"
                    /*defaultValue={moment().format("yyyy-mm-dd")}  
                    onChange={endDate}
                    InputProps={{inputProps: { min: "2020-05-01", max: "2020-05-04"} }}*/
                />      
              </Grid>
              <Grid item xs={30} sm={15}>
                <TextField
                  required
                  fullWidth
                  id="nameOnCard"
                  label="Name On Card"
                  name="nameOnCard"
                  autoComplete="name-on-card"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm Booking
            </Button>
          </Box>
        </Box>

        <br>
        </br>

        <Typography component="h1" variant="h5">
            Your Details
        </Typography>

        <Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} columns={30}>
              <Grid item xs={30} sm={15}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={30} sm={15}>
                <TextField
                  required
                  fullWidth
                  id="emailAddress"
                  label="Email Address"
                  name="emailAddress"
                  autoComplete="email-address"
                />
              </Grid>
              <Grid item xs={30}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive marketing promotions and updates via email from Ascenda."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm Booking
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}



