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
import { useGetMaintenanceByIDQuery, useUpdateMaintenanceMutation } from 'src/api/Servicey/maintenanceApi'
import Link from '@mui/material/Link'
import { IconButton } from '@mui/material'
import Update from 'mdi-material-ui/Update'


const initialValuesInputs= { 
    serviceType:'',
    description:'',
    //amount:0,
    //idUser: 3,
    //estado:0,
    dateInit:'',
    //idAssignedMaintenanceUser: 4, 
    statusMaintenance: false, 
    dateEnd:'' , 
    //client: {"id": 1,"nitCi": "76576","businessName": "liss","phoneNumber": 67868,"estado": 0}
}

const UpdateMaintenance = ({ id }: { id: number }) => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))


  const { data: servicey } = useGetMaintenanceByIDQuery(id);


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

  const [date, setDate] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const [inputsValues, setinputsValues] = useState(initialValuesInputs);

  const [updateServicey, { isLoading, isError }] = useUpdateMaintenanceMutation();


  const handleUpdateMaintenance = async () => {
    const updatedServiceyData = {
      id: id,
      values: { 
        serviceType: inputsValues.serviceType ,
        description: inputsValues.description,
        statusMaintenance: false,//inputsValues.statusMaintenance,
        dateInit:inputsValues.dateInit,
        dateEnd:inputsValues.dateEnd , 
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
                <TextField type='date' fullWidth placeholder='Fecha de Inicio' 
                value={inputsValues.dateInit} onChange={(e)=>setDate(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField type='date' fullWidth placeholder='Fecha Final' 
                value={inputsValues.dateEnd} onChange={(e)=>setDate(e.target.value)}/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado de Mantenimiento</InputLabel>
                <Select
                  label='statusMant'
                  name='statusMant'
                  onChange={handleInputChange}
                  defaultValue={inputsValues.statusMaintenance}
                >
                  <MenuItem value='0'>Pendiente</MenuItem>
                  <MenuItem value='1'>Finalizado</MenuItem>
                  <MenuItem value='2'>Observado</MenuItem>
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
          onClick={ handleUpdateMaintenance } 
          variant='contained' 
          autoFocus>
            {isLoading ? 'Guardardo Mantenimiento...' : 'Guardar Maintenance'}
          </Button>
          {isError && <div> Error update Mantenimiento </div>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateMaintenance
