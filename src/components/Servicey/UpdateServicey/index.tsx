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
import { useGetServiceyByIDQuery, useUpdateServiceyMutation } from 'src/api/Servicey/serviceyApi'
import Link from '@mui/material/Link'
import { IconButton } from '@mui/material'
import Update from 'mdi-material-ui/Update'


const initialValuesInputs= { 
    serviceType:'',
    description:'',
    amount:0,
    //idUser: 3,
    //estado:0,
    //dateInit:"2023-10-16T02:04:43.000+00:00",
    //idAssignedMaintenanceUser: 4, 
    statusMaintenance: false, 
    //dateEnd:"2023-10-26T02:09:04.000+00:00" , 
    //client: {"id": 1,"nitCi": "76576","businessName": "liss","phoneNumber": 67868,"estado": 0}
}

const UpdateServicey = ({ id }: { id: number }) => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))


  const { data: servicey } = useGetServiceyByIDQuery(id);


  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setinputsValues({
      ...inputsValues,
      [name]: value
    })
  }

  const handleClickOpen = () => {
    setinputsValues(servicey )
    setOpen(true)
   
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [inputsValues, setinputsValues] = useState(initialValuesInputs);

  const [updateServicey, { isLoading, isError }] = useUpdateServiceyMutation();


  const handleUpdateServicey = async () => {
    const updatedServiceyData = {
      id: id,
      values: { 
        serviceType: inputsValues.serviceType ,
        description: inputsValues.description,
        amount: inputsValues.amount,
        statusMaintenance: false
      } 
    };
    console.log('yyyeee', updatedServiceyData)
    try {
      await updateServicey(updatedServiceyData).unwrap();
      handleClose();
    } catch (error) {
      console.error('Error updating servicey:', error);
    }
  };
  

  return (
    <div>
      <IconButton aria-label='Update' color='primary' onClick={handleClickOpen}>
        <Update />
      </IconButton>
  
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {' '}
          <Link href='#'> Actualizar Servicio </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Cliente</InputLabel>
                <Select
                  label='Client'
                  name='client'
                  //onChange={handleInputChange}
                  //defaultValue={inputsValues.client}
                >
                  <MenuItem value='1'>Mario Rios</MenuItem>
                  <MenuItem value='2'>Osuma Poma</MenuItem>
                  <MenuItem value='3'>Peres Rios</MenuItem>
                </Select>
              </FormControl>
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
                  //value={inputsValues.idAssignedMaintenanceUser}
                  >
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
          <Button  
          disabled={isLoading}  
          onClick={ handleUpdateServicey } 
          variant='contained' 
          autoFocus>
            {isLoading ? 'Actualizando servicey...' : 'Actualizar servicey'}
          </Button>
          {isError && <div> Error update servicey </div>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateServicey
