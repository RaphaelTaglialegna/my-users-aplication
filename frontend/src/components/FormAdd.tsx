import * as React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IoMdPersonAdd } from 'react-icons/io';

type Props = {}

export const FormAdd = (props: Props) => {
    
  return (
      <div>
      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="Nome" />
          </Col>
          <Col>
            <Form.Control placeholder="Email" />
          </Col>
          <Col>
            <Form.Control placeholder="Password" />
          </Col>
          <Col>
          <Button variant="success"><IoMdPersonAdd /> Add User</Button>
          </Col>
        </Row>
      </Form> 
      </div>
      
  )
}