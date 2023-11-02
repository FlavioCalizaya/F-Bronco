import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { Provider } from 'react-redux'
import { store } from 'src/store'
import InsertSales from 'src/components/Sale/InsertSale'
import SalesList from 'src/components/Sale/SaleList'

const Sales = () => {
  return (
    <Provider store={ store }>

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#'>
            Lista de Ventas
          </Link>
        </Typography>
        <Typography variant='body2'>Registros de las ventas realizadas.</Typography>
        <InsertSales />
    </Grid>
  
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Ventas' titleTypographyProps={{ variant: 'h6' }} />
          <SalesList />
        </Card>
      </Grid>

    </Grid>
    </Provider>

  )
}

export default Sales
