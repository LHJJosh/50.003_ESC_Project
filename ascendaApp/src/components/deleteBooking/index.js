import React, {useState} from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import axios from 'axios';
import "./style.css";
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// redirect user to this page to check details after confirm booking 

export default function DeleteBooking(){

    const [info, getInfo] = useState('');

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("/api/bookings")
        .then(res => {
            const data = res.data
            getInfo(data)
        })
        .catch((err) => console.log(err));
    }

    const deleteBooking = (id) => {
        axios.delete('api/bookings/${id}/')
        .then((res) => {
            fetchData();
        });
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
