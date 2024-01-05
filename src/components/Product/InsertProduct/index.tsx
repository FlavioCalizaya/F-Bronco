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
import { useEffect, useState } from 'react'
import { useAddNewProductMutation } from 'src/api/Product'
import Link from '@mui/material/Link'
import CloudUploadIcon from 'mdi-material-ui/CloudUpload'
import { styled } from '@mui/material/styles'

const InsertProduct = () => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const initialValuesInputs = {
    idProducto: 80,
    nombreProducto: '',
    categoria: 'Accesorios',
    codigo: '',
    imagen: '',
    marca: '',
    tipo: 'MT',
    descripcion: '',
    alto: 0,
    ancho: 0,
    espesor: '',
    precioVenta: '',
    estado: 1,
  }
  const [inputsValues, setinputsValues] = useState(initialValuesInputs);
  const [categoriaSelected, setCategoriaSelected] = useState('Accesorios')
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
    setOpen(false);
    setinputsValues(initialValuesInputs);
  }

  const [addNewProduct, { isLoading, isError }] = useAddNewProductMutation();


  const handleAddProduct = async () => {
    try {
      await addNewProduct(inputsValues).unwrap()
      handleClose()
      setinputsValues(initialValuesInputs)
    } catch (error) {
      console.log(error)
    }
  }
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  });

  const handleFileChange = ( event:any ) => { 
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setinputsValues( { 
        ...inputsValues,
        imagen: reader.result as string
       })
    };
    reader.readAsDataURL( file );

  }

  useEffect(()=>{
     setinputsValues({
      ...inputsValues,
      categoria: categoriaSelected
    })
  },[categoriaSelected])

return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Insertar Producto
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {' '}
          <Link href='#'> Añadir nuevo producto </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  label='Categoria'
                  name='categoria'
                  onChange={(event)=>setCategoriaSelected(event.target.value)}
                  value={inputsValues.categoria}
                >
                  <MenuItem value='Accesorios'>Accesorios</MenuItem>
                  <MenuItem value='Tina de radiador'>Tina de radiador</MenuItem>
                  <MenuItem value='Panales'>Panales</MenuItem>
                  <MenuItem value='Ventiladores'>Ventiladores</MenuItem>
                  <MenuItem value='Radiadores'>Radiadores</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          { (categoriaSelected=='Accesorios' || categoriaSelected=='Tina de radiador' ) && <Grid item xs={12} sm={6}>
              <TextField
                name='nombreProducto'
                value={inputsValues.nombreProducto}
                onChange={handleInputChange}
                fullWidth
                label='Nombre'
              />
            </Grid> }
            { false && <Grid item xs={12} sm={6}>
              <TextField
                name='codigo'
                value={inputsValues.codigo}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='Cod I'
              />
            </Grid>}
            {categoriaSelected=='Panales' && <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select label='Role' name='tipo' onChange={handleInputChange} value={ inputsValues.tipo }>
                  <MenuItem value='C'>C</MenuItem>
                  <MenuItem value='ST'>ST</MenuItem>
                  <MenuItem value='KD'>KD</MenuItem>
                  <MenuItem value='KV'>KV</MenuItem>
                </Select>
              </FormControl>
            </Grid>}
           {(categoriaSelected=='Tina de radiador'|| categoriaSelected=='Ventiladores' || categoriaSelected=='Radiadores') && <Grid item xs={12} sm={6}>
              <TextField
                name='marca'
                value={inputsValues.marca}
                onChange={handleInputChange}
                fullWidth
                type='text'
                label='Marca'
              />
            </Grid>}
            {(categoriaSelected=='Tina de radiador'|| categoriaSelected=='Panales' || categoriaSelected=='Ventiladores' || categoriaSelected=='Radiadores') && <Grid item xs={12} sm={6}>
              <TextField
                name='descripcion'
                value={inputsValues.descripcion}
                onChange={handleInputChange}
                fullWidth
                id='outlined-multiline-static'
                label='Descripcion'
                multiline
                rows={2}
              />
            </Grid>}
            {(categoriaSelected=='Panales' || categoriaSelected=='Radiadores') && <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Alto'
                name='alto'
                value={inputsValues.alto}
                onChange={handleInputChange}
              />
            </Grid>}
            {(categoriaSelected=='Panales' || categoriaSelected=='Radiadores') && <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Ancho'
                name='ancho'
                value={inputsValues.ancho}
                onChange={handleInputChange}
              />
            </Grid> }
            {categoriaSelected=='Espesor' && <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Espesor'
                name='espesor'
                value={inputsValues.espesor}
                onChange={handleInputChange}
              />
            </Grid>}
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
            <Grid item xs={12} sm={6}>
              <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
                Subir Imagen
                <VisuallyHiddenInput type='file' onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              {inputsValues.imagen && 
                  <img src={inputsValues.imagen} alt='Preview' style={{ maxWidth: '100%', height: 'auto' }} />
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleAddProduct} disabled={isLoading} variant='contained' autoFocus>
            {isLoading ? 'Añadiendo producto...' : 'Añadir producto'}
          </Button>
          {isError && <div> Error adding product </div>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InsertProduct
