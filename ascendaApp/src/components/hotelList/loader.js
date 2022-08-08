import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export default function Loader() {
  return (
    <Grid container justifyContent="center" sx={{ color:'white', display: 'flex' }}>
      <CircularProgress color="inherit" />
    </Grid>
  );
}
