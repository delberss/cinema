import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";

interface CodigoVerificacaoProps {
  email: string;
  isNovoUsuario?: boolean;
  onValidarSucesso: () => void;
}

export default function CodigoVerificacao({
  email,
  isNovoUsuario = false,
  onValidarSucesso,
}: CodigoVerificacaoProps) {
  const [codigo, setCodigo] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const isDevMode = true;

  const enviarCodigo = () => {
    setCodigoEnviado(true);
    const tipo = isNovoUsuario ? "registro" : "login";
    alert(`O código de ${tipo} foi enviado para ${email}`);
  };

  const validarCodigo = () => {
    if (codigo === "1234") {
      onValidarSucesso();
    } else {
      alert("Código inválido!");
    }
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6" mb={2}>
        {isNovoUsuario ? "Registro de Novo Usuário" : "Login via Código de Acesso"}
      </Typography>

      <Typography mb={2}>
        E-mail informado: <b>{email}</b>
      </Typography>

      {isDevMode && codigoEnviado && (
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
          Enviar Código de {isNovoUsuario ? "Registro" : "Acesso"}
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
