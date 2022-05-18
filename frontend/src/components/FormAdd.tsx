import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import * as React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IoMdPersonAdd } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {}
const API_URL = "http://localhost:3001/users";

export const FormAdd = (props: Props) => {
  const [userData, setUserData] = React.useState({
    username:'',
    email:'',
    password:'',
  });

  const addUsers = async () => { 
   await axios.post(API_URL, {...userData})
    .then((response) =>{
        toast.success(response.statusText);
        setUserData({ 
          username:'',
          email:'',
          password:'',
        });
     }) 
   .catch((err) =>  toast.error(err.response.data.message, { icon: false }));  
  };  

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUserData((prevState: any) => ({
        ...prevState,
        [name]: value
    }));
  };

  return (
      <div>
      <Form>
        <Row>
          <Col>
            <Form.Control 
            placeholder="Nome"
            name='username'
            type='text'
            value={userData.username}
            onChange={handleChange}
             />
          </Col>
          <Col>
            <Form.Control 
            placeholder="Email"
            name='email'
            type='email'
            value={userData.email}
            onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control 
            placeholder="Password"
            name='password'
            type='password'
            value={userData.password}
            onChange={handleChange} 
            />
          </Col>
          <Col>
          <Button 
          type='button'
          onClick={() => addUsers()}
          variant="success"
          ><IoMdPersonAdd /> Add User</Button>
          </Col>
        </Row>
      </Form>
      <div>
        <ToastContainer />
      </div> 
      </div>
      
  )
}