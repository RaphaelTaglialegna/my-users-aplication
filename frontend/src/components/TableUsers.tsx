import * as React from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { FormAdd } from './FormAdd';
import UserContext, { API_URL } from '../context/user/context';
import { toast } from 'react-toastify';
import ButtonModal  from './FormPutModal';

type Props = {}

export const TableUsers = (props: Props) => {
  const { stateUser, setStateUser } = React.useContext(UserContext)
  const [users, setUsers] = React.useState([]);

  
  React.useEffect(() => { 
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      }).catch(error => console.log(error.response.data))
  }, [stateUser]);

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
          users.map(({id, username, email}) => 
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
  )
}