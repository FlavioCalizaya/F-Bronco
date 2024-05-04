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
import { Autocomplete, IconButton } from '@mui/material'
import Update from 'mdi-material-ui/Update'
import { useGetAllClientQuery } from 'src/api/clientApi'


const initialValuesInputs= { 
    serviceType:'',
    description:'',
    amount:0,
    //idUser: 3,
    //estado:0,
    //dateInit:"2023-10-16T02:04:43.000+00:00",
    //idAssignedMaintenanceUser: 4, 
    statusMaintenance: "pendiente", 
    //dateEnd:"2023-10-26T02:09:04.000+00:00" , 
    client: {"id": 1,"nitCi": "76576","businessName": "liss","phoneNumber": 67868,"estado": 0},
    //client: {},
    assignedMaintenanceUser: {}, 
}

interface Client {
  nitCi: string;
  businessName: string;
  phoneNumber: number;
}
interface AssignedMaintenanceUser {
  nombre:string;
  primerApellido: string;
  segundoApellido: string;
  ci: string;
  rol: string;
  estado: number;
  userName:string;
  password:string;
}

const UpdateServicey = ({ id }: { id: number }) => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [assignedMaintenanceUsers, setAssignedMaintenanceUsers] = useState([])
  const { data: servicey } = useGetServiceyByIDQuery(id);
  const [inputsValues, setinputsValues] = useState(initialValuesInputs);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setinputsValues({
      ...inputsValues,
      [name]: value
    })
  }

  const handleClickOpen = () => {
    setinputsValues(servicey)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

 
  console.log('inputsValues', inputsValues)
  const [updateServicey, { isLoading, isError }] = useUpdateServiceyMutation();

  const handleClientChange = (client: any) => {
    console.log('gggdd',client)
    setinputsValues({
      ...inputsValues,
      client
    })
    console.log('hhh', inputsValues)
  }

  const handleAssingChange = (assignedMaintenanceUser: any) => {
    console.log('gggdd',assignedMaintenanceUser)
    setinputsValues({
      ...inputsValues,
      assignedMaintenanceUser
    })
    console.log('hhh', inputsValues)
  }

  const { data: clients} = useGetAllClientQuery();

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/api/v1/users");
      const data = await response.json();
      setAssignedMaintenanceUsers(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(()=>{
    fetchData();
  }
  ,[])
  console.log('servicessss', servicey)
  const handleUpdateServicey = async () => {
 
    const updatedServiceyData = {
      id: id,
      values: { 
        client: inputsValues.client ,
        serviceType: inputsValues.serviceType ,
        description: inputsValues.description,
        amount: inputsValues.amount,
        statusMaintenance: inputsValues.statusMaintenance,
        assignedMaintenanceUser: servicey.assignedMaintenanceUser
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
          <Link href='#'> Modificar Servicio </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '10px' }}>
          
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={clients ? clients : []}
                value={inputsValues.client}
                getOptionLabel={(option: Client) => option.businessName}
                onChange={ (e, newValue:any ) => { handleClientChange( newValue ) } }
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Cliente'
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
              <Autocomplete
                options={assignedMaintenanceUsers ? assignedMaintenanceUsers : []}
                value={inputsValues.assignedMaintenanceUser}
                getOptionLabel={(option: AssignedMaintenanceUser) => option.nombre}
                onChange={ (e, newValue:any ) => { handleAssingChange( newValue ) } }
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Encargado Mantenimiento'
                    variant='outlined'
                  />
                )}
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
          onClick={ handleUpdateServicey } 
          variant='contained' 
          autoFocus>
            {isLoading ? 'Actualizando ...' : 'Actualizar'}
          </Button>
          {isError && <div> Error update servicey </div>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateServicey
