import React, { useContext, useEffect } from 'react';
import logo from './header-logo-midas.svg';
import styles from  '../navbar/Navbar.module.css';
import { Select } from '@chakra-ui/react';
import {findUserName } from '../utils/functions';
import { User } from '../utils/objects';    
  import { useSelector, useDispatch } from "react-redux";
  import  UserContext  from '../utils/userContext';



function NavBar() {
    const users = useSelector((state) => state.users);
    const {currentUser, setCurrentUser} = useContext(UserContext);



    const handleChangeUser = (e) => {
        //console.log the event target value object
        const selectedUserId = e.target.value;
        // Find the user object based on the selectedUserId
        const selectedUserName = findUserName(selectedUserId, users);
        const thisUser = new User(selectedUserName);
        thisUser.userId = selectedUserId;
        // Do something with the selected user, such as updating state
        setCurrentUser(thisUser);
      };
  return (
    <div className={styles.NavBar}>
    <div className={styles.logoContainer}>
    <img src={logo} alt="midas logo"/>
    </div>
    <div className={styles.currentUser}>
            <Select
              onChange={handleChangeUser}
              variant="filled"
              display="flex"
              justifyContent="flex-end"
              color='black'
              label="Select User"
            >
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.name}
                </option>
              ))}
            </Select>
          </div>
    </div>
  );
}

export default NavBar;
