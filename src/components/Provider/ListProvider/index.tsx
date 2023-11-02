import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import CircularProgress from '@mui/material/CircularProgress';

/**Impor Provider API */
import { useGetAllProvidersQuery } from 'src/api/providerApi'
import UpdatePovider from '../UpdateProvider'
import RemoveProvider from '../DeleteProvider'

export default function ProviderList () {

  interface Provider {
        id:number
        businessName: string
        nitCi: string
        phoneNumber: number
        address: string
      }

    // @ts-ignore
   const {data, isLoading} =  useGetAllProvidersQuery()
  
  return (
    isLoading ? <CircularProgress/>
    :
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Número</TableCell>
            <TableCell align='left'>NIT / CI </TableCell>
            <TableCell align='left'>Razon Social </TableCell>
            <TableCell align='left'>Teléfono </TableCell>
            <TableCell align='left'>Dirección</TableCell>
            <TableCell align='left'>Editar</TableCell>
            <TableCell align='left'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((provider: Provider, item:number) => (
            <TableRow
              key={provider.nitCi}
              sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}}
            >
              <TableCell component='th' scope='row'>{item +1}</TableCell>
              <TableCell align='left'>{provider.nitCi}</TableCell>
              <TableCell align='left'>{provider.businessName}</TableCell>
              <TableCell align='left'>{provider.phoneNumber}</TableCell>
              <TableCell align='left'>{provider.address}</TableCell>
              <TableCell align='left'>
              
               <UpdatePovider data={provider}/>
               
              </TableCell>
              <TableCell align='left'>
                <RemoveProvider data={provider}/>
              </TableCell>
            </TableRow>
            ))}
           
        </TableBody>
      </Table>
    </TableContainer>
    )
}