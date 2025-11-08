import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCinemaStore } from "../store/useCinemaStore";

export default function RegistroPage() {
  const { usuario, setIsLoggedIn } = useCinemaStore();
  const [codigo, setCodigo] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const navigate = useNavigate();

  const isDevMode = true;

  const enviarCodigo = () => {
    setCodigoEnviado(true);
    alert(
      `O CÓDIGO DE ACESSO foi enviado para o e-mail informado: (${usuario?.email}).`
    );
  };

  const validarCodigo = () => {
    if (codigo === "1234") {
      setIsLoggedIn(true);
      navigate("/confirmacao");
    } else {
      alert("Código inválido!");
    }
  };

  return (
    <Box textAlign="center" mt={6} px={2}>
      <Typography variant="h5" mb={2}>
        Registro de Novo Usuário
      </Typography>

      <Typography>
        E-mail informado: <b>{usuario?.email}</b>
      </Typography>

      {isDevMode && (
        <Alert
          severity="info"
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: 3,
            mb: 3,
            fontSize: "0.9rem",
          }}
        >
          🔧 <strong>Modo desenvolvedor ativo</strong> — use o código <b>1234</b> para validação.
        </Alert>
      )}


      {!codigoEnviado ? (
        <Button sx={{ mt: 3 }} variant="contained" onClick={enviarCodigo}>
          Enviar Código de Acesso
        </Button>
      ) : (
        <Box
          mt={3}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <TextField
            label="Digite o código recebido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <Button variant="contained" onClick={validarCodigo}>
            Validar Código
          </Button>
        </Box>
      )}
    </Box>
  );
}
