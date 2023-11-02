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
import { useGetUserByIDQuery, useUpdateUserMutation } from 'src/api/userApi'
import Link from '@mui/material/Link'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';


const initialValuesInputs= { 
  nombre: 'Cargando',
  primerApellido: 'Cargando',
  segundoApellido: 'Cargando',
  ci: 'Cargando',
  rol: 'Cargando'
}

const UpdateUser= ({ id }: { id: number }) => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))


  const { data: product } = useGetUserByIDQuery(id);


  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setinputsValues({
      ...inputsValues,
      [name]: value
    })
  }

  const handleClickOpen = () => {

  setinputsValues(product )

    setOpen(true)
   
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [inputsValues, setinputsValues] = useState(initialValuesInputs);

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();


  const handleUpdateUser = async () => {
    const updatedUserData = {
      id: id,
      value: inputsValues 
    };
    try {
      await updateUser(updatedUserData).unwrap();
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  return (
    <div>
      <IconButton aria-label='Edit' color='primary' onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
  
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
        
          <Link href='#'> Modificar  Usuario </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px' }}>
                       
            <Grid item xs={12} sm={6}>
              <TextField
                name='nombre'
                value={inputsValues.nombre}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='Nombre'
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                name='primerApellido'
                value={inputsValues.primerApellido}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='Primer Apellido'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='segundoApellido'
                value={inputsValues.segundoApellido}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='Segundo Apellido'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='ci'
                value={inputsValues.ci}
                onChange={(e: any) => handleInputChange(e)}
                fullWidth
                label='C.I.'
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>rol</InputLabel>
                <Select label='rol' name='rol' onChange={handleInputChange} defaultValue={inputsValues.rol}>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='user'>User</MenuItem>
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
          onClick={ handleUpdateUser } 
          variant='contained' 
          autoFocus>
            {isLoading ? 'Actualizando Usuario...' : 'Actualizar Usuario'}
          </Button>
          {isError && <div> Error update User </div>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateUser
