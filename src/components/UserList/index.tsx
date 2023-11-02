import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import Table from '@mui/material/Table';
import React from 'react';

import { useGetAllUsersQuery } from 'src/api/userApi'
import DeleteUser from '../DeleteUser'
import UpdateUser from '../UpadateUser'
import User from 'src/pages/Users'
import { CircularProgress } from '@mui/material';


interface  User {
  idUser: number;
  nombre:string;
  primerApellido: string;
  segundoApellido: string;
  ci: string;
  rol: string;
  estado: number;

  userName:string;
  password:string;


}

const UserList = () => {

    // @ts-ignore
  const { data, isLoading} = useGetAllUsersQuery();

  
  console.log( data )
  return (
    <>
  
    { isLoading ?  <CircularProgress/>:


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>
            <TableCell align='right'>Nombre</TableCell>
            <TableCell align='right'>Primer Apellido </TableCell>
            <TableCell align='right'>Segundo Apellido</TableCell>
            <TableCell align='right'>Nro C.I. </TableCell>
            <TableCell align='right'>Rol </TableCell>
            

            <TableCell align='right'>Modificar</TableCell>
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data  && data.map((user: User,item:number) => (
            <TableRow
              key={user.idUser}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0 }}} >
             
             <TableCell component='th' scope='row'>{item +1}</TableCell>
             
              <TableCell align='right'>{user.nombre}</TableCell>
              <TableCell align='right'>{user.primerApellido}</TableCell>
              <TableCell align='right'>{user.segundoApellido}</TableCell>
              <TableCell align='right'>{user.ci}</TableCell>
              <TableCell align='right'>{user.rol}</TableCell>

              

              <TableCell align='right'>

               <UpdateUser id={ user.idUser } />
              </TableCell>
              <TableCell align='right'>
              <DeleteUser id={ user.idUser } />
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

export default UserList
