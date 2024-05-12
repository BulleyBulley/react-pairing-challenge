import React from 'react';
import logo from './header-logo-midas.svg';
import styles from  '../navbar/Navbar.module.css';



function NavBar() {
  return (
    <div className={styles.NavBar}>
    <img src={logo} alt="midas logo"/>
    </div>
  );
}

export default NavBar;
