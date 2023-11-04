import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IconButton } from '@mui/material';
import Delete from 'mdi-material-ui/Delete'
import { useDeleteProductMutation } from 'src/api/Product';
import { useDeleteSaleMutation } from 'src/api/Sale';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteSale( { id }: { id: number } ) {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [deleteSale, { isLoading, isError }] = useDeleteSaleMutation();

  const handleDeleteSale = async () => {
    try {
      await deleteSale({id}).unwrap();
      handleClose();
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

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
        <DialogTitle>{"Estas seguro de eliminar?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Si eliminas la venta, no podrás ver en tu lista de ventas.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        
          <Button 
          variant='contained'
          disabled={ isLoading } 
          onClick={ handleDeleteSale }
          >
           { isLoading ? 'Eliminando venta...' : 'Eliminar venta'} 
            </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}