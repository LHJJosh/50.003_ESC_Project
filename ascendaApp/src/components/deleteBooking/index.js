import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import axios from 'axios';
import "./style.css";
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// redirect user to this page to check details after confirm booking 

export default function DeleteBooking(){

    const [info, getInfo] = useState({
        title: "",
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
        emailAddress: "",
        specialRequest: "",
        cardNumber: "",
    });

    const fetchData = () => {
        axios.get("http://localhost:8000/api/bookings")
        .then(res => {
            const data = res.data
            getInfo(data)
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchData()
    }, []);

    function handleClick() {
        if (window.confirm("Are you sure you would like to cancel this booking?")){
            alert("Booking cancellation successful!");
            axios
            .delete(info)
            .catch((err) => console.log(err))
    
        } else {
            alert("Cancelled booking deletion process");
        }
    }

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
                    marginLeft: 6,
                    marginRight: 6,
                    marginTop: 6,
                    marginBottom: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography variant="h3" fontFamily={'Roboto'}>
                    THANK YOU FOR BOOKING WITH US
                </Typography>
                <br></br>
                <p>
                    Booking ID: {info.id}
                    <br></br>
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
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleClick}>
                    Delete Booking 
                </Button>
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
