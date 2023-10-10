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
import { useDeleteProviderMutation } from 'src/api/providerApi';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RemoveProvider(data:any) {

  const [open, setOpen] = React.useState(false);

  const [id, setID] = useState(data.data.id);
  const [ removeProvider ] = useDeleteProviderMutation()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeProviderByID = async () => {

    const res =  await removeProvider(id).unwrap();
    if (res){
      console.log('Proveedor eliminado con exito')
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
        <DialogTitle>{"Esta seguro de elimar el Proveedor"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {data.data.businessName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={removeProviderByID}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
