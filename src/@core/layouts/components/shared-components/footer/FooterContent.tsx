// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>

      {hidden ? null : (
        <Box sx={{ display: 'flex', textAlign:'center', justifyContent: 'center', alignItems: 'center' }}>
        Bronco System { new Date().getFullYear() }, todos los derechos reservados 
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
