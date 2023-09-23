import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { IconButton } from '@mui/material'
import Update from 'mdi-material-ui/Update'
import { useGetAllClientQuery } from 'src/api/Client'
import DeleteClient from '../DeleteClient'

interface RowType {
  idClient: number;
  nit_ci: number;
  business_name: string;
  phone_number: number;
  estado:number;
  
}

const ClientList = () => {

    // @ts-ignore
  const { data, isLoading} = useGetAllClientQuery();
  console.log( data )
  return (
    <>
  
    { isLoading ? <h5>Cargando..</h5>:
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Cod I</TableCell>
            <TableCell align='right'>Nit/C.I.</TableCell>
            <TableCell align='right'>Razon Social </TableCell>
            <TableCell align='right'>Telefono</TableCell>
            <TableCell align='right'>Actualizar</TableCell>
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((client: RowType) => (
            <TableRow
              key={client.idClient}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell align='right'>{client.nit_ci}</TableCell>
              <TableCell align='right'>{client.business_name}</TableCell>
              <TableCell align='right'>{client.phone_number}</TableCell>
              <TableCell align='right'>{client.estado}</TableCell>

              <TableCell align='right'>
                <IconButton aria-label='Update' color="primary">
                  <Update />
                </IconButton>
              </TableCell>
              <TableCell align='right'>
              <DeleteClient id={ client.idClient } />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            }
    </>
  )
}

export default ClientList
