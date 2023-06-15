import './styles/app.css'

import React, { useState } from 'react';
import  { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom"
import Header from './components/header/Header'
import SideMenu from './components/sidemenu/SideMenu'
import Login from './components/login-register/Login'
import Register from './components/login-register/Register'
import AppointmentsList from './components/appointments/AppointmentsList';



function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header />

      <div className="container">
        <SideMenu loggedIn={loggedIn}/>

        <main>
          {loggedIn ? (
            <>
              <Routes>
                <Route path="/apointments" element={<AppointmentsList />} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </>
          )}
        </main>

      </div>
      
      
    </div>
  );
}

export default App;
