import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'
import { useGetProductByIDQuery, useUpdateProductMutation } from 'src/api/Product'
import Link from '@mui/material/Link'
import { IconButton } from '@mui/material'
import Update from 'mdi-material-ui/Update'


const initialValuesInputs= { 
  nombreProducto: 'Cargando',
  categoria: '1',
  codigo: 'Cargando',
  marca: 'Cargando',
  tipo: 'MT',
  descripcion: 'Cargando',
  alto: 0,
  ancho: 0,
  espesor: 'Cargando',
  precioVenta: 'Cargando'
}

const UpdateProduct = ({ id }: { id: number }) => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))


  const { data: product } = useGetProductByIDQuery(id);


  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setinputsValues({
      ...inputsValues,
      [name]: value
    })
  }

  const handleClickOpen = () => {
    console.log('productttttopened', product )
    setinputsValues(product )

    setOpen(true)
   
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [inputsValues, setinputsValues] = useState();

  const [updateProduct, { isLoading, isError }] = useUpdateProductMutation();


  const handleUpdateProduct = async () => {
    const updatedProductData = {
      id: id,
      value: inputsValues 
    };
    try {
      await updateProduct(updatedProductData).unwrap();
      handleClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  useEffect(()=>{
    setinputsValues(product)
  },[product])

  return (
    <div>
      <IconButton aria-label='Update' color='primary' onClick={handleClickOpen}>
        <Update />
      </IconButton>
  
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {' '}
          <Link href='#'> Actualizar Producto </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px' }}>
          { (inputsValues?.categoria=='Accesorios' || inputsValues?.categoria=='Tina de radiador' ) &&
            <Grid item xs={12} sm={6}>
              <TextField
                name='nombreProducto'
                value={inputsValues?.nombreProducto}
                onChange={handleInputChange}
                fullWidth
                label='Nombre'
              />
            </Grid>}
            <Grid item xs={12} sm={6}>
              <TextField
                name='categoria'
                value={inputsValues?.categoria}
                fullWidth
                disabled
                label='Categoria'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='codigo'
                value={inputsValues?.codigo}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='Cod I'
              />
            </Grid>
            {(inputsValues?.categoria=='Tina de radiador'|| inputsValues?.categoria=='Ventiladores' || inputsValues?.categoria=='Radiadores') && 
            <Grid item xs={12} sm={6}>
              <TextField
                name='marca'
                value={inputsValues?.marca}
                onChange={handleInputChange}
                fullWidth
                type='text'
                label='Marca'
              />
            </Grid>}
            <Grid item xs={12} sm={6}>
              <TextField
                name='descripcion'
                value={inputsValues?.descripcion}
                onChange={handleInputChange}
                fullWidth
                id='outlined-multiline-static'
                label='Descripcion'
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Alto'
                name='alto'
                value={inputsValues?.alto}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Ancho'
                name='ancho'
                value={inputsValues?.ancho}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Precio Venta'
                name='precioVenta'
                value={inputsValues?.precioVenta}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button  
          disabled={isLoading}  
          onClick={ handleUpdateProduct } 
          variant='contained' 
          autoFocus>
            {isLoading ? 'Actualizando producto...' : 'Actualizar producto'}
          </Button>
          {isError && <div> Error update product </div>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateProduct