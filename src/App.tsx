import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useMemo } from "react";

function App() {

  const opcoesDatas = useMemo(() => {
    const hoje = new Date();
    return Array.from({ length: 3 }, (_, i) => {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      return data
        .toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        })
        .replace(/[.,]/g, "");
    });
  }, []);

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

      <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={3}>
        <CalendarTodayIcon
          sx={{
            display: { xs: "none", md: "flex" },
            color: "#1976d2",
            fontSize: "1.4rem",
          }}
        />
        <ToggleButtonGroup
          exclusive
          aria-label="escolher data"
        >
          {opcoesDatas.map((data) => (
            <ToggleButton
              key={data}
              value={data}
              sx={{
                "&.Mui-selected": { backgroundColor: "#1976d2", color: "#fff" },
                "&.Mui-selected:hover": { backgroundColor: "#115293" },
              }}
            >
              {data}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}

export default App
