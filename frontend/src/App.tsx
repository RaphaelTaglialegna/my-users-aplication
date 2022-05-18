import React from 'react';
import './App.css';
import { ApiUser } from './components/apiUser';
import { UserContextProvider } from './context/user/context';

export const App = () => {

  return (
    <UserContextProvider>
      <div className="App">
        <ApiUser />
      </div>
    </UserContextProvider>
  );
}

export default App;
