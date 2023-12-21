import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress';

import { useGetAllClientQuery } from 'src/api/clientApi'
import UpdateClient from '../UpdateClient'
import DeleteClient from '../DeleteClient'

export default function ClientList(){
  
interface Client {

  id: number;
  nitCi: number;
  businessName: string;
  phoneNumber: number;
  estado:number;
  
}

    // @ts-ignore
  const { data, isLoading} = useGetAllClientQuery()
 
  return (  
    isLoading ?  <CircularProgress/>:
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>   
            <TableCell align='left'>Razon Social </TableCell>     
            <TableCell align='left'>Nit/C.I.</TableCell>      
                    
            <TableCell align='left'>Telefono</TableCell>

            <TableCell align='left'>Editar</TableCell>
            <TableCell align='left'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((client: Client,item:number) => (
            <TableRow
              key={client.nitCi}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell  align='left' component='th' scope='row'>{item +1}</TableCell>
              <TableCell align='left'>{client.businessName}</TableCell>
              <TableCell align='left'>{client.nitCi}</TableCell>
              <TableCell align='left'>{client.phoneNumber}</TableCell>
             
              <TableCell align='left'>
              <UpdateClient data={client}/>             
              </TableCell>

              <TableCell align='left'>
              <DeleteClient data={client}/>                            
              </TableCell>     
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
  )
}


