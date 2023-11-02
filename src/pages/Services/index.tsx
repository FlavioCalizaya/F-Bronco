import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ServiceList from 'src/components/ServiceList'
import InsertService from 'src/components/InsertService'



const Services = () => { 
  return (
   

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          
        </Typography>
        <Typography variant='body2'>Servicios</Typography>
        <InsertService />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Services' titleTypographyProps={{ variant: 'h6' }} />
          <ServiceList />
        </Card>
      </Grid>

    </Grid>
 

  )
}

export default Services
