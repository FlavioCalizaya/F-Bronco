import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress'
import { useGetAllServiceyQuery } from 'src/api/Servicey/serviceyApi'
import UpdateServicey from '../UpdateServicey'
import { ThemeColor } from 'src/@core/layouts/types'
import Chip from '@mui/material/Chip'
import { generaPdf } from 'src/components/ReportPDF/serviceyReport'
import { IconButton } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { dateParse } from 'src/utils/dateParser'
import { useEffect, useState } from 'react'
import DeleteServicey from '../DeleteServicey'

export default function ServiceyList({ servicesx }) {
  console.log('servicesx', servicesx)
  const [datesFilter, setDatesFilter] = useState([])
  const { data, isLoading } = useGetAllServiceyQuery()
  console.log('xxxx', data)

  interface Client {
    id: number
    nitCi: string
    businessName: string
    address: string
    phoneNumber: number
  }

  interface User {
    nombre: string
    primerApellido: string
    segundoApellido: string
    ci: string
    estado: 0
    nameUser: string
  }

  interface Servicey {
    id: number
    createdAtt: string
    client: Client
    serviceType: number
    description: string
    amount: number
    estado: number
    assignedMaintenanceUser: User
    statusMaintenance: number
    //createdAt:string;
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

  useEffect(() => {
    if (servicesx != undefined) {
      setDatesFilter(servicesx)
    } else {
      setDatesFilter(data)
    }
  }, [servicesx, data])

  const showReportPDF = (servicey: Servicey) => {
    generaPdf(servicey)
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>
            <TableCell align='left'>Fecha </TableCell>
            <TableCell align='left'>Cliente </TableCell>
            <TableCell align='left'>Tipo Servicio </TableCell>
            <TableCell align='left'>Descripcion</TableCell>
            <TableCell align='left'>Importe</TableCell>
            {!servicesx && <TableCell align='left'>Usuario Mantenimiento</TableCell>}
            {!servicesx && <TableCell align='left'>Estado</TableCell>}
            {!servicesx && <TableCell align='left'>Modificar</TableCell>}
            <TableCell align='left'>PDF</TableCell>
            {!servicesx && <TableCell align='left'>Eliminar</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {datesFilter &&
            datesFilter.map((servicey: Servicey, item: number) => (
              <TableRow
                key={servicey.serviceType}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell align='left' component='th' scope='row'>
                  {item + 1}
                </TableCell>
                <TableCell align='left'>{dateParse(servicey.createdAtt)}</TableCell>
                <TableCell align='left'>{servicey.client?.businessName}</TableCell>
                <TableCell align='left'>{servicey.serviceType}</TableCell>
                <TableCell align='left'>{servicey.description}</TableCell>
                <TableCell align='left'>{servicey.amount}</TableCell>
                {!servicesx && <TableCell align='left'>{servicey.assignedMaintenanceUser?.nombre}</TableCell>}
                {!servicesx && (
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
                )}
                {!servicesx && (
                  <TableCell align='left'>
                    <UpdateServicey id={servicey.id} />
                  </TableCell>
                )}
                <TableCell align='left'>
                  <IconButton aria-label='' color='primary' onClick={() => showReportPDF(servicey)}>
                    <PictureAsPdfIcon />
                  </IconButton>
                </TableCell>

                {!servicesx && (
                  <TableCell align='left'>
                    <DeleteServicey data={servicey} />
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
