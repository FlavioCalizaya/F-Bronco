import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { IconButton } from '@mui/material'
import Update from 'mdi-material-ui/Update'
import Delete from 'mdi-material-ui/Delete'

const ClientList = () => {
  
  const createData = (
    
    razonSocial: string,
    nit: string,
    telefono: number
  ) =>{
    return {razonSocial,nit,telefono}
  }
  const rows = [
    createData('Alejandra', '9879876-B', 6576787),
    createData('Amanda', '678674-A', 4654656),
    createData('lesly', '465646-E', 45363564)
  ]
 

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='right'>Razon Social </TableCell>
            <TableCell align='right'>Nit </TableCell>
            <TableCell align='right'>Telefono </TableCell>
            <TableCell align='right'>Modificar</TableCell>
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow>             
              <TableCell align='right'>{row.razonSocial}</TableCell>
              <TableCell align='right'>{row.nit}</TableCell>
              <TableCell align='right'>{row.telefono}</TableCell>
              <TableCell align='right'>
                <IconButton aria-label='Update' color="primary">
                  <Update />
                </IconButton>
              </TableCell>
              <TableCell align='right'>
                <IconButton aria-label='Delete' color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ClientList
