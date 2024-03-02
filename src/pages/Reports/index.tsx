import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Card from '@mui/material/Card'
import {useEffect, useState } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useGetAllpurchaseQuery } from 'src/api/purchaseApi'
//import { useGetAllSalesQuery } from 'src/api/Sale'
import { useGetAllServiceyQuery } from 'src/api/Servicey/serviceyApi'
import ServiceyList from 'src/components/Servicey/ServiceyList'
import SalesList from 'src/components/Sale/SaleList'
import PurchaseList from 'src/components/Purchase/ListPurchases'
import jsPDF from 'jspdf'
import "jspdf-autotable";
import { dateParse } from 'src/utils/dateParser'

const Report = () => {
    const [open, setOpen] = useState(false)

    const [dateInit, setDateInit] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    console.log('fff',dateInit)
    const [modulo, setModulo] = useState('Ventas');
    const [dateSales, setDateSales] = useState([]);
    const [datePurchase, setDatePurchase] = useState([]);
    const [dateServicey, setDateServicey] = useState([]);

    const [salesList, setSalesList] = useState([]);

    const {data: purchaseList} =  useGetAllpurchaseQuery();
    //const {data: salesList} = useGetAllSalesQuery();
    const {data: serviceyList} = useGetAllServiceyQuery();

    async function fetchData() {
        try {
          const response = await fetch("http://localhost:8080/api/v1/sales");
          const data = await response.json();
          setSalesList(data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      
      useEffect(()=>{
        fetchData();
      }
      ,[])


    const handleFilter = ()=>{
        console.log('modulo', modulo)
        if(modulo == 'Ventas'){
            const filterSales = salesList.filter((s) => {
                const saleDate = new Date(s.fecha);
                const formattedDateInit = new Date(dateInit);
                const formattedDateEnd = new Date(dateEnd);
                return saleDate >= formattedDateInit && saleDate <= formattedDateEnd;
            }); 
            setDateSales(filterSales)

            console.log('filterSales', filterSales)
            console.log('setDateSales', dateSales)
        }
       
        if(modulo == 'Compras'){
            const filterPurchase = purchaseList.filter((s) => {
                const purchaseDate = new Date(s.date);
                const formattedDateInit = new Date(dateInit);
                const formattedDateEnd = new Date(dateEnd);
                return purchaseDate >= formattedDateInit && purchaseDate <= formattedDateEnd;
            });
            setDatePurchase(filterPurchase)
            console.log('filterPurchase', filterPurchase)
        }
        
        if(modulo == 'Servicios'){
            const filterServicey = serviceyList.filter((s) => {
                const serviseyDate = new Date(s.createdAtt);
                const formattedDateInit = new Date(dateInit);
                const formattedDateEnd = new Date(dateEnd);
                return serviseyDate >= formattedDateInit && serviseyDate <= formattedDateEnd;
            });
            setDateServicey(filterServicey)
            console.log('filterServicey', filterServicey)
        }  
    }

    const handleReport = ()=>{
        console.log('modulo', modulo)
        if(modulo == 'Ventas'){
            const filterSales = salesList.filter((s) => {
                const saleDate = new Date(s.fecha);
                const formattedDateInit = new Date(dateInit);
                const formattedDateEnd = new Date(dateEnd);
                return saleDate >= formattedDateInit && saleDate <= formattedDateEnd;
            }); 
            setDateSales(filterSales)

            console.log('filterSales', filterSales)
            console.log('setDateSales', dateSales)

            const datesSales = [];
            const totales = 0

            filterSales.map((item:any) => {
                const { client, fecha, total} = item;
                totales+=total
                return datesSales.push({
                  nro: 1,
                  businessName: client.businessName,
                  fecha: dateParse(fecha),
                  total: total
                });
            });

              
            const columns = [
                { title: "Nro", field: "nro" },
                { title: "Fecha", field: "fecha" },
                { title: "Cliente", field: "businessName" },
                { title: "Importe Bs.", field: "total", type: "currency" },
            ];

            const doc = new jsPDF();


            //Triangulo gris cabecera
            doc.setDrawColor(0);
            doc.setFillColor(234, 237, 237);
            doc.rect(0, 0, 800, 10, "F");

            //Figura forma flecha
            doc.setFillColor(124, 95, 240);
            doc.rect(0, 10, 80, 10, "F");
            doc.triangle(80, 10, 85, 15, 80, 20, "F");

            doc.setTextColor(255, 255, 255);
            doc.text(`Reporte de Ventas`, 15, 17);

            doc.setFontSize(10);
            doc.setTextColor(124, 95, 240);
            doc.text(`Fecha: ${dateParse(dateInit) +' - ' +dateParse(dateEnd)}`, 15, 25);

            doc.autoTable({
                margin: { top: 30 },
                theme: "striped",
                headStyles: { fillColor: [124, 95, 240] },
                columns: columns.map((col) => ({ ...col, dataKey: col.field })),
                body: datesSales,
            });

            const alto = doc.lastAutoTable.finalY;
          
            doc.setFontSize(16);
            doc.setTextColor(124, 95, 240);
            const importeTotal = totales 
            doc.text(`Total Bs.:  ${importeTotal}`, 145, alto + 11);

            doc.output("pdfobjectnewwindow");
        }
       
        if(modulo == 'Compras'){
            const filterPurchase = purchaseList.filter((s) => {
                const purchaseDate = new Date(s.date);
                const formattedDateInit = new Date(dateInit);
                const formattedDateEnd = new Date(dateEnd);
                return purchaseDate >= formattedDateInit && purchaseDate <= formattedDateEnd;
            });
            setDatePurchase(filterPurchase)
            console.log('filterPurchase', filterPurchase)

            const datesPurchase = [];
            const totales = 0

            filterPurchase.map((item:any) => {
                const { provider, date, total} = item;
                totales+=total
                return datesPurchase.push({
                  nro: 1,
                  businessName: provider.businessName,
                  date: dateParse(date),
                  total: total
                });
            });

              
            const columns = [
                { title: "Nro", field: "nro" },
                { title: "Fecha", field: "date" },
                { title: "Cliente", field: "businessName" },
                { title: "Importe Bs.", field: "total", type: "currency" },
            ];

            const doc = new jsPDF();


            //Triangulo gris cabecera
            doc.setDrawColor(0);
            doc.setFillColor(234, 237, 237);
            doc.rect(0, 0, 800, 10, "F");

            //Figura forma flecha
            doc.setFillColor(124, 95, 240);
            doc.rect(0, 10, 80, 10, "F");
            doc.triangle(80, 10, 85, 15, 80, 20, "F");

            doc.setTextColor(255, 255, 255);
            doc.text(`Reporte de Compras`, 15, 17);

            doc.setFontSize(10);
            doc.setTextColor(124, 95, 240);
            doc.text(`Fecha: ${dateParse(dateInit) +' - '+dateParse(dateEnd)}`, 15, 25);

            doc.autoTable({
                margin: { top: 30 },
                theme: "striped",
                headStyles: { fillColor: [124, 95, 240] },
                columns: columns.map((col) => ({ ...col, dataKey: col.field })),
                body: datesPurchase,
            });

            const alto = doc.lastAutoTable.finalY;
          
            doc.setFontSize(16);
            doc.setTextColor(124, 95, 240);
            const importeTotal = totales 
            doc.text(`Total Bs.:  ${importeTotal}`, 145, alto + 11);

            doc.output("pdfobjectnewwindow");
        }
        
        if(modulo == 'Servicios'){
            const filterServicey = serviceyList.filter((s) => {
                const serviseyDate = new Date(s.createdAtt);
                const formattedDateInit = new Date(dateInit);
                const formattedDateEnd = new Date(dateEnd);
                return serviseyDate >= formattedDateInit && serviseyDate <= formattedDateEnd;
            });
            setDateServicey(filterServicey)
            console.log('filterServicey', filterServicey)

            const datesServiceys= [];
            const totales = 0

            filterServicey.map((item:any) => {
                const { client, createdAtt, serviceType,description, amount} = item;
                totales+=amount
                return datesServiceys.push({
                  nro: 1,
                  businessName: client.businessName,
                  createdAtt: dateParse(createdAtt),
                  serviceType: serviceType,
                  description: description,
                  amount: amount
                });
            });

              
            const columns = [
                { title: "Nro", field: "nro" },
                { title: "Fecha", field: "createdAtt" },
                { title: "Cliente", field: "businessName" },
                { title: "Tipo de Servicio", field: "serviceType" },
                { title: "Descripcion", field: "description" },
                { title: "Importe Bs.", field: "amount", type: "currency" },
            ];

            const doc = new jsPDF();


            //Triangulo gris cabecera
            doc.setDrawColor(0);
            doc.setFillColor(234, 237, 237);
            doc.rect(0, 0, 800, 10, "F");

            //Figura forma flecha
            doc.setFillColor(124, 95, 240);
            doc.rect(0, 10, 80, 10, "F");
            doc.triangle(80, 10, 85, 15, 80, 20, "F");

            doc.setTextColor(255, 255, 255);
            doc.text(`Reporte de Servicios`, 15, 17);

            doc.setFontSize(10);
            doc.setTextColor(124, 95, 240);
            doc.text(`Fecha: ${dateParse(dateInit) +' - '+dateParse(dateEnd)}`, 15, 25);

            doc.autoTable({
                margin: { top: 30 },
                theme: "striped",
                headStyles: { fillColor: [124, 95, 240] },
                columns: columns.map((col) => ({ ...col, dataKey: col.field })),
                body: datesServiceys,
            });

            const alto = doc.lastAutoTable.finalY;
          
            doc.setFontSize(16);
            doc.setTextColor(124, 95, 240);
            const importeTotal = totales ///parseFloat(others.total).toFixed(2)
            doc.text(`Total Bs.:  ${importeTotal}`, 145, alto + 11);

            doc.output("pdfobjectnewwindow");
        }  
    }

   


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Reportes
        </Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
            <TextField type='date' fullWidth placeholder='Fecha Inicio' label='FechaInicio'
                value={dateInit} onChange={(e)=>setDateInit(e.target.value)}/>
        </Grid>

        <Grid item xs={12} sm={3}>
            <TextField type='date' fullWidth placeholder='Fecha Final'  label='Fecha Final'
            value={dateEnd} onChange={(e)=>setDateEnd(e.target.value)}/>
        </Grid>

        <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
            <InputLabel>Modulo</InputLabel>
            <Select
                label='Modulo'
                name='Modulo'
                onChange={(e)=>setModulo(e.target.value)}
                value={modulo}
                >
                <MenuItem value='Compras'>COMPRAS</MenuItem>
                <MenuItem value='Ventas'>VENTAS</MenuItem>
                <MenuItem value='Servicios'>SERVICIOS</MenuItem>
            </Select>
            </FormControl>
        </Grid>
        <Button style={{maxHeight:54, top:26}} variant='outlined' onClick={handleFilter}>
            filtrar
        </Button>

        <Button style={{maxHeight:54, top:26}} variant='outlined' onClick={handleReport}>
            PDF
        </Button>

      <Grid item xs={12}>
        <Card>
            {modulo == 'Ventas' && <SalesList salesx={dateSales}/>}
            {modulo == 'Compras' && <PurchaseList purchasesx={datePurchase}/>}
            {modulo == 'Servicios' && <ServiceyList servicesx={dateServicey}/>}
        </Card>
      </Grid>

    
    </Grid>
  )
}

export default Report
