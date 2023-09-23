// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Button from '@mui/material/Button'

// ** Stor fiel import


//import Trophy from 'src/views/dashboard/Trophy'
import DashboardTable from 'src/views/dashboard/Table'

const Dashboard = () => {
  
  
  return (
    
    <ApexChartWrapper>
      <DashboardTable/>
        {/*<Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Trophy />
            
          </Grid>
  </Grid>*/}
      </ApexChartWrapper>
  )
}

export default Dashboard
