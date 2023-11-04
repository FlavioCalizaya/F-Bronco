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
import { useAddNewServiceyMutation } from 'src/api/Servicey/serviceyApi'
import Link from '@mui/material/Link'
import CloudUploadIcon from 'mdi-material-ui/CloudUpload'
import { styled } from '@mui/material/styles'
import { Autocomplete, IconButton } from '@mui/material'
import { useGetAllClientQuery } from 'src/api/clientApi'

const InsertServicey = () => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const initialValuesInputs = {
    id:66, 
    serviceType:'',
    description:'',
    amount:0,
    idUser: 3,
    estado:0,
    dateInit:"2023-10-16T02:04:43.000+00:00",
    idAssignedMaintenanceUser: 1, 
    statusMaintenance: false, 
    dateEnd:"2023-10-26T02:09:04.000+00:00" , 
    //client: {"id": 1,"nitCi": "76576","businessName": "liss","phoneNumber": 67868,"estado": 0}
  }
  interface Client {
    nitCi: string;
    businessName: string;
    phoneNumber: number;
  }

  const [inputsValues, setInputsValues] = useState(initialValuesInputs);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setInputsValues({
      ...inputsValues,
      [name]: value
    })
    console.log('ggg', inputsValues)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    setInputsValues(initialValuesInputs);
  }

  const [addNewServicey, { isLoading, isError }] = useAddNewServiceyMutation();
  const { data: clients} = useGetAllClientQuery();


  const handleAddServicey = async () => {
    try {
      console.log('yyyy', initialValuesInputs)
      console.log('333', inputsValues)
      await addNewServicey(inputsValues).unwrap()
      handleClose()
      setInputsValues(initialValuesInputs)
      
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

  
  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Insertar Servicio
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {' '}
          <Link href='#'>Nuevo Servicio </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={clients ? clients : []}
                getOptionLabel={(option: Client) => option.businessName}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Buscar Cliente'
                    variant='outlined'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo Servicio</InputLabel>
                <Select
                  label='Tipo Servicio'
                  name='serviceType'
                  onChange={handleInputChange}
                  value={inputsValues.serviceType}>
                  <MenuItem value='Mantenimiento'>Mantenimiento</MenuItem>
                  <MenuItem value='Soldadura'>Soldadura</MenuItem>
                  <MenuItem value='Limpieza'>Limpieza</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name='description'
                value={inputsValues.description}
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
                label='Importe'
                name='amount'
                value={inputsValues.amount}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Encargado de Servicio</InputLabel>
                <Select
                  label='idAssignedMaintenanceUser'
                  name='idAssignedMaintenanceUser'
                  //onChange={handleInputChange}
                  value={inputsValues.idAssignedMaintenanceUser}>
                  <MenuItem value='1'>Mario Rios</MenuItem>
                  <MenuItem value='2'>Osuma Poma</MenuItem>
                  <MenuItem value='3'>Peres Rios</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleAddServicey} disabled={isLoading} variant='contained' autoFocus>
            {isLoading ? 'Añadiendo Servicio...' : 'Guardar Servicio'}
          </Button>
          {isError && <div> Error add Servicey </div>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InsertServicey
