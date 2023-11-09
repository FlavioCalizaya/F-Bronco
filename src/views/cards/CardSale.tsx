// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid';

// ** Icons Imports
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { dateParse } from 'src/utils/dateParser'

const CardSale = ( {data}:any ) => {

  console.log( data );
  return (
    <Card sx={{ border: 0, boxShadow: 2, color: 'common.white', backgroundColor: 'info.main' }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
          <ReceiptLongIcon sx={{ marginRight: 2.5 }} />
          Venta
        </Typography>
        <Grid
          container
          direction="column"
          justifyContent="left"
          alignItems="start"
          spacing={1}
        >
            <Typography
          variant='body2'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
          Nro Correlativo: { data.nroCorrelativo }
        </Typography>
        <Typography
          variant='body2'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
          Fecha de Compra: {dateParse(data.fecha)}
        </Typography>
        <Typography
          variant='body2'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
          Total Compra Bs. {data.total}
        </Typography>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardSale
