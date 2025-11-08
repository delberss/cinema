import { Box, Typography } from "@mui/material";

function App() {

  return (
    <Box textAlign="center" mt={2} mb={6}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          color: "primary.main", 
          background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: { xs: "0.5px", md: "1px" },
          textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          whiteSpace: "nowrap",
        }}
      >
        🎬 Cinema Cidade
      </Typography>
    </Box>
  )
}

export default App
