import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ProductList from 'src/components/Product/ProductList'
import InsertProducts from 'src/components/Product/InsertProduct'
import {Provider} from 'react-redux'
import { store } from 'src/store'

const Products = () => {
  return (
    <Provider store={ store }>

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#'>
            Lista de Productos
          </Link>
        </Typography>
        <Typography variant='body2'>Productos disponibles para la venta.</Typography>
        <InsertProducts />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Productos' titleTypographyProps={{ variant: 'h6' }} />
          <ProductList />
        </Card>
      </Grid>

    </Grid>
    </Provider>

  )
}

export default Products
