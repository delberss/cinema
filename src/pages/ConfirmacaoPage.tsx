import { Box, Button, TextField, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useCinemaStore } from "../store/useCinemaStore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmacaoPage() {
  const {
    horarioSelecionado,
    setHorarioSelecionado,
  } = useCinemaStore();

  const navigate = useNavigate();

  const dataSelecionada = horarioSelecionado?.data || "";

  const [erroQuantidade, setErroQuantidade] = useState<string | null>(null);


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
  
    const [quantidadeTemp, setQuantidadeTemp] = useState(
    horarioSelecionado.quantidade?.toString() || "1"
  );
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

        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Filme: <b>{horarioSelecionado.filme}</b>
          </Typography>
          <Box
            textAlign="left"
            mt={{ xs: 2, md: 0 }}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={1.5}
            margin="24px !important"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarTodayIcon sx={{ color: "#1976d2", fontSize: "1.4rem" }} />
              <Typography>Data da sessão</Typography>
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  px: 1.6,
                  py: 0.3,
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {dataSelecionada}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <AccessTimeIcon sx={{ color: "#1976d2", fontSize: "1.4rem" }} />
              <Typography>Horário</Typography>
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  px: 1.6,
                  py: 0.3,
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {horarioSelecionado.hora}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography>🎟️ Quantidade:</Typography>
              <TextField
                type="number"
                value={quantidadeTemp}
                onChange={(e) => {
                  const valor = e.target.value;
                  setQuantidadeTemp(valor);

                  const numero = parseInt(valor, 10);
                  if (!isNaN(numero) && numero >= 1 && numero <= 10) {
                    setHorarioSelecionado({
                      ...horarioSelecionado,
                      quantidade: numero,
                    });
                  }
                }}
                onBlur={() => {
                  let numero = parseInt(quantidadeTemp, 10);

                  if (isNaN(numero) || numero < 1) numero = 1;
                  if (numero > 10) {
                    numero = 10;
                    setErroQuantidade("⚠️ O máximo permitido é 10 ingressos.");
                    setTimeout(() => setErroQuantidade(null), 3000); 
                  }

                  setQuantidadeTemp(numero.toString());
                  setHorarioSelecionado({
                    ...horarioSelecionado,
                    quantidade: numero,
                  });
                }}
                inputProps={{
                  min: 1,
                  max: 10,
                  style: { textAlign: "center" },
                }}
                sx={{
                  width: 60,
                  "& .MuiInputBase-input": { p: 0.5, textAlign: "center" },
                }}
              />

            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}
