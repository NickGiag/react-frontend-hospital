import '../../styles/login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({setLoggedIn, setUserId, setUserType, setUserName}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here, e.g., send login request to server
        const user = {
            username,
            password
        }

        axios.post('http://localhost:4000/login',user)
        .then((response) => {
            if (response.data !== null) {
                setUserId(response.data.id)
                setUserType(response.data.userType)
                setUserName(response.data.fullName)
                setLoggedIn(true)
            }
            console.log('Logged in:', response.data);
            navigate('/');
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                const errorMessage = error.response.data;
                console.log(errorMessage.message);
                alert(errorMessage.message);
            } else if (error.response && error.response.status === 404) {
                const errorMessage = error.response.data;
                console.log(errorMessage);
                alert(errorMessage);
            } else {
                console.log('Login error:', error);
            }
        })

        setUsername('');
        setPassword('');
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login