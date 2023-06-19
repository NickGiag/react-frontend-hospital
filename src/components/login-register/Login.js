// import '../../styles/sideMenu.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({setLoggedIn}) {

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
            setLoggedIn(response.data)
            console.log('Logged in:', response.data);
            navigate('/');
        })
        .catch((error) => {
            console.log('Error logging in:', error);
            alert('Wrong username or password');
        })

        console.log('Username:', username);
        console.log('Password:', password);

        setUsername('');
        setPassword('');
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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