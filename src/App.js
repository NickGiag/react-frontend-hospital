import './styles/app.css'

import React, { useState } from 'react';
import  { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom"
import Header from './components/header/Header'
import SideMenu from './components/sidemenu/SideMenu'
import Login from './components/login-register/Login'
import Register from './components/login-register/Register'
import AppointmentsList from './components/appointments/AppointmentsList';
import AppointmentForm from './components/appointments/AppointmentForm';
import AppointmentUpdate from './components/appointments/AppointmentUpdate';



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('')
  const [userType, setUserType] = useState(null)

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <Header />

      <div className='container'>
        <SideMenu loggedIn={loggedIn} handleLogout={handleLogout} userType={userType}/>

        
        <main className='center'>
          {loggedIn ? (
            <>
              <Routes>
                <Route path="/" element={<AppointmentsList userId={userId} userType={userType}/>} />
                <Route path="/appointments" element={<AppointmentsList userId={userId} userType={userType}/>} />
                <Route path="/appointments/create" element={<AppointmentForm userId={userId} userType={userType}/>} />
                <Route path="/appointments/update" element={<AppointmentUpdate userId={userId}/>} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUserId={setUserId} setUserType={setUserType}/> } />
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserId={setUserId} setUserType={setUserType}/> } />
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
