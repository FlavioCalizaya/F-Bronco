import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import { useState } from 'react'
import { useAddNewProductMutation, useGetProductByNameQuery } from 'src/api/Product'
import Link from '@mui/material/Link'
import CloudUploadIcon from 'mdi-material-ui/CloudUpload'
import { styled } from '@mui/material/styles'
import { Autocomplete, IconButton } from '@mui/material'
import Delete from 'mdi-material-ui/Delete'
import { useGetAllClientQuery } from 'src/api/clientApi'
import { useGetAllInventoriesQuery } from 'src/api/inventoryApi'
import Typography from '@mui/material/Typography'
import SaleDetails from '../SaleDetail/index';
import { useAddNewSaleMutation } from 'src/api/Sale'

const InsertSales = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [customer, setCustomer] = useState({});

  interface Product {
    idProducto: number
    idInventario: number
    categoria: number
    codigo: string
    imagen: string
    nombreProducto: string
    precioVenta: number
    estado: number
    alto: number | null
    ancho: number | null
    espesor: number | null
    marca: string
    tipo: string
    Descripcion: string
    stock: number
    cantidad: number
    subtotal: number
    precio: number
  }
  interface Client {
    nitCi: string
    businessName: string
    phoneNumber: number
  }
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    
    setSelectedProducts([]);
    setCustomer({});
    
    setOpen(false)
  }

  const [productName, setProductName] = useState('a')
  // const { data: products, isError, error } = useGetProductByNameQuery(productName);
  const { data: clients } = useGetAllClientQuery()

  const { data: products } = useGetAllInventoriesQuery()

  const [ addNewSale, { isLoading, isError } ] = useAddNewSaleMutation()


  const handleInputChange = (event: any, value: any) => {
    setProductName(value)
  }

  const [date, setDate] = useState('')
  const [correlativeNumber, setCorrelativeNumber] = useState('')
  
  
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const handleCountChange = (event: any, productId: any) => {
    const updatedProducts = selectedProducts.map(product =>
      product.idProducto === productId
        ? { ...product, cantidad: event.target.value, subtotal: event.target.value * product.precio }
        : product
    )
    setSelectedProducts(updatedProducts);
  }
  const calculateTotal = () => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.subtotal;
    }, 0);
  };

const handleAddSale = async () => {
   const dataSale = {
     sale : {  
     idVenta: 1,
     total: calculateTotal(),
     estado: 1, 
     fecha: date, 
     nroCorrelativo: correlativeNumber, 
     client: customer
     },
     saleDetails: selectedProducts.map( detail => {
      return  { idDetalleVenta: 1, 
        precio: detail.precio,
        cantidad: detail.cantidad, 
        importe: detail.subtotal,
        idProducto: detail.idProducto,
        idInventario: detail.idInventario}
     }
     )
   }

   try {
    await addNewSale(dataSale).unwrap()
    handleClose();
  } catch (error) {
    console.log(error)
  }
}

  
  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Insertar Venta
      </Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={'lg'}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {' '}
          <Link href='#'> Añadir una nueva venta</Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px' }}>
            <Grid item xs={6} sm={6}>
              <Autocomplete
                options={clients ? clients : []}
                getOptionLabel={(option: Client) => option.businessName}
                onChange={ (e, newValue:any ) => { setCustomer( newValue ) } }
                renderInput={params => <TextField {...params} label='Buscar Cliente' variant='outlined' />}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Autocomplete
                options={
                  products
                    ?
                    products.map( (product:any )=> { 
                       return  {
                        ...product.product,
                        stock: product.stock,
                        precio: product.price,
                        cantidad: 0,
                        subtotal: 0, 
                        idInventario:product.id
                      }
                    })
                    : []
                }
                getOptionLabel={(option: Product) => option.nombreProducto}
                onChange={(e, newValue) => {
                  if (newValue !== null) {
                    setSelectedProducts([...selectedProducts, newValue])
                  }
                }}
                renderInput={params => <TextField {...params} label='Buscar producto' variant='outlined' />}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
            <TextField type='date' fullWidth placeholder='Eliga una fecha' 
            value={date} onChange={(e)=>setDate(e.target.value)}/>
            </Grid>
            <Grid item xs={6} sm={6}>
            <TextField type='correlativeNumber' fullWidth placeholder='Escriba un numero correlativo' 
                label='Numero Correlativo'
                value={correlativeNumber}  onChange={(e)=>setCorrelativeNumber(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Imagen</TableCell>
                      <TableCell>Cod I</TableCell>
                      <TableCell align='right'>Nombre</TableCell>
                      <TableCell align='right'>Tipo </TableCell>
                      <TableCell align='right'>Categoria</TableCell>
                      <TableCell align='right'>Marca </TableCell>
                      <TableCell align='right'>Alto</TableCell>
                      <TableCell align='right'>Ancho</TableCell>
                      <TableCell align='right'>Esp</TableCell>
                      <TableCell align='right'>Stock</TableCell>
                      <TableCell align='right'>Precio</TableCell>
                      <TableCell align='center'>Cantidad</TableCell>
                      <TableCell align='center'>Subtotal</TableCell>
                      <TableCell align='right'>Eliminar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedProducts.map(product => (
                      <TableRow key={product.idProducto}>
                        <TableCell>
                          <img
                            src={`/images/products/${product.imagen}`}
                            alt={product.nombreProducto}
                            style={{ maxWidth: '100%', height: '80px' }}
                          />
                        </TableCell>
                        <TableCell>{product.codigo}</TableCell>
                        <TableCell align='right'>{product.nombreProducto}</TableCell>
                        <TableCell align='right'>{product.tipo}</TableCell>
                        <TableCell align='right'>{product.categoria}</TableCell>
                        <TableCell align='right'>{product.marca}</TableCell>
                        <TableCell align='right'>{product.alto}</TableCell>
                        <TableCell align='right'>{product.ancho}</TableCell>
                        <TableCell align='right'>{product.espesor}</TableCell>
                        <TableCell align='right'>{product.stock}</TableCell>
                        <TableCell align='right'>{product.precio} Bs</TableCell>
                        <TableCell align='right'>
                          <TextField
                            type='number'
                            value={product.cantidad}
                            onChange={event => {
                              handleCountChange(event, product.idProducto);

                            }
                            }
                          />
                        </TableCell>
                        <TableCell align='right'>{product.subtotal} Bs</TableCell>
                        <TableCell align='right'>
                          <IconButton
                            aria-label='Delete'
                            color='error'
                            onClick={() => {
                              // Handle delete or remove logic here
                              setSelectedProducts(prevSelectedProducts =>
                                prevSelectedProducts.filter(p => p.idProducto !== product.idProducto)
                              )

                            }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* ... Other table rows ... */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                Total:
              </Typography>
              <Typography variant='h6' >
              {calculateTotal()} Bs
              </Typography>
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={ handleAddSale } disabled={ isLoading } variant='contained' autoFocus>
            { isLoading ? 'Añadiendo venta...' : 'Añadir venta' }
          </Button>
          {/* {isError && <div> Error al buscar un producto </div>} */}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InsertSales
