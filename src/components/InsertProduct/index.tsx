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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useAddNewProductMutation } from 'src/api/Product'
import Link from '@mui/material/Link'

const InsertProduct = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const initialValuesInputs= { 
    nombre: '',
    categoria: '1',
    codigo: '',
    marca: '',
    tipo: 'MT',
    descripcion: '',
    alto: '',
    ancho: '',
    espesor: '',
    precioVenta: ''
  }
  const [inputsValues, setinputsValues] = useState( initialValuesInputs );

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setinputsValues({
      ...inputsValues,
      [name]: value
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [addNewProduct, { isLoading, isError }] = useAddNewProductMutation();

  const handleAddProduct = async () => {
    const newProduct = {
      idProducto: 1,
      categoria: inputsValues.categoria,
      codigo: inputsValues.codigo,
      imagen: 'imagen.png',
      nombreProducto: inputsValues.nombre,
      precioVenta: inputsValues.precioVenta,
      estado: 1,
      alto: inputsValues.alto,
      ancho: inputsValues.ancho,
      espesor: inputsValues.espesor,
      marca: inputsValues.marca,
      tipo: inputsValues.tipo,
      descripcion: inputsValues.descripcion
    };

    try{
      await addNewProduct( newProduct ).unwrap();
      handleClose();
      setinputsValues( initialValuesInputs );
    } catch( error ) {
      console.log( error );
    }
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Insertar Producto
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>  <Link href='#'> Añadir nuevo Producto </Link></DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px'}}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='nombre'
                value={inputsValues.nombre}
                onChange={ handleInputChange }
                fullWidth
                label='Nombre'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select label='Categoria' name='categoria' onChange={ handleInputChange } defaultValue={ inputsValues.categoria }>
                  <MenuItem value='1'>Accesorios</MenuItem>
                  <MenuItem value='2'>Aceites</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='codigo'
                value={inputsValues.codigo}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='Cod I'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select label='Role' name='tipo' onChange={handleInputChange} defaultValue={inputsValues.tipo}>
                  <MenuItem value='MT'>MT</MenuItem>
                  <MenuItem value='AT'>AT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='marca'
                value={inputsValues.marca}
                onChange={handleInputChange}
                fullWidth
                type='text'
                label='Marca'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='descripcion'
                value={ inputsValues.descripcion }
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
                value={inputsValues.alto}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Ancho'
                name='ancho'
                value={inputsValues.ancho}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Espesor'
                name='espesor'
                value={inputsValues.espesor}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Precio Venta'
                name='precioVenta'
                value={inputsValues.precioVenta}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={ handleAddProduct } disabled={ isLoading } variant='contained' autoFocus>
            { isLoading ? 'Añadiendo producto...' : 'Añadir producto'}
          </Button>
          { isError && <div> Error adding product </div> }
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InsertProduct
