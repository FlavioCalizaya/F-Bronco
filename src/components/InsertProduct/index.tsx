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

const InsertProduct = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Insertar Producto
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>{'Añadir nuevo Producto'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ marginTop: '1px' }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Cod I' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select label='Role' defaultValue='MT'>
                  <MenuItem value='MT'>MT</MenuItem>
                  <MenuItem value='AT'>AT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='text' label='Marca' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='outlined-multiline-static'
                label='Descripcion'
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Alto' />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Ancho' />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Esp' />
            </Grid>
          </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleClose} autoFocus>
            Añadir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InsertProduct
