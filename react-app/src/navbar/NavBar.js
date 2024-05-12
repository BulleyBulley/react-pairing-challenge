import React from 'react';
import logo from './header-logo-midas.svg';
import styles from  '../navbar/Navbar.module.css';
import { Select } from '@chakra-ui/react';
import {findUserName } from '../utils/functions';
import { User } from '../utils/objects';    
import {
    setCurrentUser,
  } from "../features/featuresSlice"; // Import your slices
  import { useSelector, useDispatch } from "react-redux";



function NavBar() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const users = useSelector((state) => state.users);

    const handleChangeUser = (e) => {
        //console.log the event target value object
        const selectedUserId = e.target.value;
        // Find the user object based on the selectedUserId
        const selectedUserName = findUserName(selectedUserId, users);
        const thisUser = new User(selectedUserName);
        thisUser.userId = selectedUserId;
        // Do something with the selected user, such as updating state
        dispatch(setCurrentUser(thisUser));
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
