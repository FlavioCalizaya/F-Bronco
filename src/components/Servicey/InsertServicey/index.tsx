/* import Button from '@mui/material/Button'
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
import { useAddNewServiceyMutation } from 'src/api/serviceyApi'

const InsertServicey = () => {
  const [open, setOpen] = useState(false)
 
  const [nitCi, setNitCi] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [createNewServicey] = useAddNewServiceyMutation()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addServicey = async (e:any) => {
    e.preventDefault();

    const values = {id:1, nitCi, businessName, phoneNumber}
    const res =  await createNewServicey(values).unwrap();

    if (res) {
      console.log('Servicio creado con exito')
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
        Agregar Servicio
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>{'Añadir Un Nuevo Servicio '}</DialogTitle>
        <DialogContent>
        <Box onSubmit={addServicey} component="form">
          <Grid container spacing={7} style={{ marginTop: '1px' }}>

            <Grid item xs={12} sm={6}>            
            <TextField required fullWidth type='text' label='NIT/CI' value={businessName} onChange={(e)=>setBusinessName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField required fullWidth type='text' label='RAZON SOCIAL' value={nitCi} onChange={(e)=>setNitCi(e.target.value)}/>
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
export default InsertServicey */
