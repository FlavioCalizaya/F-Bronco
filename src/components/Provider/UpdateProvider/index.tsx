import {Button, Box, IconButton} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit';

import { useState } from 'react'
import { useUpdateProviderMutation } from 'src/api/providerApi'

const UpdatePovider = (data:any) => {

  const [open, setOpen] = useState(false)
  
  const [id, setID] = useState(data.data.id);
  const [nitCi, setNitCi] = useState(data.data.nitCi);
  const [businessName, setBusinessName] = useState(data.data.businessName);
  const [phoneNumber, setPhoneNumber] = useState(data.data.phoneNumber);
  const [address, setAddress] = useState(data.data.address);
  
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  
  const [ updateProvider ] = useUpdateProviderMutation()



    
  
  const handleClickOpen = () => {
   //const provider = getProviderByID(id).unwrap().then()
   //console.log(provider)
    setOpen(true)
  }
  
  const handleClose = () => {

    setOpen(false)
  }
  
  const editProvider = async (e:any) => {
    e.preventDefault();
    const values = {nitCi, businessName, address, phoneNumber}

    const res =  await updateProvider({id, values}).unwrap();
    if (res){
      console.log('Proveedor modificado con exito')
      handleClose()
    }else{
      console.log('Error al actualizar')
      handleClose()
    }

  }

  return (
    <div>
      <IconButton aria-label='Edit' color="primary" onClick={handleClickOpen}>
      <EditIcon/>
      </IconButton>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>{'Editar Proveedor'}</DialogTitle>
        <DialogContent>

          <Box onSubmit={editProvider} component="form">
            <Grid container spacing={7} style={{ marginTop: '1px' }}>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth type='text' label='NIT / CI' value={nitCi} onChange={(e)=>setNitCi(e.target.value)}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth type='text' label='Razon social' value={businessName} onChange={(e)=>setBusinessName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField required fullWidth type='text' label='Teléfono' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField required fullWidth type='text' label='Dirección' value={address} onChange={(e)=>setAddress(e.target.value)} />
              </Grid>
            </Grid>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant='contained' type='submit'  autoFocus>
              Modificar
            </Button>
          </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdatePovider