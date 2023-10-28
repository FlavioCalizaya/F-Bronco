import React from 'react';
import { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { IconButton } from '@mui/material'
import Delete from 'mdi-material-ui/Delete'
import { useDeletepurchaseMutation } from 'src/api/purchaseApi';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RemovePurchase(data:any) {

  const [open, setOpen] = React.useState(false);

  const [id, setID] = useState(data.data.id);
  const [ removePurchase ] = useDeletepurchaseMutation()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removePurchaseByID = async () => {

    const res =  await removePurchase(id).unwrap();
    if (res){
      console.log('Compra eliminado con exito')
      handleClose()
    }else{
      console.log('Error al eliminar')
      handleClose()
    }
  }

  return (
    <div>
      <IconButton aria-label='Delete' color="error" onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Esta seguro de anular la compra"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {data.data.provider.businessName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={removePurchaseByID}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
