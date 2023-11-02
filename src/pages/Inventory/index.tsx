import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import InventoryList from 'src/components/Inventory/ListInventory'
import InsertInventory from 'src/components/Inventory/InsertInventory'

const Inventory = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            Lista de Inventarios
        </Typography>
        {/*<InsertInventory/>*/}
      </Grid>
  
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Inventarios' titleTypographyProps={{ variant: 'h6' }} />
          <InventoryList/>
        </Card>
      </Grid>

    </Grid>
  )
}

export default Inventory