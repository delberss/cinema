import { Box, Card, Chip, Grid, Stack, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useEffect, useMemo, useState } from "react";
import AnimationComponent from "./components/AnimationComponent/AnimationComponent";
import { useCinemaStore } from "./store/useCinemaStore";


interface Filme {
  nome: string;
  image: string;
  descricao: string;
  horariosPorData: Record<string, string[]>;
}

function App() {
  const [infoFilmes, setInfoFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState("");

  const {
    horarioSelecionado,
  } = useCinemaStore();

  const StyledMovies = styled("img")({
    height: "350px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    width: "100%",
  });

  const MovieCard = styled(Card)({
    padding: "16px",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "250px",
    width: "250px",
    position: "relative",
  });

  const HorarioChip = styled(Chip)({
    fontWeight: 500,
    fontSize: "0.95rem",
    transition: "all 0.2s ease",
    "&:hover": { borderColor: "#90caf9", cursor: "pointer" },
  });


  useEffect(() => {
    const carregarFilmes = async () => {
      try {
        const res = await fetch("/data/filmes.json");
        if (!res.ok) throw new Error("Erro ao carregar filmes");
        setInfoFilmes(await res.json());
      } catch {
        setErro("Não foi possível carregar os filmes.");
      } finally {
        setCarregando(false);
      }
    };
    carregarFilmes();
  }, []);

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

      <Grid container justifyContent="center" rowGap={0.5} mb={4} pb={4}>
        {infoFilmes.map((filme, index) => {
          const dataIndex = Math.max(opcoesDatas.indexOf(dataSelecionada), 0);
          const horarios = filme.horariosPorData[dataIndex.toString()] || [];

          return (
            <Grid
              key={filme.nome}
              size={{ xs: 12, sm: 6, md: 4 }}
              display="flex"
              justifyContent="center"
              sx={{ mb: { xs: 2, md: 0 }, mt: { xs: 2, md: 0 } }}
            >
              <AnimationComponent moveDirection={index % 2 === 0 ? "right" : "left"}>
                <MovieCard elevation={2}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {filme.nome}
                  </Typography>

                  <StyledMovies src={filme.image} alt={filme.nome} />

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={2}
                    flexWrap="wrap"
                  >
                    {horarios.map((hora) => {
                      const selecionado =
                        horarioSelecionado?.filme === filme.nome &&
                        horarioSelecionado?.hora === hora;

                      return (
                        <HorarioChip
                          key={hora}
                          label={hora}
                          color={selecionado ? "primary" : "default"}
                          variant={selecionado ? "filled" : "outlined"}
                        />
                      );
                    })}
                  </Stack>
                </MovieCard>
              </AnimationComponent>
            </Grid>
          );
        })}
      </Grid>

    </Box>
  )
}

export default App
