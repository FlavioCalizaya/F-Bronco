import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress';
import {useGetAllServicesQuery } from 'src/api/serviceApi'
import UpdateService from '../UpdateService'
import DeleteService from '../DeleteService'

export default function ServiceList(){
  
interface Service {

  idService: number;
  typeService: string;
  description: string;
  amount:number;
  idUser: number;
  idClient: number;
  estado:number;
  startDate:Date;
  conclusionDate:Date;

  
}

    // @ts-ignore
  const { data, isLoading} = useGetAllServicesQuery()
 
  return (  
    isLoading ?  <CircularProgress/>:
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>   
            <TableCell align='left'>Tipo De Servicio </TableCell>     
            <TableCell align='left'>Descripcion</TableCell>                      
            <TableCell align='left'>Importe</TableCell>
            <TableCell align='left'>Nombre Del Usuario </TableCell>     
            <TableCell align='left'>Nombre Del Cliente</TableCell>    

            <TableCell align='left'>Fecha De Inicio</TableCell>
            <TableCell align='left'>Fecha De Conclusion </TableCell>     
                           
          
            <TableCell align='left'>Editar</TableCell>
            <TableCell align='left'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((Service: Service,item:number) => (
            <TableRow
              key={Service.idService}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell  align='left' component='th' scope='row'>{item +1}</TableCell>
              <TableCell align='left'>{Service.idService}</TableCell>
              <TableCell align='left'>{Service.typeService}</TableCell>
              <TableCell align='left'>{Service.description}</TableCell>
              <TableCell align='left'>{Service.amount}</TableCell>
              <TableCell align='left'>{Service.idUser}</TableCell>
              <TableCell align='left'>{Service.idClient}</TableCell>

              <TableCell align='left'>{Service.startDate}</TableCell>
              <TableCell align='left'>{Service.conclusionDate}</TableCell>
             
              <TableCell align='left'>
              <UpdateService id={Service.idService}/>             
              </TableCell>

              <TableCell align='left'>
              <DeleteService id={Service.idService}/>                            
              </TableCell>     
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
  )
}


