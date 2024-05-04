import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

/**Impor Purchase API */
import { useGetAllpurchaseQuery } from 'src/api/purchaseApi'
import RemovePurchase from '../DeletePurchase'
import PurchaseDetail from '../PurchaseDetail'
import { dateParse } from 'src/utils/dateParser'
import { generaPdf } from '../../ReportPDF/purchaseReport'
import { useEffect, useState } from 'react'
import { Magnify } from 'mdi-material-ui'

export default function PurchaseList ({purchasesx}) {
const [datesFilter, setDatesFilter] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const {data, isLoading} =  useGetAllpurchaseQuery()
const [filteredData, setFilteredData] = useState([])

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

    useEffect(()=>{
      console.log('sdkjdshkjd', datesFilter)
      const filteredKardexes = datesFilter?.filter(purchace => {
        return (
          purchace.provider.businessName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      console.log('sssssss', filteredKardexes)
      setFilteredData(filteredKardexes) 
    },[searchTerm])
    

   useEffect(()=>{
    if(purchasesx != undefined){ 
      setDatesFilter(purchasesx);
      setFilteredData(purchasesx);
    }else{
      setDatesFilter(data);
      setFilteredData(data);
    }
  }
  ,[purchasesx, data])

   const showReportPDF = (purcahse: Purchase)=>{
    generaPdf(purcahse)
  }
  
  return (
    <>
        <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: '25%'}}
          value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} 
          placeholder='Busca por proveedor'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
    { 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Número</TableCell>
            <TableCell align='left'>Fecha </TableCell>
            <TableCell align='left'>Proveedor </TableCell>
            <TableCell align='left'>Total Bs.</TableCell>
            <TableCell align='left'>Detalle Compra</TableCell>
              {!purchasesx && <TableCell align='left'>Eliminar</TableCell>}
            <TableCell align='left'>Exportar PDF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData && filteredData.map((purchase: Purchase, item:number) => (
            <TableRow
              key={purchase.id}
              sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}}
            >
              <TableCell component='th' scope='row'>{item +1}</TableCell>
              <TableCell align='left'>{dateParse(purchase.date)}</TableCell>
              <TableCell align='left'>{purchase.provider.businessName}</TableCell>
              <TableCell align='left'>{purchase.total}</TableCell>
              <TableCell align='left'>
                <PurchaseDetail data={purchase}/>
              </TableCell>
              {!purchasesx &&<TableCell align='left'>
                <RemovePurchase data={purchase}/>
              </TableCell>}
              <TableCell align='left'>
              <IconButton aria-label='' color="primary" 
              onClick={()=>showReportPDF(purchase)}>
                <PictureAsPdfIcon />
              </IconButton>
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