import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material';
function SuspenseLoader() {
  return (
    <Box>
        <CircularProgress/>
        <Typography>Loading....</Typography>
    </Box>
  )
}

export default SuspenseLoader
