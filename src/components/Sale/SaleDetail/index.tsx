import React from 'react';

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Eyes from 'mdi-material-ui/TableHeadersEye'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import Link from '@mui/material/Link'
import { IconButton } from '@mui/material'
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Grid from '@mui/material/Grid'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CardSale from 'src/views/cards/CardSale';
import CardClient from 'src/views/cards/CardClient';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SaleDetails = ( { sale }: { sale: any } ) => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))


interface RowType {
  idDetalleVenta: number;
  precio: number;
  cantidad: number;
  importe: number;
  product: any;
  saleDetails: any;
}


  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }




  return (
    <div>
      <IconButton aria-label='SeeDetail' color='primary' onClick={ handleClickOpen }>
        <Eyes />
      </IconButton>
      <Dialog 
       fullScreen={fullScreen}
       open={open} 
       maxWidth={'md'}
       fullWidth={true}
       TransitionComponent={Transition}
       onClose={handleClose} 
       aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {' '}
          <Link href='#'>Detalles de la venta</Link>
        </DialogTitle>
        <DialogContent>
        <Grid container spacing={6} mb={10}>
        <Grid item xs={12} sm={6} md={6}>
          <CardSale data={ sale } />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardClient data={ sale } />
        </Grid>
        </Grid>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
             <TableCell>Imagen</TableCell>
            <TableCell align='left'>Producto</TableCell>
            <TableCell align='left'>Precio</TableCell>
            <TableCell align='left'>Cantidad</TableCell>
            <TableCell align='left'>Subtotal</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          { sale.saleDetails.map((detailSale: RowType) => (
            <TableRow
              key={ detailSale.idDetalleVenta }
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
                  <TableCell align='left'>
              {detailSale.product.imagen && 
                  <img src={ `/images/products/${detailSale.product.imagen}`} alt='Imagen Producto' style={{ width: '50%', height: '50px' }} />
              }
              </TableCell>
              <TableCell align='left'>
                {detailSale.product.nombreProducto }
              </TableCell>
              <TableCell align='left'>{detailSale.precio} Bs</TableCell>
              <TableCell align='left'>{detailSale.cantidad}</TableCell>
              <TableCell align='left'>{detailSale.importe} Bs</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } variant='contained' autoFocus>
          Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SaleDetails
