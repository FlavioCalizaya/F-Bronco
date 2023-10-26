import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import UserList from 'src/components/UserList'
import InsertUser from 'src/components/InsertUser'
import {Provider} from 'react-redux'
import { store } from 'src/store'

const User = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#'>
            Lista de Usuarios
          </Link>
        </Typography>     
        <InsertUser />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Usuarios' titleTypographyProps={{ variant: 'h6' }} />
          <UserList />
        </Card>
      </Grid>

    </Grid>

  )
}
export default User