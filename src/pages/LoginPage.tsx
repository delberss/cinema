import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCinemaStore } from "../store/useCinemaStore";
import { validarCPF } from "../utils/validateCPF";
import CodigoVerificacao from "../components/CodigoVerificacao/CodigoVerificacao";

export default function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mostrandoCodigo, setMostrandoCodigo] = useState(false);
  const [isNovoUsuario, setIsNovoUsuario] = useState(false);
  const { setUsuario, setIsLoggedIn } = useCinemaStore();
  const navigate = useNavigate();

  const isDevMode = true;

const handleAvancar = () => {
  setErro("");

  if (!cpf || !email) {
    setErro("Preencha CPF e e-mail para continuar.");
    return;
  }

  if (!isDevMode && !validarCPF(cpf)) {
    setErro("CPF inválido. Verifique e tente novamente.");
    return;
  }

  const usuariosCadastrados = ["teste@email.com", "cliente@cinema.com"];
  const registrado = usuariosCadastrados.includes(email.trim().toLowerCase());

  setUsuario({ cpf, email, registrado });

  if (registrado) {
    setIsNovoUsuario(false);
    setMostrandoCodigo(true);
  } else {
    navigate("/registro");
  }
};

  const handleCodigoValidado = () => {
    setIsLoggedIn(true);
    navigate("/confirmacao");
  };

  return (
    <Box textAlign="center" mt={6} px={2}>
      <Typography variant="h4" mb={2}>
        Área Restrita para Compra de Ingressos
      </Typography>

      {isDevMode && !mostrandoCodigo && (
        <Alert
          severity="info"
          sx={{
            maxWidth: 400,
            mx: "auto",
            mb: 3,
            fontSize: "0.9rem",
          }}
        >
          🔧 <strong>Modo desenvolvedor ativo</strong> — qualquer CPF e e-mail são aceitos.
        </Alert>
      )}

      {erro && (
        <Alert
          severity="error"
          sx={{ maxWidth: 400, mx: "auto", mb: 2, fontSize: "0.9rem" }}
        >
          {erro}
        </Alert>
      )}

      {!mostrandoCodigo && (
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          maxWidth={400}
          mx="auto"
        >
          <TextField
            label="CPF"
            fullWidth
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            inputProps={{ maxLength: 14 }}
            placeholder="000.000.000-00"
          />
          <TextField
            label="E-mail"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button variant="contained" onClick={handleAvancar} fullWidth>
            Avançar
          </Button>
        </Box>
      )}

      {mostrandoCodigo && (
        <CodigoVerificacao
          email={email}
          isNovoUsuario={isNovoUsuario}
          onValidarSucesso={handleCodigoValidado}
        />
      )}
    </Box>
  );
}
