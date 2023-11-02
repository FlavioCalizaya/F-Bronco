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
import { useState } from 'react'
import { useAddNewServiceMutation } from 'src/api/serviceApi'
import Link from '@mui/material/Link'
import DatePicker from 'react-datepicker';

const InsertService = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const initialValuesInputs= { 
    tipoServicio: '',
    descripcion: '',
    importe: 0,
    idUser: 0,
    idClient: 0,
    fechaInicio: '',
    fechaConclusion: ''


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

  const [addNewService, { isLoading, isError }] = useAddNewServiceMutation();

  const handleAddService = async () => {
    const newService = {
      idService: 1,
      servicio: inputsValues.tipoServicio,
      descripcion: inputsValues.descripcion,
      importe: inputsValues.importe,
      estado: 1,
      usuario: inputsValues.idUser,
      cliente: inputsValues.idClient,

      fechaInicio: inputsValues.fechaInicio,
      FechaConclusion: inputsValues.fechaConclusion,
     
    };

    try{
      await addNewService( newService ).unwrap();
      handleClose();
      setinputsValues( initialValuesInputs );
    } catch( error ) {
      console.log( error );
    }
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Insertar Un Nuevo Servicio
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>  <Link href='#'> Añadir nuevo Servicio </Link></DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px'}}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='tipoService'
                value={inputsValues.tipoServicio}
                onChange={ handleInputChange }
                fullWidth
                label='Tipo Servicio'
              />
            </Grid>        
            <Grid item xs={12} sm={6}>
              <TextField
                name='descripcion'
                value={inputsValues.descripcion}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='Descrpcion'
              />
            </Grid>           
            <Grid item xs={12} sm={6}>
              <TextField
                name='importe'
                value={inputsValues.importe}
                onChange={handleInputChange}
                fullWidth
                type='text'
                label='Importe'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='usuario'
                value={ inputsValues.idUser }
                onChange={handleInputChange}
                fullWidth
                id='outlined-multiline-static'
                label='usuario'
                multiline
                rows={2}
              />
            </Grid>            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Cliente'
                name='cliente'
                value={inputsValues.idClient}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='fechaInicio'
                label='Fecha Inicio'
                name='fechaInicio'
                value={inputsValues.fechaInicio}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='fechaConclusion'
                label='Fecha Conclusion'
                name='precioVenta'
                value={inputsValues.fechaConclusion}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={ handleAddService } disabled={ isLoading } variant='contained' autoFocus>
            { isLoading ? 'Añadiendo service...' : 'Añadir service'}
          </Button>
          { isError && <div> Error adding service </div> }
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InsertService
