import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { useCinemaStore } from "../store/useCinemaStore";
import { useNavigate } from "react-router-dom";

export default function MeusIngressosPage() {
  const { ingressosComprados, usuario, isLoggedIn } =
    useCinemaStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <Box textAlign="center" mt={2} mb={6}>
      <Typography variant="h4" gutterBottom>
        🎟️ Meus Ingressos
      </Typography>

      <Typography variant="subtitle1" color="text.secondary">
        Usuário: <b>{usuario?.email}</b>
      </Typography>

      {ingressosComprados.length === 0 ? (
        <Typography mt={4}>Você ainda não comprou ingressos.</Typography>
      ) : (
        <Box
          mt={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          {ingressosComprados.map((ingresso) => (
            <Card
              key={ingresso.id}
              sx={{
                width: { xs: "90vw", sm: "60vw" },
                textAlign: "left",
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {ingresso.filme}
                </Typography>
                <Typography>📅 Data: {ingresso.data}</Typography>
                <Typography>🕓 Horário: {ingresso.hora}</Typography>
                <Typography>🎟️ Quantidade: {ingresso.quantidade}</Typography>
                <Typography>
                  💰 Valor total: R$ {ingresso.valor.toFixed(2)}
                </Typography>

                <Typography color="text.secondary" mt={1}>
                  🗓️ Data da compra: {ingresso.dataCompra}
                </Typography>
              
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          {ingressosComprados.length === 0 ? 'Comprar ingresso' : 'Voltar aos Filmes'}
        </Button>
      </Stack>
    </Box>
  );
}
