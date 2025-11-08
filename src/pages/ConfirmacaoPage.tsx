import { Box, Button, Typography } from "@mui/material";
import { useCinemaStore } from "../store/useCinemaStore";

import { useNavigate } from "react-router-dom";

export default function ConfirmacaoPage() {
  const {
    horarioSelecionado,
  } = useCinemaStore();

  const navigate = useNavigate();


  const infoFilmes = [
    {
      nome: "Interstellar",
      image: "/images/interstellar.png",
    },
    {
      nome: "Efeito Borboleta",
      image: "/images/efeito-borboleta.jpg",
    },
    {
      nome: "Questão de Tempo",
      image: "/images/questao-tempo.jpg",
    },
  ];

  const filmeAtual = infoFilmes.find(
    (f) => f.nome === horarioSelecionado?.filme
  );

  if (!horarioSelecionado) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography>⚠️ Nenhum filme selecionado.</Typography>
        <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate("/")}>
          Voltar aos filmes
        </Button>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={2} mb={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🎬 Confirmação de Ingresso
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ xs: "center", md: "flex-start" }}
        gap={4}
        mt={4}
        mb={3}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          gap={1.5}
        >

          {filmeAtual && (
            <Box
              component="img"
              src={filmeAtual.image}
              alt={filmeAtual.nome}
              sx={{
                width: { xs: "280px", md: "320px" },
                height: { xs: "400px", md: "440px" },
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
