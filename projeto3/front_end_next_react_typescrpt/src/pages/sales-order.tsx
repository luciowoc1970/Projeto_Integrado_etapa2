"use client";

import SalesOrderForm from '@/components/SalesOrderForm';
import { Box, Grid, Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const SalesOrder: React.FC = () => {
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
          <Paper elevation={3} sx={{ padding: 0, maxWidth: 1000 }}>
            <SalesOrderForm />
          </Paper>
        </Box>
      </Grid>

    </Grid>
  );
};

export default SalesOrder;
