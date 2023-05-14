import React, { useState } from 'react';
import '../Styling/Login.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      fetch("http://localhost:8080/user/login" ,{
        method: "GET",
        headers: {
          "content-type": "application/json",
          "username": username,
          "password": password
        }
      }
      ).then(response => {
        response.json()
        if (response.status === 200){
          setSuccessMessage("Successful login")
        }
        if (response.status === 401) {
          setSuccessMessage("Unsuccessful login")
        }
      })
      .then(data => {
        console.log(data)
      })
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
        <div>{successMessage}</div>
      </form>
    </div>
  );
};

export default LoginPage;
