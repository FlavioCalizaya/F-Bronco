// ** Icon imports
import FormatListNumbered from 'mdi-material-ui/FormatListNumbered'
import Sale from 'mdi-material-ui/PointOfSale'
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const userNavigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'MENU PRINCIPAL DE OPCIONES'
    },
    {
      title: 'Clientes',
      icon:AccountPlusOutline,
      path: '/Clients'
    },
    {
      title: 'Servicios',
      icon:AccountCogOutline,
      path: '/Services'
    },
    {
      title: 'Mantenimiento',
      icon: FormatListNumbered,
      path: '/Maintenance'
    },
  ]
}

export default userNavigation
