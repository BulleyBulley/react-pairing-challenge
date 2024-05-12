import React from 'react';
import Requests from './features/Features.js';
import NavBar from './navbar/NavBar.js';
import './App.css';

function App() {
  return (
    <div className='App'>
    <NavBar />
     <Requests />
    </div>
  );
}

export default App;
