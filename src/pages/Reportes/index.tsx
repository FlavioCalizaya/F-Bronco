import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import SalesList from 'src/components/Sale/SaleList'
import { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Reportes = () => {
  const [reportType, setReportType] = useState('ventas');
  const [reportTitle, setReportTitle] = useState('Reportes de las ventas realizadas');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='#'>
              Reportes
            </Link>
          </Typography>
          <Typography variant='body2'>{reportTitle}</Typography>
        </Grid>

        <Grid item xs={12}>
        <div style={{
  position: 'relative',
  zIndex: 1000,
}}>
          <label>Fecha de inicio: </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MM/dd/yyyy"
        />
      </div>

      <div style={{
  position: 'relative',
  zIndex: 1000,
}}>
        <label>Fecha final: </label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MM/dd/yyyy"
        />
      </div>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <SalesList />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Reportes;
