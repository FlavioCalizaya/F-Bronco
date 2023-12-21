import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress';
import { useGetAllServiceyQuery } from 'src/api/Servicey/serviceyApi'
import UpdateServicey from '../UpdateServicey'
import { ThemeColor } from 'src/@core/layouts/types'
import Chip from '@mui/material/Chip'



export default function ServiceyList(){
  

interface Client{
  id:number
  nitCi: string
  businessName: string
  address: string
  phoneNumber: number
}

interface User{
  nombre: string,
	primerApellido: string,
	segundoApellido: string,
	ci: string,
	estado: 0,
	nameUser: string
}

interface Servicey {

  id: number;
  client: Client;
  serviceType: number;
  description: string;
  amount: number;
  estado:number;
  assignedMaintenanceUser:User;
  statusMaintenance:number;
  
}


const statusObj: StatusObj = {
  pendiente: { color: 'info' },
  observado: { color: 'warning' },
  finalizado: { color: 'success' }
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
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
              <TableCell align='left'>{servicey.client.businessName}</TableCell>
              <TableCell align='left'>{servicey.serviceType}</TableCell>
              <TableCell align='left'>{servicey.description}</TableCell>
              <TableCell align='left'>{servicey.amount}</TableCell>
              <TableCell align='left'>{servicey.assignedMaintenanceUser.nameUser}</TableCell>
              <TableCell>
                <Chip
                  label={servicey.statusMaintenance}
                  color={statusObj[servicey.statusMaintenance].color}
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 500 }
                  }}
                />
              </TableCell>
              <TableCell align='left'>
                <UpdateServicey id={servicey.id}/>             
              </TableCell>

              {/*<TableCell align='left'>
              <DeleteServicey data={servicey}/>                            
              </TableCell>   */}   
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
  )
}


