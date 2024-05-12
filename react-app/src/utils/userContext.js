import React, { createContext, useState, useEffect } from 'react';
import { User } from './objects';

// Create a context for user data
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State to hold the user data
  const [currentUser, setCurrentUser] = useState(new User());


  useEffect(() => {
    // Log the updated user data when it changes
    if (currentUser) {
      console.log("user updated to: " + currentUser.name);
    }
  }, [currentUser]); // Only re-run the effect if loggedInUser changes

  return (
    // Provide the user data and update function to children components
    <UserContext.Provider value={{ currentUser, setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
