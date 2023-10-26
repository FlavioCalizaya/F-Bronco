import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import Delete from 'mdi-material-ui/Delete'
import {useDeleteClientMutation} from 'src/api/clientApi';





const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteClient( data:any ) {

  const [open, setOpen] = React.useState(false);

  const [id, setID] = useState(data.data.id);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ DeleteClient,{ isLoading, isError }] = useDeleteClientMutation()


  const deleteClientByID = async (e:any) => {
    e.preventDefault();

    console.log(id)

    const res =  await DeleteClient(id).unwrap();
    if (res){
      console.log('client eliminado con exito')
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
        <DialogTitle>{"Esta seguro de elimar el client"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {data.data.businessName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>Cancelar</Button>

          <Button  variant='contained'
          disabled={ isLoading }
            onClick={deleteClientByID } >
              { isLoading ? 'Eliminando Client...' : 'Eliminar Client'} 
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
