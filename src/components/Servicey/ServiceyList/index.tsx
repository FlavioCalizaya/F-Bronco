import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress';
import { useGetAllServiceyQuery } from 'src/api/Servicey/serviceyApi'


export default function ServiceyList(){
  
interface Servicey {

  id: number;
  serviceType: number;
  description: string;
  amount: number;
  estado:number;
  statusMaintenance:number;
  
}

    // @ts-ignore
  const { data, isLoading} = useGetAllServiceyQuery()
 
  return (  
    isLoading ?  <CircularProgress/>:
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>   

            <TableCell align='left'>Cliente </TableCell>     
            <TableCell align='left'>Tipo Servicio </TableCell>     
            <TableCell align='left'>Descripcion</TableCell>      
            <TableCell align='left'>Importe</TableCell>
            <TableCell align='left'>Usuario Mantenimiento</TableCell>
            <TableCell align='left'>Estado</TableCell>
            <TableCell align='left'>Editar</TableCell>
            <TableCell align='left'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((servicey: Servicey,item:number) => (
            <TableRow
              key={servicey.serviceType}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell align='left' component='th' scope='row'>{item +1}</TableCell>
              <TableCell align='left'>MMMAA AA</TableCell>
              <TableCell align='left'>{servicey.serviceType}</TableCell>
              <TableCell align='left'>{servicey.description}</TableCell>
              <TableCell align='left'>{servicey.amount}</TableCell>
              <TableCell align='left'>aaaaaaa</TableCell>
              <TableCell align='left'><small style={{ backgroundColor: servicey.statusMaintenance ? 'green' : 'red', borderRadius:30, color:'white'}}>{servicey.statusMaintenance? ' Finalizado ':' Pendiente '}</small></TableCell>
              
              {/* <TableCell align='left'>
              <UpdateServicey data={servicey}/>             
              </TableCell>

              <TableCell align='left'>
              <DeleteServicey data={servicey}/>                            
              </TableCell>   */}   
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
  )
}


