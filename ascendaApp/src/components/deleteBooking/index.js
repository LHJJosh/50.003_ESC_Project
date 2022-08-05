import React, {useState} from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import axios from 'axios';
import "./style.css";
import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ReactDOM from "react-dom/client"
// redirect user to this page to check details after confirm booking 

export default function DeleteBooking(){

    const [info, getInfo] = useState({
        id:"",
        title: "",
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
        emailAddress: "",
        specialRequest: "",
        cardNumber: "",
        nameOnCard: "",
        expiryDate: "",
        cvvCvc: "",
        address: "",
        city: "",
        zipCode: "",
        country: ""
    });

    // const fetchData = () => {
    //     axios.get("/api/bookings")
    //     .then(res => {
    //         const data = res.data
    //         getInfo(data)
    //     })
    //     .catch((err) => console.log(err));
    // } 

    // const booking = ReactDOM();

    // function buildQueryAPI() {
    //     return '/api/bookings/${bookings.info.id}';
    // };

    // function buildQuery() {
    //     return 'api/bookings?booking_id-${bookings.info.id}';
    // }

    // function refreshBooking(queryUrl) {
    //     axios
    //     .get(queryUrl)
    //     .then((res) => getInfo(res.data))
    //     .catch((err) => console.log(err));
    // }

    // React.useEffect(() => {
    //     if (booking.info !== null) {
    //         let queryUrl = buildQuery();
    //         refreshBooking(queryUrl);
    //       }
    //     });

    // const handleClick = bookingId => {
    //     axios
    //     .delete(bookingId)
    //     .catch((err) => console.log(err))
    // }

    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    return(
        <Container component="main" maxWidth="sm">
            <Card
                sx ={{
                color: 'text.secondary',
                borderRadius: 3,
                boxShadow: 1,
                }
                }
            >
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
                <Typography variant="h3" fontFamily={'Roboto'}>
                    THANK YOU FOR BOOKING WITH US
                </Typography>
                {/* <p>
                    Name: {info.title} {info.firstName} {info.lastName}
                    <br></br>
                    Country Code: {info.countryCode}
                    <br></br>
                    Phone Number: {info.phoneNumber}
                    <br></br>
                    Email Address: {info.emailAddress}
                    <br></br>
                    Special Request: {info.specialRequest}
                    <br></br>
                    Card Number used: {info.cardNumber}
                </p>
                <Button></Button> */}
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Booking Confirmation successful! - Confirmation email sent
                            </Alert>
                        </Snackbar>
                    </Stack>
                </Box>
            </Card>
        </Container>
    )
}
