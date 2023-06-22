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
  const [userName, setUserName] = useState('');

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName('')
  }

  return (
    <div className="App">
      <Header loggedIn={loggedIn} userName={userName}/>

      <div className='container'>
        <SideMenu loggedIn={loggedIn} handleLogout={handleLogout} userType={userType}/>

        
        <main className='center'>
          {loggedIn ? (
            <>
              <Routes>
                <Route path="/" element={<AppointmentsList userId={userId} userType={userType} userName={userName}/>} />
                <Route path="/appointments" element={<AppointmentsList userId={userId} userType={userType} userName={userName}/>} />
                <Route path="/appointments/create" element={<AppointmentForm userId={userId} userType={userType} userName={userName}/>} />
                <Route path="/appointments/update" element={<AppointmentUpdate userId={userId} userName={userName}/>} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUserId={setUserId} setUserType={setUserType} setUserName={setUserName}/> } />
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserId={setUserId} setUserType={setUserType} setUserName={setUserName}/> } />
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
