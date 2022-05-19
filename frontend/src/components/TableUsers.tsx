import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import UserContext, { API_URL } from '../context/user/context';
import { toast } from 'react-toastify';
import ButtonModal  from './FormPutModal';
import { NavPagination } from './NavPaginations';
import qs from 'qs';

type Props = {}

const LIMIT = 5

export const TableUsers = (props: Props) => {
  const { stateUser, setStateUser } = useContext(UserContext)
  const [users, setUsers] = useState({
    count: 0,
    rows: []
  });
  const [offset, setOffset] = useState(0);
  
  useEffect(() => { 
    
    const querry = qs.stringify({ page: offset, size: LIMIT }); 

    axios.get(`http://localhost:3001/users?${querry}`)
      .then(response => {
        setUsers(response.data);
      }).catch(error => console.log(error.response.data))
  }, [stateUser, offset]);

  const deleteUser = async (id: number) => { 
    await axios.delete(`${API_URL}/${id}`)
     .then((response) =>{
         toast.success('User deleted success');
         setStateUser({ 
          username: "",
          email: "",
          password: "",
        })
      }) 
    .catch((err) =>  toast.error(err.response.data.message, { icon: false }));  
   };  
  
  return ( 
    <>
      <Table>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Editar</th>
            <th scope="col">Deletar</th>
          </tr>
        </thead>
        <tbody>
          {
            users.rows.map(({id, username, email}) => 
            <tr key={id}>  
              <td>{username}</td>
              <td>{email}</td>
              <td>
                <ButtonModal 
                id = {id}
                username = {username}
                email = {email}
                />                                
              </td>
              
              <td>
                <Button 
                  variant="danger"
                  type='button'
                  onClick={ () => deleteUser(id)}
                  >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>            
          )}
        </tbody>
      </Table>

      <NavPagination  
        limit={LIMIT} 
        offset={offset} 
        total={users.count}
        setOffset={setOffset}
      />  
    </>    
  )
}