import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useGetAllSalesQuery } from 'src/api/Sale'
import SaleDetails from '../SaleDetail'
import DeleteSale from '../DeleteSale'
import { dateParse } from 'src/utils/dateParser'
import { IconButton } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saleReportPDF } from 'src/components/ReportPDF/sale/saleReport'


interface RowType {
  idVenta: number;
  total: number;
  estado: number;
  fecha: string;
  nroCorrelativo: number;
  saleDetails: any;
  client: any;
}
const showReportPDF = (sale: RowType)=>{
  saleReportPDF(sale)
}
const SalesList = () => {

    // @ts-ignore
  const { data, isLoading, isError, error} = useGetAllSalesQuery();

  if (isLoading) {
    return <h5>Cargando...</h5>;
  }

  if (isError) {
    return <h4>Problemas al cargar las ventas del servidor. {(error as any).message}</h4>;
  }

  if (data && data.length === 0) {
    return <div>No hay productos disponibles.</div>;
  }
  return (
    <>
    { 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Cliente</TableCell>
            <TableCell align='left'>Fecha</TableCell>
            <TableCell align='left'>Nro Correlativo </TableCell>
            <TableCell align='left'>Total</TableCell>
            <TableCell align='right'>Ver</TableCell>
            <TableCell align='right'>PDF</TableCell>
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
                {sale.client.businessName}
              </TableCell>
              <TableCell align='left'>
                {dateParse(sale.fecha)}
              </TableCell>
              <TableCell align='left'>{sale.nroCorrelativo}</TableCell>
              <TableCell align='left'>{sale.total} Bs</TableCell>
              <TableCell align='right'>
                <SaleDetails sale={ sale } /> 
              </TableCell>
              <TableCell align='right'>
              <IconButton aria-label='' color="primary" 
              onClick={()=>showReportPDF(sale)}>
                <PictureAsPdfIcon />
              </IconButton>
              </TableCell>

              <TableCell align='right'>
              <DeleteSale id={ sale.idVenta }    />
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
