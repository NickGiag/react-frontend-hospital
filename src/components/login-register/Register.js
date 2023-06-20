// import '../../styles/sideMenu.css'
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userType, setUserType] = useState('customer');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [speciality, setSpeciality] = useState('');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here, e.g., send registration request to server

    const userData = {
        username,
        password,
        userType
    }

    axios.post('http://localhost:4000/users',userData)
    .then((response) => {
        const user = response.data
        console.log('User created', response.data);
        
        if (userType === "customer") {
            const customerData = {
                fullName,
                phone,
                email,
                user
            }
            
            axios.post('http://localhost:4000/customers',customerData)
            .then((response) => {
                console.log('Customer created', response.data);   
            })
            .catch((error) => {
                console.log('Customer creation error:', error);
            })

        } else if (userType === "doctor") {
            const doctorData = {
                fullName,
                speciality,
                user
            }
            
            axios.post('http://localhost:4000/doctors',doctorData)
            .then((response) => {
                console.log('Doctor created', response.data);   
            })
            .catch((error) => {
                console.log('Doctor creation error:', error);
            })
        }
        alert('User created successfully!')
    })
    .catch((error) => {
        console.log('User creation error:', error);
    })

    console.log('User Type:', userType);
    console.log('Full Name:', fullName);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Speciality:', speciality);
    // Reset form fields
    setUserType('customer');
    setFullName('');
    setUsername('');
    setPassword('');
    setEmail('');
    setPhone('');
    setSpeciality('');
  };

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
            <h2>Registration</h2>
            <div>
                <label>
                <input
                    type="radio"
                    value="customer"
                    checked={userType === 'customer'}
                    onChange={handleUserTypeChange}
                />
                Customer
                </label>
                <label>
                <input
                    type="radio"
                    value="doctor"
                    checked={userType === 'doctor'}
                    onChange={handleUserTypeChange}
                />
                Doctor
                </label>
            </div>
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {userType === 'customer' && (
                <>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                </>
            )}
            {userType === 'doctor' && (
                <div>
                <label htmlFor="speciality">Speciality</label>
                <input
                    type="text"
                    id="speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                />
                </div>
            )}
            <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register