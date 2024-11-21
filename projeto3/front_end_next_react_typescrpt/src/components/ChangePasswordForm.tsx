"use client";

import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { changePasswordUseCase } from '../useCases/changePasswordUseCase';

const ChangePasswordForm: React.FC = () => {
  const [idUsuario, setIdUsuario] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await changePasswordUseCase(parseInt(idUsuario, 10), newPassword);
      console.log('Password change successful');
    } catch (error) {
      console.error('Password change failed', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Change Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="User ID" variant="outlined" fullWidth value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} />
        <TextField label="New Password" type="password" variant="outlined" fullWidth value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">CHANGE PASSWORD</Button>
      </Box>
    </Paper>
  );
};

export default ChangePasswordForm;