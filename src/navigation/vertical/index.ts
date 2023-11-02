// ** Icon imports
import Login from 'mdi-material-ui/Login'
import FormatListNumbered from 'mdi-material-ui/FormatListNumbered'
import GroupsIcon from '@mui/icons-material/Groups'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'MENU PRINCIPAL DE OPCIONES'
    },

    {
      
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Usuarios',
      icon: AccountCogOutline,
      path: '/Users'
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
      title: 'Productos',
      icon: FormatListNumbered,
      path: '/Products'
    },
    {
      title: 'Proveedores',
      icon: GroupsIcon,
      path: '/Providers'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {   
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    }
   
  ]
}

export default navigation
