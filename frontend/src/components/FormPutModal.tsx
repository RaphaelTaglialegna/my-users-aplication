import * as React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';
import { IoMdPersonAdd } from 'react-icons/io';
import UserContext from '../context/user/context';

type UserProps = {
  id: number, username: string, email: string
}

const ChangeUserModel: React.FC<UserProps> = ({ id, username, email }) => {
  const { setStateUser, updateUser } = React.useContext(UserContext)
  const [lgShow, setLgShow] = React.useState(false);
  const [userData, setUserData] = React.useState({
    username:'',
    email:'',
    password:'',
  });
  
  React.useEffect(() => { 
    setUserData( { username, email, password: '' })
  },[]);
  
 
  const handleState = async () => {
    updateUser(id, userData);
    setStateUser({ ...userData });
    setUserData({ ...userData, password: '' });

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
    <Button
      variant="primary"
      type="button" 
      className="btn btn-primary" 
      data-toggle="modal" 
      data-target="#updateUserModal"
      onClick={() => setLgShow(true)}>
      <FaUserEdit />
    </Button>
    <Modal
      size="lg"
      show={lgShow}
      onHide={() => setLgShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
      >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Editar Usuário
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            onClick={() => {
              handleState()
              setLgShow(false)}}
            variant="success"
            >
            <IoMdPersonAdd /> Update User</Button>
            </Col>
          </Row>
        </Form>          
      </Modal.Body>
    </Modal>
  </div>
      
  )
}
export default ChangeUserModel;
