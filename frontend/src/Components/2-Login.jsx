import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './2-login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Username:', username); // Debugging
    console.log('Password:', password); // Debugging

    try {
      const response = await fetch('http://localhost:3000/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data); // Log the entire response for debugging

      if (data.success) {
        alert('Login successful!');
        // Check if userId exists in the response before setting it
        if (data.userId) {
          window.localStorage.setItem('userId', data.userId); // Store userId
          navigate('/products'); // Redirect to the products page after successful login
        } else {
          alert('User ID not found in response.');
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
}

export default Login;
