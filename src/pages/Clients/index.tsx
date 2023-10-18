import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Card from '@mui/material/Card'
import InsertClient from 'src/components/InsertClient'
import ClientList from 'src/components/ClientList'



const Client = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Lista de Clientes
        </Typography>

        <InsertClient />
      </Grid>

      <Grid item xs={12}>
        <Card>
    
          <ClientList />
        </Card>
      </Grid>

    </Grid>
    
  
  )
}

export default Client

