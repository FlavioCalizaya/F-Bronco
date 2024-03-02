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
import { useDeleteServiceyMutation } from 'src/api/Servicey/serviceyApi';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteServicey( data:any ) {

  const [open, setOpen] = React.useState(false);

  const [id, setID] = useState(data.data.id);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ DeleteServicey,{ isLoading, isError }] = useDeleteServiceyMutation()


  const deleteServiceyByID = async (e:any) => {
    e.preventDefault();

    console.log(id)

    const res =  await DeleteServicey(id).unwrap();
    console.log('Servicio eliminado con exito', res)
    if (res){
      console.log('Servicio eliminado con exito')
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
        <DialogTitle>{"Esta seguro de eliminar el servicio"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {data.data.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>Cancelar</Button>

          <Button  variant='contained'
          disabled={ isLoading }
            onClick={deleteServiceyByID } >
              { isLoading ? 'Eliminando Servicio...' : 'Eliminar Servicio'} 
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
