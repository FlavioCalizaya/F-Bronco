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
import { useState } from 'react'
import { useAddNewUserMutation } from 'src/api/userApi'
import Link from '@mui/material/Link'

const InsertUser = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const initialValuesInputs= { 
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    ci: '',
    rol: '',
    nameUser: '',
    password: ''   
  
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

  const [addNewUser, { isLoading, isError }] = useAddNewUserMutation();

  const handleAddUser = async () => {

    // Validar que los campos no estén en blanco
  if (
    !inputsValues.nombre ||
    !inputsValues.primerApellido ||
    !inputsValues.segundoApellido ||
    !inputsValues.ci ||
    !inputsValues.rol ||
    !inputsValues.nameUser ||
    !inputsValues.password
  ) {
    
    alert('Por favor, Llene todos los campos antes de agregar un Usuario.');
    return; 
  }
    const newUser = {
      idUser: 1,
      nombre: inputsValues.nombre,
      primerApellido: inputsValues.primerApellido,   
      segundoApellido: inputsValues.segundoApellido,   
      estado: 1,
      ci: inputsValues.ci,
      rol: inputsValues.rol,

      nameUser: inputsValues.nameUser,
      password: inputsValues.password
     
    };

    try{
      await addNewUser( newUser ).unwrap();
      handleClose();
      setinputsValues( initialValuesInputs );
    } catch( error ) {
      console.log(error );
    }
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Insertar Usuario
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>  <Link href='#'> Añadir nuevo User </Link></DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px'}}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='nombre'
                value={inputsValues.nombre}
                onChange={ handleInputChange }
                fullWidth
                label='Nombre'
                type='text'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='primerApellido'
                value={inputsValues.primerApellido}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='primer Apellido'
                type='text'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='segundoApellido'
                value={inputsValues.segundoApellido}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='segundo Apellido'
                type='text'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='ci'
                value={inputsValues.ci}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='C.I.'
                type='text'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>rol</InputLabel>
                <Select label='rol' name='rol' onChange={ handleInputChange } defaultValue={ inputsValues.rol }>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='user'>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>          
         
          <Grid item xs={12} sm={6}>
              <TextField
                name='nameUser'
                value={inputsValues.nameUser}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='User Name'
                type='text'
              />
            </Grid>
            
             
            <Grid item xs={12} sm={6}>
              <TextField
                name='password' 
                value={inputsValues.password}
                id='auth-register-password'
                onChange={handleInputChange}                
                fullWidth                 
                label='Password'  aria-label='toggle password visibility'
                type='password'
              
              />
            </Grid>                     
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={ handleAddUser } disabled={ isLoading } variant='contained' autoFocus>
            { isLoading ? 'Añadiendo Usuario...' : 'Añadir Usuario'}
          </Button>
          { isError && <div> Error adding User </div> }
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InsertUser
