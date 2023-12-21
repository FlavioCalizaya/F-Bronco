import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress';
import { useGetAllMaintenanceQuery } from 'src/api/Servicey/maintenanceApi'
import UpdateMaintenance from '../UpdateMaintenance'
import { ThemeColor } from 'src/@core/layouts/types'
import Chip from '@mui/material/Chip'


export default function MaintenanceList(){
  
interface Maintenance {

  id: number;
  serviceType: number;
  description: string;
  amount: number;
  estado:number;
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
/* let datos = localStorage;
console.log('sasasa', datos) */
let user = 1
    // @ts-ignore
const { data, isLoading} = useGetAllMaintenanceQuery(user)
 
  return (  
    isLoading ?  <CircularProgress/>:
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>      
            <TableCell align='left'>Tipo Servicio </TableCell>     
            <TableCell align='left'>Descripcion</TableCell>  
            <TableCell align='left'>Estado Mant</TableCell>
             <TableCell align='left'>Acciones</TableCell>
            {/*<TableCell align='left'>Eliminar</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((maintenance: Maintenance,item:number) => (
            <TableRow
              key={maintenance.serviceType}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell align='left' component='th' scope='row'>{item +1}</TableCell>
              <TableCell align='left'>{maintenance.serviceType}</TableCell>
              <TableCell align='left'>{maintenance.description}</TableCell>
              <TableCell>
                <Chip
                  label={maintenance.statusMaintenance}
                  color={statusObj[maintenance.statusMaintenance].color}
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 500 }
                  }}
                />
              </TableCell>
              <TableCell align='left'>
                <UpdateMaintenance id={maintenance.id}/>             
              </TableCell>  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
  )
}


