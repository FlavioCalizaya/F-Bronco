import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import CircularProgress from '@mui/material/CircularProgress';

/**Impor Purchase API */
import { useGetAllpurchaseQuery } from 'src/api/purchaseApi'
import RemovePurchase from '../DeletePurchase'
import PurchaseDetail from '../PurchaseDetail'
import { dateParse } from 'src/utils/dateParser'


export default function PurchaseList () {

  interface Provider{
    id:number
    nitCi: string
    businessName: string
    address: string
    phoneNumber: number
  }

  interface Purchase {
        id:number
        total: number
        date: Date
        provider: Provider
      }

    // @ts-ignore
   const {data, isLoading} =  useGetAllpurchaseQuery()
  
  return (
    isLoading ? <CircularProgress/>
    :
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Número</TableCell>
            <TableCell align='left'>Fecha </TableCell>
            <TableCell align='left'>Proveedor </TableCell>
            <TableCell align='left'>Total </TableCell>
            <TableCell align='left'>Detalle Compra</TableCell>
            <TableCell align='left'>Anular Compra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((Purchase: Purchase, item:number) => (
            <TableRow
              key={Purchase.id}
              sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}}
            >
              <TableCell component='th' scope='row'>{item +1}</TableCell>
              <TableCell align='left'>{dateParse(Purchase.date)}</TableCell>
              <TableCell align='left'>{Purchase.provider.businessName}</TableCell>
              <TableCell align='left'>{Purchase.total}</TableCell>
              <TableCell align='left'>
                <PurchaseDetail data={Purchase}/>
              </TableCell>
              <TableCell align='left'>
                <RemovePurchase data={Purchase}/>
              </TableCell>
            </TableRow>
            ))}
           
        </TableBody>
      </Table>
    </TableContainer>
    )
}