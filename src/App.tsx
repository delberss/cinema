import {
  Box,
  Grid,
  styled,
  Typography,
  Chip,
  Stack,
  Card,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Fade,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
import AnimationComponent from "./components/AnimationComponent/AnimationComponent";
import { useCinemaStore } from "./store/useCinemaStore";

interface Filme {
  nome: string;
  image: string;
  descricao: string;
  horariosPorData: Record<string, string[]>;
}

function App() {
  const navigate = useNavigate();
  const {
    horarioSelecionado,
    setHorarioSelecionado,
    isLoggedIn,
    setIsLoggedIn,
    setUsuario,
  } = useCinemaStore();

  const [infoFilmes, setInfoFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filmeAviso, setFilmeAviso] = useState<string | null>(null);

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

  const [dataSelecionada, setDataSelecionada] = useState(
    horarioSelecionado?.data || ""
  );

  useEffect(() => {
    if (!dataSelecionada && opcoesDatas.length > 0)
      setDataSelecionada(opcoesDatas[0]);
  }, [dataSelecionada, opcoesDatas]);

  const StyledMovies = styled("img")({
    height: "350px",
    objectFit: "contain",
    padding: "2px",
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

  const AvancarButton = styled(Button)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: 600,
    borderRadius: "8px",
    padding: "10px 20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#115293",
      transform: "translate(-50%, -50%) scale(1.05)",
    },
  });

  const AvisoBox = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0,0,0,0.75)",
    color: "#fff",
    fontWeight: 600,
    borderRadius: "8px",
    padding: "10px 16px",
    fontSize: "0.9rem",
    zIndex: 2,
  });

  // 🔹 Handlers
  const handleSelecionarHorario = useCallback(
    (filme: string, hora: string) => {
      if (
        horarioSelecionado?.filme === filme &&
        horarioSelecionado?.hora === hora
      ) {
        setHorarioSelecionado(null);
      } else {
        setHorarioSelecionado({
          filme,
          hora,
          data: dataSelecionada || opcoesDatas[0],
          quantidade: 1,
        });
      }
      setFilmeAviso(null);
    },
    [horarioSelecionado, dataSelecionada, opcoesDatas, setHorarioSelecionado]
  );

  const handleSelecionarData = useCallback(
    (_: React.MouseEvent<HTMLElement>, novaData: string) => {
      if (!novaData) return;
      setDataSelecionada(novaData);
      if (horarioSelecionado)
        setHorarioSelecionado({ ...horarioSelecionado, data: novaData });
    },
    [horarioSelecionado, setHorarioSelecionado]
  );

  const handleAvancar = useCallback(
    () => navigate(isLoggedIn ? "/confirmacao" : "/login"),
    [isLoggedIn, navigate]
  );

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUsuario(null);
    setHorarioSelecionado(null);
    navigate("/");
  }, [setIsLoggedIn, setUsuario, setHorarioSelecionado, navigate]);

  const handleClickCard = (filme: string) => {
    if (!horarioSelecionado || horarioSelecionado.filme !== filme) {
      setFilmeAviso(filme);
      setTimeout(() => setFilmeAviso(null), 2000);
    }
  };

  if (carregando)
    return <Typography align="center" mt={6}>Carregando filmes...</Typography>;

  if (erro)
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">{erro}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </Box>
    );

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
          value={dataSelecionada}
          exclusive
          onChange={handleSelecionarData}
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

      {isLoggedIn && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            position: { xs: "static", md: "absolute" },
            justifyContent: { xs: "center", md: "flex-end" },
            mt: { xs: 2, md: 0 },
            right: { md: 32 },
            top: { md: 32 },
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/meusingressos")} size="small">
            Meus ingressos
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout} size="small">
            Sair
          </Button>
        </Box>
      )}

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
                <MovieCard elevation={2} onClick={() => handleClickCard(filme.nome)}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {filme.nome}
                  </Typography>

                  <Box
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    onClick={() => handleClickCard(filme.nome)}
                  >
                    <StyledMovies src={filme.image} alt={filme.nome} />

                    {horarioSelecionado?.filme === filme.nome ? (
                      <AvancarButton onClick={handleAvancar}>Avançar</AvancarButton>
                    ) : (
                      <Fade in={filmeAviso === filme.nome}>
                        <AvisoBox>Selecione um horário</AvisoBox>
                      </Fade>
                    )}
                  </Box>

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
                          onClick={() => handleSelecionarHorario(filme.nome, hora)}
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
  );
}

export default App;
