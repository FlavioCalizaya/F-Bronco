import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import CircularProgress from '@mui/material/CircularProgress';

/**Impor Inventory API */
import { useGetAllInventoriesQuery } from 'src/api/inventoryApi'
import { dateParse } from 'src/utils/dateParser'
import { generaPdf } from 'src/components/ReportPDF/inventoryReport'

export default function InventoryList () {

  interface Product {
    idProducto:number
    categoria: number
    codigo: string
    imagen: string
    nombreProducto: string
    precioVenta: number
    alto: number
    ancho:number
    espesor: number
    marca: string 
    tipo: string
    Descripcion: string
  }

  interface Inventory {
        id:number
        lot: string
        price: number
        stock: number
        date: Date
        product: Product
      }

    // @ts-ignore
   const {data, isLoading} =  useGetAllInventoriesQuery()

  const showReportPDF = ()=>{
    generaPdf(data)
  }
  
  return (
    isLoading ? <CircularProgress/>
    :
    <TableContainer component={Paper}>
      <Grid paddingRight={10} container direction="row" justifyContent="flex-end" alignItems="flex-start">
      <Button variant='contained' onClick={()=>showReportPDF()}>
        Reporte PDF
      </Button>
      </Grid>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Número</TableCell>
            <TableCell align='left'>Lote </TableCell>
            <TableCell align='left'>Producto </TableCell>
            <TableCell align='left'>Precio </TableCell>
            <TableCell align='left'>Stock </TableCell>
            <TableCell align='left'>Fecha de Registro</TableCell>
            {/*<TableCell align='left'>Editar</TableCell>
            <TableCell align='left'>Eliminar</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((inventory: Inventory, item:number) => (
            <TableRow
              key={inventory.id}
              sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}}
            >
              <TableCell component='th' scope='row'>{item +1}</TableCell>
              <TableCell align='left'>{inventory.lot}</TableCell>
              <TableCell align='left'>{inventory.product.nombreProducto}</TableCell>
              <TableCell align='left'>{inventory.price}</TableCell>
              <TableCell align='left'>{inventory.stock}</TableCell>
              <TableCell align='left'>{dateParse(inventory.date)}</TableCell>
            </TableRow>
            ))}
           
        </TableBody>
      </Table>
    </TableContainer>
    )
}