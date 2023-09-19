// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
//import { ThemeColor } from 'src/@core/layouts/types'
import { useGetAllProvidersQuery } from 'src/api'

interface RowType {
  id: number
  name: string
  lastName: string
  age: number
}


const DashboardTable = () => {

  // @ts-ignore
const {data, isLoading} = useGetAllProvidersQuery()
console.log(data)


  return (
    <Card sx={{padding:10}}>
      
      {isLoading? <h5>Cargando....</h5>:
      
      
      <TableContainer>
        <h1>Usuarios</h1>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Numero</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Edad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((user: RowType) => (
              <TableRow hover key={user.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{user.id}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      }
    </Card>

  )
}

export default DashboardTable
