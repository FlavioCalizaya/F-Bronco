import { useState } from 'react'

import {Button} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useAddNewpurchaseMutation } from 'src/api/purchaseApi'
import { useGetAllProvidersQuery } from 'src/api/providerApi'
import { useGetAllProductsQuery } from 'src/api/Product'

const InsertPurchase = () => {
  const [open, setOpen] = useState(false)  

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const [createNewPurchase] = useAddNewpurchaseMutation()
  const {data:providerdata} =  useGetAllProvidersQuery()

  // @ts-ignore
  const {data:productdata, isLoading} = useGetAllProductsQuery()

  const clearFormPurchase=()=>{
    setDate('')
    setLot('')
    setPrice('')
    setPrice('')
    setQuantity('')
    setProduct('')
    setProvider('')
  }

  const handleClickOpen = () => {setOpen(true)}
  const handleClose = () => { 
    clearFormPurchase()
    setListPurchases([])
    setOpen(false) 
  }

  const purchase = []
  let  datePurchase = ''
  let providersend = ''

  const addPurchase = async (total:number) => {

    listPurchase.map((item:Purchase)=>{
      const {provider, product, amount, price, quantity, date, lot} = item
      const findProv = providerdata.data.find((item:any) => item.businessName === provider)
      const findProd = productdata.find((item:any) => item.nombreProducto === product)

      const inventory = {date, product:findProd,lot,price, stock:quantity}

      datePurchase = date
      providersend = findProv
     purchase.push({price, quantity,amount, lot, product:findProd, provider:findProv, inventory})

      return {purchase, datePurchase, providersend}
    })

    const values ={date: datePurchase, total, provider: providersend, purchaseDetails: purchase}
    const res =  await createNewPurchase(values).unwrap();

    if(res){
      console.log('Compra registrada con exito')
      handleClose()
    }else{
      console.log('Error al registrar la compra')
    }

  }

  interface Purchase{
    date: string
    quantity: number
    price: number
    lot: string
    amount: number
    provider: string
    product: string
  }

  const [date, setDate] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  //const [amount, setAmount] = useState('')
  const [lot, setLot] = useState('')

  const [provider, setProvider] = useState('')
  const [product, setProduct] = useState('')
  
  const [listPurchase, setListPurchases] = useState([])

  const handleListPurchase = () => {
    const purchase: Purchase = {
      date: date,
      quantity:Number(quantity),
      price:Number(price),
      lot:lot,
      amount:(Number(price) * Number(quantity)),
      provider: provider,
      product:product
    }
    const newList = [...listPurchase, purchase]
    const newPurchase = ()=>[...newList.reduce((map, each)=>map.set(each.lot, each), new Map()).values()];
    
    // @ts-ignore
    setListPurchases(newPurchase)
    clearFormPurchase()
  }

  const removeListPurchase = (lot:any) =>{
    setListPurchases(listPurchase.filter((item:Purchase) => item.lot !== lot))
  }


  return (
    isLoading ? <CircularProgress/>
    : <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Registrar nueva compra
      </Button>
      <Dialog fullScreen={fullScreen} maxWidth={'lg'} fullWidth={true} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        
        <DialogContent>
        {/*<PurchaseFormLayout product={product} provider={provider} open={open}/>*/}
        <Card>
      <CardHeader title='Registro de Compras' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>

      <Stack direction="row" spacing={10}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Datos de la Compra
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
              value={product} 
               freeSolo
               id="product"
               onChange={(e: any, newValue: any) => {setProduct(newValue)}}
               disableClearable
               options={productdata?.map((option:any) => option.nombreProducto )}
               renderInput={(params) => (
                 <TextField
                   {...params}
                   label="Seleccionar Producto"
                   InputProps={{
                     ...params.InputProps,
                     type: 'search',
                   }}
                 />
                )}
                />
             </Grid>
             <Grid item xs={12} sm={4}>
              <Autocomplete
                freeSolo
                id="provider"
                disableClearable
                value={provider}
                onChange={(e: any, newValue: any) => {setProvider(newValue)}}
                options={providerdata?.data.map((option:any) => option.businessName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccionar Proveedor"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                  )}
                />      
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth type='text' label='Lote' placeholder='Ingrese un codigo de Lote'
                value={lot} onChange={(e)=>setLot(e.target.value)} />
              </Grid>

            <Grid item xs={12} sm={4}>
            <TextField type='date' fullWidth placeholder='Seleccionar fecha' 
            value={date} onChange={(e)=>setDate(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type='number' label='Precio' placeholder='Ingrese el precio de compra'
              value={price} onChange={(e)=>setPrice(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type='number' label='Cantidad' placeholder='Ingrese la cantidad' 
              value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
            </Grid>
            
          </Grid>

          
          <Stack direction="column"  alignSelf='center' >
          <Button size='small' type='submit'  variant='contained'
          onClick={() => handleListPurchase()}>
            Añadir
          </Button>

          </Stack>
  
      </Stack> 
      <Grid container spacing={5}>
      <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0, marginTop:5}} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Detalle de la Compra
              </Typography>
            </Grid>
      <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Número </TableCell>
                    <TableCell align='left'>Fecha </TableCell>
                    <TableCell align='left'>Lote </TableCell>
                    <TableCell align='left'>Proveedor </TableCell>
                    <TableCell align='left'>Producto </TableCell>
                    <TableCell align='left'>Cantidad </TableCell>
                    <TableCell align='left'>Precio </TableCell>
                    <TableCell align='left'>Total Importe</TableCell>
                    <TableCell align='left'>Accion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {listPurchase?.map((item: Purchase, i:number) => (
                    <TableRow
                      key={i}
                      sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}}
                    >
                      <TableCell component='th' scope='row'>{i +1}</TableCell>
                      <TableCell align='left'>{item.date}</TableCell>
                      <TableCell align='left'>{item.lot}</TableCell>
                      <TableCell align='left'>{item.provider}</TableCell>
                      <TableCell align='left'>{item.product}</TableCell>
                      <TableCell align='left'>{item.quantity}</TableCell>
                      <TableCell align='left'>{item.price}</TableCell>
                      <TableCell align='left'>{item.amount}</TableCell>
                      <TableCell align='left'>
                        {
                          <Button size='small' type='submit'  variant='contained'
                          onClick={() => removeListPurchase(item.lot)}>
                          <Typography variant='h10' color='white'>
                            Quitar
                          </Typography> 
                          </Button>
                        }
                        </TableCell>
                    </TableRow>
                  ))}
           {/*<TableRow>
            <TableCell rowSpan={1} />
            <TableCell rowSpan={1} />
            <TableCell rowSpan={1} />
            <TableCell rowSpan={1} />
            <TableCell rowSpan={1} />
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell  align="left">{listPurchase?.map((item:Purchase)=>item.amount).reduce((prev, curr)=>prev+curr,0)}</TableCell>
          </TableRow>*/}

          </TableBody>
        </Table>
      </TableContainer>
      
      </Grid>
      <Stack marginTop={5} marginRight={30} direction="row" justifyContent='flex-end' alignItems='center'>
            <Typography paddingX={10}>TOTAL</Typography>
          <TextField size='small' id="total" type='number' disabled inputProps={{min: 0, style: { textAlign: 'center'}}}
          value={listPurchase?.map((item:Purchase)=>item.amount).reduce((prev, curr)=>prev+curr,0)} />
          </Stack>
      </CardContent>
    </Card>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant='contained' type='submit'  autoFocus
            onClick={()=>addPurchase(document.getElementById('total').value)}>
              Añadir
            </Button>
          </DialogActions>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InsertPurchase