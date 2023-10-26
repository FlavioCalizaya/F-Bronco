import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const CardPurchaseDetail = (data:any) => {

  interface Product{
    id: number
    nombreProducto: string
  }

  interface Inventory{
    id: number
    lot: string
  }

  interface PurchaseDetail{
    id:number
    price: number
    quantity: number
    amount: number
    product: Product
    inventory: Inventory
  }

  return (

    <Card sx={{ border: 0, boxShadow: 2}}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Número</TableCell>
            <TableCell align='left'>Producto</TableCell>
            <TableCell align='left'>Cantidad </TableCell>
            <TableCell align='left'>Precio </TableCell>
            <TableCell align='left'>Lote </TableCell>
            <TableCell align='left'>Total Importe </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((item: PurchaseDetail, i:number) => (
            <TableRow
              key={item.id}
              sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}}
            >
              <TableCell component='th' scope='row'>{i +1}</TableCell>
              <TableCell align='left'>{item.product.nombreProducto}</TableCell>
              <TableCell align='left'>{item.quantity}</TableCell>
              <TableCell align='left'>{item.price}</TableCell>
              <TableCell align='left'>{item.inventory.lot}</TableCell>
              <TableCell align='left'>{item.amount}</TableCell>   
            </TableRow>
            ))}
           
        </TableBody>
      </Table>
    </TableContainer>
      </CardContent>
    </Card>
  )
}

export default CardPurchaseDetail
