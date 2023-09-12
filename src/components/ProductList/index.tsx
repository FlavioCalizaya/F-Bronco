// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { IconButton } from '@mui/material'
import Update from 'mdi-material-ui/Update'
import Delete from 'mdi-material-ui/Delete'

const ProductList = () => {
  
  const createData = (
    codI: string,
    tipo: string,
    marca: string,
    descripcion: string,
    alto: number,
    ancho: number,
    esp: number
  ) => {
    return { codI, tipo, marca, descripcion, alto, ancho, esp }
  }
  
  const rows = [
    createData('A130', 'AT', 'CHEVROLET', 'Chevrolet Aveo/PT G3 1,6L', 60.0, 40.0, 26),
    createData('A0333', 'MT', 'TOYOTA', 'Toyota Colorado 2.8L', 46.0, 60.0, 22),
    createData('A0523', 'AT', 'NISSAN', 'Nissa DMAX 3,0', 47.0, 58.0, 26),
    createData('A0129', 'MT', 'DODGE', 'Dodge Trallalazer 02-09', 46.0, 66.8, 26),
    createData('A0418', 'AT', 'SUSUKY', 'Susuky dakota 2000-2003', 66.0, 38.0, 32)
  ]

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Cod I</TableCell>
            <TableCell align='right'>Tipo </TableCell>
            <TableCell align='right'>Marca </TableCell>
            <TableCell align='right'>Descripcion </TableCell>
            <TableCell align='right'>Alto</TableCell>
            <TableCell align='right'>Ancho</TableCell>
            <TableCell align='right'>Esp</TableCell>
            <TableCell align='right'>Actualizar</TableCell>
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.codI}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.codI}
              </TableCell>
              <TableCell align='right'>{row.tipo}</TableCell>
              <TableCell align='right'>{row.marca}</TableCell>
              <TableCell align='right'>{row.descripcion}</TableCell>
              <TableCell align='right'>{row.alto}</TableCell>
              <TableCell align='right'>{row.ancho}</TableCell>
              <TableCell align='right'>{row.esp}</TableCell>
              <TableCell align='right'>
                <IconButton aria-label='Update' color="primary">
                  <Update />
                </IconButton>
              </TableCell>
              <TableCell align='right'>
                <IconButton aria-label='Delete' color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductList
