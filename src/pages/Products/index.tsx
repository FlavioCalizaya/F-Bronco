// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Components Imports
import ProductList from 'src/components/ProductList'
import InsertProducts from 'src/components/InsertProduct'

const Products = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#' target='_blank'>
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
  )
}

export default Products
