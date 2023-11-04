import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Card from '@mui/material/Card'
import MaintenanceList from 'src/components/Maintenance/MaintenanceList'



const Maintenance = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Lista de Mantenimientos
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <MaintenanceList />
        </Card>
      </Grid>

    </Grid>
    
  
  )
}

export default Maintenance
