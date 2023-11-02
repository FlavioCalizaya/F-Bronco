import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import UserList from 'src/components/UserList'
import InsertUser from 'src/components/InsertUser'

const User = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
      
            Lista De Usuarios
          
        </Typography>     
        <InsertUser />
      </Grid>
      <Grid item xs={12}>
        <Card>          
          <UserList />
        </Card>
      </Grid>

    </Grid>

  )
}
export default User