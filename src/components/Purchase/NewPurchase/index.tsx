import {Button} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { useState } from 'react'
import { useAddNewpurchaseMutation } from 'src/api/purchaseApi'
import TagsSearch from 'src/views/search/PurchaseStepper'
import { useGetAllProvidersQuery } from 'src/api/providerApi'

const InsertPurchase = () => {
  const [open, setOpen] = useState(false)

  const [nitCi, setNitCi] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const [createNewPurchase] = useAddNewpurchaseMutation()
  const {data:provider, isLoading} =  useGetAllProvidersQuery()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addPurchase = async (e:any) => {
    e.preventDefault();

    const values = {id:1, nitCi, businessName, address, phoneNumber}
    const res =  await createNewPurchase(values).unwrap();

    if (res) {
      console.log('Proveedoer creado con exito')
      handleClose()
      setNitCi('')
      setBusinessName('')
      setPhoneNumber('')
      setAddress('')
    } else {
      console.log('Error')
    }

  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Registrar nueva compra
      </Button>
      <Dialog fullScreen={fullScreen} maxWidth={'lg'} fullWidth={true} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>{'Registrar nueva compra'}</DialogTitle>
        <DialogContent>

        <TagsSearch data={provider}/>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InsertPurchase