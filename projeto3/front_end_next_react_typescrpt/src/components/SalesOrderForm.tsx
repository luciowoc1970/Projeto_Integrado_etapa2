'use client'

import ItemPedidoProduto from '@/data/entities/pedidio-venda/ItemPedidoProduto'
import { ClientExterno, PedidoDeVenda } from '@/data/entities/pedidio-venda/PedidoDeVenda'
import { createSalesOrderUseCase } from '@/useCases/createSalesOrderUseCase'
import { Alert, Box, Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const SalesOrderForm: React.FC = () => {
  const router = useRouter()

  const [customerName, setCustomerName] = useState<string>('')
  const [deliveryDate, setDeliveryDate] = useState<string>('')

  const [items, setItems] = useState<ItemPedidoProduto[]>([
    new ItemPedidoProduto(null, null, '', 0)
  ])

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const handleClose = () => {
    setShowAlert(false);
  };

  const addItem = () => {
    const lastItem = items[items.length - 1]
    const itemPedidoProduto = new ItemPedidoProduto(
      null, null, '', 0
    )
    setItems([...items, itemPedidoProduto])
  }

  const onCancel = () => {
    router.push('/home')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
  }

  const onSubmit = async () => {
    try {
      const idPedido = null
      const aprovado = false
      const clientExterno = new ClientExterno(customerName)
      const prazoEntrega = new Date(deliveryDate)
      const itemPedidoProduto = items

      const saleOrder = new PedidoDeVenda(
        idPedido,
        aprovado,
        clientExterno,
        prazoEntrega,
        itemPedidoProduto
      )

      const wasCreated = await createSalesOrderUseCase(saleOrder);
      if(!wasCreated){
        setShowAlert(true);
      }else{
        router.push('/home')
      }
    } catch (error) {
      console.error('Failed to create sales order', error)
    }
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const onProductChange = (index: number, descricaoProduto: string) => {
    setItems(items.map((item, itemIndex) => {
      const novoItemPedidoProduto = new ItemPedidoProduto(
        item.id,
        item.produto.id,
        descricaoProduto,
        item.quantidade
      )
      if(itemIndex === index ){
        return novoItemPedidoProduto
      }
      return item
    }));
  }



  const onQuantityChange = (index: number, quantity: string) => {
    setItems(items.map((item, itemIndex) => {
      const novoItemPedidoProduto = new ItemPedidoProduto(
        item.id,
        item.produto.id,
        item.produto.descricao,
        Number(quantity)
      )
      if(itemIndex === index ){
        return novoItemPedidoProduto
      }
      return item
    }));
  }

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 1000, margin: 'auto' }}>
      <Typography variant='h5' component='h1' gutterBottom>
        Novo Pedido de Venda
      </Typography>

      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          Não foi possivel realizar o pedido de venda.
        </Alert>
      </Snackbar>

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              error={showAlert}
              label='Nome do Cliente Externo'
              variant='outlined'
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={showAlert}
              label='Prazo de Entrega'
              type='date'
              variant='outlined'
              fullWidth
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {items?.map((item, index) => (
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                error={showAlert}
                label={'Produto ' + (index + 1)}
                variant='outlined'
                fullWidth
                value={items[index].produto.descricao}
                onChange={(e) => onProductChange(index, e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                error={showAlert}
                label={'Quantidade ' + (index + 1)}
                variant='outlined'
                fullWidth
                value={items[index].quantidade}
                onChange={(e) => onQuantityChange(index, e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={(e) => removeItem(index)}
                variant='contained'
                color='secondary'
                type='submit'
              >
                Remover
              </Button>
            </Grid>
          </Grid>
        ))}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={addItem}
              variant='contained'
              color='primary'
              type='submit'
            >
              Adicionar Item
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button onClick={onSubmit} variant='contained' color='primary' type='submit'>
              Finalizar Pedido
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={onCancel} variant='contained' color='secondary'>
              Cencelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default SalesOrderForm
