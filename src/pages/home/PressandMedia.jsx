import React from 'react'
import { Box, Container, Typography } from '@mui/material'

export const PressandMedia = () => {
  return (
    <Box sx={{ minHeight: "50vh", py: { xs: 4, md: 6 }, pb: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Press & Media
        </Typography>
        <Typography variant="body1">
          Press and media content coming soon...
        </Typography>
      </Container>
    </Box>
  )
}
