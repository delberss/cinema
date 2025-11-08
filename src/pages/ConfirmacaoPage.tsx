import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import { useCinemaStore } from "../store/useCinemaStore";
import {  useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function ConfirmacaoPage() {
  const {
    horarioSelecionado,
    ingressosComprados,
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

  const ingressoExistente = useMemo(() => {
    if (!horarioSelecionado) return null;
    return ingressosComprados.find(
      (ing) => ing.filme === horarioSelecionado.filme
    );
  }, [horarioSelecionado, ingressosComprados]);

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
          <Box>
            {ingressoExistente && (
              <Box
                mt={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <Typography color="warning.main" fontWeight={600}>
                  ⚠️ Você já possui ingresso para este filme:
                </Typography>

                <Card sx={{ width: "320px", textAlign: "left" }}>
                  <CardContent>
                    <Typography variant="h6">{ingressoExistente.filme}</Typography>
                    <Typography>Data: {ingressoExistente.data}</Typography>
                    <Typography>Horário: {ingressoExistente.hora}</Typography>
                    <Typography>Quantidade: {ingressoExistente.quantidade}</Typography>
                    <Typography>
                      Valor total: R$ {ingressoExistente.valor.toFixed(2)}
                    </Typography>
                    <Typography color="text.secondary">
                      Data da compra: {ingressoExistente.dataCompra}
                    </Typography>
                  </CardContent>
                </Card>

                <Typography variant="body2" color="text.secondary">
                  Se desejar, você pode comprar outro ingresso para este filme.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2.5, sm: 2 }}
        justifyContent="center"
        alignItems="center"
        mt={4}
        mb={{ xs: 6, sm: 4 }}
      >
        <Button
          variant="outlined"
          color="info"
          onClick={() => navigate('/')}
          sx={{ px: 3, minWidth: 140 }}
        >
          Voltar para tela inicial
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={!dataSelecionada}
          onClick={() => navigate("/pagamento")}
          sx={{ px: 3, minWidth: 220 }}
        >
          Avançar para Pagamento
        </Button>

        {
          ingressoExistente &&
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/meusingressos")}
            sx={{ px: 3, minWidth: 180 }}
          >
            Ver Meus Ingressos
          </Button>
        }
      </Stack>
    </Box>
  );
}
