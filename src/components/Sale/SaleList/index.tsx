import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useGetAllSalesQuery } from 'src/api/Sale'
import SaleDetails from '../SaleDetail'



interface RowType {
  idVenta: number;
  total: number;
  estado: number;
  fecha: string;
  nroCorrelativo: number;
  saleDetails: any;
}

const SalesList = () => {

    // @ts-ignore
  const { data, isLoading} = useGetAllSalesQuery();
  return (
    <>
  
    { isLoading ? <h5>Cargando..</h5> :
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Fecha</TableCell>
            <TableCell align='left'>Nro Correlativo </TableCell>
            <TableCell align='left'>Total</TableCell>
            <TableCell align='right'>Ver</TableCell>
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data.map((sale: RowType) => (
            <TableRow
              key={ sale.idVenta }
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell align='left'>
                {sale.fecha}
              </TableCell>
              <TableCell align='left'>{sale.nroCorrelativo}</TableCell>
              <TableCell align='left'>{sale.total} Bs</TableCell>
              <TableCell align='right'>
                <SaleDetails detail={ sale.saleDetails } /> 
              </TableCell>
              <TableCell align='right'>
              {/* <DeleteProduct id={ product.idProducto } /> */}
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

export default SalesList
