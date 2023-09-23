import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import InsertClient from 'src/components/InsertClient'
import ClientList from 'src/components/ClientList'


const Client = () => {
  return (


    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#'>
            Lista de Clientes
          </Link>
        </Typography>
        <Typography variant='body2'>Clients</Typography>
        <InsertClient />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Client' titleTypographyProps={{ variant: 'h6' }} />
          <ClientList />
        </Card>
      </Grid>

    </Grid>
    

  )
}

export default Client

