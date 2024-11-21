"use client";

import { Alert, Box, Button, Paper, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { loginUseCase } from '../useCases/loginUseCase';
import { useAuth } from '../utils/authContext';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);

  const useAuthContext = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginIsValid = await loginUseCase(username, password, useAuthContext);
    console.log("loginIsValid: ", loginIsValid);
    if(!loginIsValid){
      setShowLoginAlert(true);
    }
  };

  const handleClose = () => {
    setShowLoginAlert(false);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto' }}>

      <Snackbar open={showLoginAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          Usuário ou senha inválidos.
        </Alert>
      </Snackbar>

      <Typography variant="h5" component="h1" gutterBottom>
        SOFTWARE DE GESTÃO DE LOGÍSTICA
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField error={showLoginAlert} label="Usuário" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField error={showLoginAlert} label="Senha" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">ENTRAR</Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;