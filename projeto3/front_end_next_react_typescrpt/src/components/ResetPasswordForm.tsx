"use client";

import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { resetPasswordUseCase } from '../useCases/resetPasswordUseCase';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await resetPasswordUseCase(email);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Password reset failed', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Reset Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">RESET PASSWORD</Button>
      </Box>
    </Paper>
  );
};

export default ResetPasswordForm;