import * as React from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';

type Props = {}

export const TableUsers = (props: Props) => {
  const [users, setUsers] = React.useState([]);
  
  React.useEffect(() => { 
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      }).catch(error => console.log(error.response.data))
  }, [])
  
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
              <td><Button><FaUserEdit /></Button></td>
              <td><Button variant="danger"><FaTrashAlt /></Button></td>
            </tr>            
          )}
        </tbody>
      </Table>  
  )
}