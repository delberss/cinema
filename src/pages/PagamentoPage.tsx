import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import { useCinemaStore } from "../store/useCinemaStore";
import MovieIcon from "@mui/icons-material/Movie";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QrCodeIcon from "@mui/icons-material/QrCode";

export default function PagamentoPage() {
  const { horarioSelecionado, usuario } = useCinemaStore();

  const valorUnitario = 29.9;
  const quantidade = horarioSelecionado?.quantidade || 1;
  const valorTotal = valorUnitario * quantidade;
  return (
    <Box textAlign="center" mt={2} mb={6}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        <QrCodeIcon color="success" /> Pagamento via PIX
      </Typography>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        margin="auto"
        spacing={1}
        mt={2}
      >
        <Grid
          container
          size={{ xs: 12, md: 5 }}
          sx={{
            alignItems: "center",
            justifyContent: { xs: "center", md: "center" },
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

      </Grid>
     
    </Box>
  );
}
