import * as React from 'react';
import { FormAdd } from './FormAdd';
import { TableUsers } from './TableUsers';

type Props = {}

export const ApiUser = (props: Props) => {
    
  return (
    <div className='m-5'>
      <h1>API de Usuários</h1>
      <FormAdd />
      <TableUsers />
      

    </div>
  )
}