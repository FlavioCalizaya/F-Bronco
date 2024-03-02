// ** React Imports
import { MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useLoginMutation } from 'src/api/authApi'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {

  const [nameUser, setNameUser] = useState('')
  const [password, setPassword] = useState('')

  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  // ** Hook
  const router = useRouter()

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const [login] = useLoginMutation();

  const userLogin = async ()=>{
  
    const values ={ nameUser, password}

    const {body} = await login(values).unwrap()

    console.log('aaaaa',body.data)
    if (body.data.rol ==="admin"){
      await sessionStorage.setItem('user', JSON.stringify(nameUser));
      await sessionStorage.setItem('rol', JSON.stringify(body.data.rol));
      await sessionStorage.setItem('idUser', JSON.stringify(body.data.idUser));
      router.push('/Dashboard')
    }else{
      await sessionStorage.setItem('user', JSON.stringify(nameUser));
      await sessionStorage.setItem('rol', JSON.stringify(body.data.rol));
      await sessionStorage.setItem('idUser', JSON.stringify(body.data.idUser));
      router.push('/Clients')
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <img src="/images/Bronco.png"  width="200" height="150" />

          </Box>     
          <Box sx={{ mb:6}}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign:'center' }}>
            Bienvenido al Sistema BRONCO
            </Typography>
             </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField value={nameUser} onChange={(e)=>setNameUser(e.target.value)} autoFocus fullWidth id='Username' label='Nombre Usuario' sx={{ marginBottom: 4 }} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={password}
                id='auth-login-password'
                onChange={(e)=>setPassword(e.target.value)}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>} />
            </FormControl>

            <Box  sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              {/*<FormControlLabel control={<Checkbox />} label='Remember Me' />
            <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>*/}
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => userLogin()}>
              {/*onClick={() => router.push('/Dashboard')}>*/}
              Login 
            </Button>
            {/*<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>

              <Link passHref href='/pages/_app.tsx'>
                  <LinkStyled>Menu Principal</LinkStyled>
                </Link>
          
                    <br />

                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>*/}   
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
