import React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import CardProvider from 'src/views/cards/CardProvider';
import CardPurchase from 'src/views/cards/CardPurchase';
import CardPurchaseDetail from 'src/views/cards/CardPurchaseDetail';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PurchaseDetail(data:any) {

  const [open, setOpen] = React.useState(false);

  //const [id, setID] = useState(data.data.id);
  //const [ removePurchase ] = useDeletepurchaseMutation()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button  variant='outlined' onClick={handleClickOpen}>
        Ver detalle        
      </Button>
      <Dialog
        open={open}
        maxWidth={'md'}
        fullWidth={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >
        <Grid item xs={10} sx={{ pb:2, pt: theme => `${theme.spacing(5)} !important` }}>
        <Typography variant='h5'>DETALLE DE COMPRA</Typography>
      </Grid>
        </DialogTitle>
        <DialogContent>
        <Grid container spacing={6} mb={10}>
        <Grid item xs={12} sm={6} md={6}>
          <CardPurchase data={data} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardProvider data={data.data.provider}/>
        </Grid>
        </Grid>
          <CardPurchaseDetail data={data.data.purchaseDetails}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
