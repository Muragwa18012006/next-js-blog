import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function loading() {
  return (
    <Box sx={{ display: 'flex' }} className="mt-[20%] ml-[50%]">
      <CircularProgress />
    </Box>
  );
}
