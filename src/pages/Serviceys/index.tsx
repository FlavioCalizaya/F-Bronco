import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import InsertServicey from 'src/components/Servicey/InsertServicey'
import ServiceyList from 'src/components/Servicey/ServiceyList'



const Servicey = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Lista de Servicios
        </Typography>

        <InsertServicey />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Servicios' titleTypographyProps={{ variant: 'h6' }} />
          <ServiceyList />
        </Card>
      </Grid>

    </Grid>
    
  
  )
}

export default Servicey
