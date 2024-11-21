"use client";

// import { useAuth } from '@/utils/authContext';
import { Box, Button, Grid, Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/Home.module.css';
import { useAuth } from '../utils/authContext';

const Home: React.FC = () => {
  const { logout } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {

      logout();
    } catch (error) {
      console.error('logout failed', error);
    }
  };

  return (
    <Grid container style={{ height: '100vh' }}>

      <Grid item xs={4} style={{ backgroundColor: '#6224b4' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Image
            src="/imagem_unica_grande.jpg"
            alt="Faculdade Única de Ipatinga"
            width={200}
            height={200}
          />
        </Box>
      </Grid>

      <Grid item xs={8}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Paper elevation={3} sx={{ padding: '10px', margin: 0, maxWidth: 600 }}>

          <div className={styles.container}>
            <h1>Home</h1>

              <Button className={styles.actionButton} href="/sales-order" variant="contained" color="primary" type="submit">Novo Pedido de Venda</Button>

              <Button onClick={handleSubmit} className={styles.actionButton} variant="contained" color="secondary" type="submit">LogOff</Button>
          </div>

          </Paper>
        </Box>
      </Grid>

    </Grid>
  );
};

export default Home;
