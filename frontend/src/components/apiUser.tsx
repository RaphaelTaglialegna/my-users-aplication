import * as React from 'react';
import axios from 'axios';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import { IoMdPersonAdd } from 'react-icons/io';
import { FormAdd } from './FormAdd';
import { TableUsers } from './TableUsers';
import { NavPagination } from './NavPaginations';

type Props = {}

export const ApiUser = (props: Props) => {
    
  return (
    <div className='m-5'>
      <h1>API de Usuários</h1>
      <FormAdd />
      <TableUsers />
      <NavPagination />

    </div>
  )
}