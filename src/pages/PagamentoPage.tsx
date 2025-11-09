import {
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Fade,
  Card,
  CardContent,
  Divider,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { useCinemaStore } from "../store/useCinemaStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MovieIcon from "@mui/icons-material/Movie";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function PagamentoPage() {
  const { horarioSelecionado, usuario, adicionarIngresso } = useCinemaStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pagamentoFeito, setPagamentoFeito] = useState(false);
  const [copied, setCopied] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const valorUnitario = 29.9;
  const quantidade = horarioSelecionado?.quantidade || 1;
  const valorTotal = valorUnitario * quantidade;
  const isDevMode = true;

  const pixPayload = `00020126360014BR.GOV.BCB.PIX0114+559999999999520400005303986540${valorTotal.toFixed(
    2
  )}5802BR5920Cinema Cidade6009SAO PAULO62070503***6304ABCD`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmarPagamento = () => {
    if (!horarioSelecionado) {
      alert("Selecione um filme antes de prosseguir com o pagamento.");
      navigate("/");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPagamentoFeito(true);

      const novoIngresso = {
        id: Date.now().toString(),
        filme: horarioSelecionado.filme,
        data: horarioSelecionado.data,
        hora: horarioSelecionado.hora,
        valor: valorTotal,
        quantidade,
        dataCompra: new Date().toLocaleString("pt-BR"),
      };

      adicionarIngresso(novoIngresso);

      setTimeout(() => navigate("/meusingressos"), 2000);
    }, 2000);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        textAlign="center"
      >
        <CircularProgress size={60} thickness={5} color="success" />
        <Typography mt={3} fontSize="1.2rem">
          Processando pagamento...
        </Typography>
      </Box>
    );
  }

  if (pagamentoFeito) {
    return (
      <Fade in timeout={600}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="80vh"
          textAlign="center"
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 90, color: "success.main" }} />
          <Typography mt={2} fontSize="1.5rem" fontWeight="bold">
            Pagamento confirmado!
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Seus ingressos foram salvos em “Meus ingressos”.
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Box textAlign="center" mt={2} mb={6}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        <QrCodeIcon color="success" /> Pagamento via PIX
      </Typography>

      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
        mt={2}
      >
        <Grid
          container
          size={{ xs: 12, md: 5 }}
          sx={{
            alignItems: "flex-end",
            justifyContent: { xs: "center", md: "flex-end" },
            pr: { xs: 0, md: 4 },
          }}
        >
          <Card
            sx={{
              maxWidth: 400,
              boxShadow: 3,
              borderRadius: 3,
              mb: 2,
              mr: { xs: 0, md: 4 },
            }}
          >
            <CardContent>
              <Stack spacing={1.5} alignItems="flex-start">
                <Box display="flex" alignItems="center" gap={1}>
                  <MovieIcon color="primary" />
                  <Typography fontWeight="bold">
                    {horarioSelecionado?.filme}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <EventIcon color="primary" />
                  <Typography>{horarioSelecionado?.data}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon color="primary" />
                  <Typography>{horarioSelecionado?.hora}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="primary" />
                  <Typography>{usuario?.email}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <ConfirmationNumberIcon color="primary" />
                  <Typography>Qtd: {quantidade}</Typography>
                </Box>

                <Divider sx={{ width: "100%", my: 1 }} />

                <Typography>
                  💰 Valor unitário: <b>R$ {valorUnitario.toFixed(2)}</b>
                </Typography>
                <Typography>
                  💵 Total: <b>R$ {valorTotal.toFixed(2)}</b>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid container size={{ xs: 12, md: 5 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            {!isMobile ? (
              <>
                <Typography mb={2} color="text.secondary">
                  Escaneie o QR Code abaixo para realizar o pagamento:
                </Typography>
                <QRCodeCanvas value={pixPayload} size={220} />
                <Button
                  variant="contained"
                  color={copied ? "success" : "primary"}
                  startIcon={<ContentCopyIcon />}
                  sx={{ mt: 2 }}
                  onClick={handleCopyPix}
                >
                  {copied ? "Copiado!" : "Copiar código PIX"}
                </Button>
              </>
            ) : (
              <>
                <Typography mb={2} color="text.secondary">
                  Copie o código PIX abaixo e cole no seu aplicativo bancário:
                </Typography>
                <Button
                  variant="contained"
                  color={copied ? "success" : "primary"}
                  startIcon={<ContentCopyIcon />}
                  sx={{ mt: 2 }}
                  onClick={handleCopyPix}
                >
                  {copied ? "Copiado!" : "Copiar código PIX"}
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>

      {isDevMode && (
        <Alert severity="info" sx={{ mt: 4, maxWidth: 500, mx: "auto" }}>
          🔧 <strong>Modo desenvolvedor ativo</strong> — clique em{" "}
          <b>“Simular Pagamento Confirmado”</b> para testar o fluxo.
        </Alert>
      )}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <Button variant="outlined" color="info" onClick={() => navigate(-1)}>
          Voltar
        </Button>

        {isDevMode && (
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmarPagamento}
          >
            ✅ Simular Pagamento Confirmado
          </Button>
        )}
      </Stack>
    </Box>
  );
}
