import axios from 'axios';
import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

type UserType = { 
  username: string;
  email: string;
  password: string;
};

type PropsUserContext = { 
  stateUser: UserType;
  setStateUser: React.Dispatch<React.SetStateAction<UserType>>;
  addUsers: any 
  updateUser: any
};

const DEFAULT_VALUE = { 
  stateUser: { 
    username: "",
    email: "",
    password: "",
  },
  setStateUser: () => {},
  addUsers: () => {},
  updateUser: () => {},
};
export const API_URL = "http://localhost:3001/users";

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

const UserContextProvider = ({children}: {children: React.ReactNode}) => { 
  const [stateUser, setStateUser] = useState(DEFAULT_VALUE.stateUser);

   const addUsers = async (userData: UserType) => { 
   await axios.post(API_URL, {...userData})
    .then((response) =>{
        toast.success(response.statusText);
        setStateUser({ 
          username: "",
          email: "",
          password: "",
        })
     }) 
   .catch((err) =>  toast.error(err.response.data.message, { icon: false }));  
  };  

  const updateUser = async (id: number, userData: UserType) => { 
    await axios.put(`${API_URL}/${id}`, {...userData})
     .then((response) =>{
         toast.success(response.statusText);
         setStateUser({ 
           username: "",
           email: "",
           password: "",
         })
      }) 
    .catch((err) =>  toast.error(err.response.data.message, { icon: false }));  
   };

  return(
    <UserContext.Provider
      value = {{
        stateUser,
        setStateUser,
        addUsers,
        updateUser,        
      }
    }
      >
        {children}
      </UserContext.Provider>
  );
};

export { UserContextProvider };
export default UserContext;