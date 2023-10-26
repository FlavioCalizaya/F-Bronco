import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import PurchaseList from 'src/components/Purchase/ListPurchases'
import InsertPurchase from 'src/components/Purchase/NewPurchase'

const Purchase = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            Lista de Compras
        </Typography>
        <InsertPurchase/>
      </Grid>
  
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Compras' titleTypographyProps={{ variant: 'h6' }} />
          <PurchaseList/>
        </Card>
      </Grid>

    </Grid>
  )
}

export default Purchase