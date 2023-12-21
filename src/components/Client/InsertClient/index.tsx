import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'

import { useState } from 'react'
import { useAddNewClientMutation } from 'src/api/clientApi'

const InsertClient = () => {
  const [open, setOpen] = useState(false)
 
  const [nitCi, setNitCi] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [createNewClient] = useAddNewClientMutation()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addClient = async (e:any) => {
    e.preventDefault();

    const values = {id:1, nitCi, businessName, phoneNumber}
    const res =  await createNewClient(values).unwrap();

    if (res) {
      console.log('Cliente creado con exito')
      handleClose()

      setNitCi('')
      setBusinessName('')
      setPhoneNumber('')
     
    } else {
      console.log('Error Al Crear')
    }
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Agregar Cliente
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>{'Añader Un Nuevo Cliente '}</DialogTitle>
        <DialogContent>
        <Box onSubmit={addClient} component="form">
          <Grid container spacing={7} style={{ marginTop: '1px' }}>

            <Grid item xs={12} sm={6}>            
            <TextField required fullWidth type='text' label='NIT/CI' value={nitCi} onChange={(e)=>setNitCi(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField required fullWidth type='text' label='RAZON SOCIAL' value={businessName} onChange={(e)=>setBusinessName(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField required fullWidth type='number' label='TELEFONO'  value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </Grid>
          </Grid>          
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' type='submit'  autoFocus>
            Añadir
          </Button>
      </DialogActions>
      </Box>
      </DialogContent>
      </Dialog>
    </div>
  )
}
export default InsertClient
