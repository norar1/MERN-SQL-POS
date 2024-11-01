import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './1-register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/accounts/CreateAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Check if response was successful
      if (response.ok) {
        alert('Account created successfully!');
        // Optionally, you can redirect to the login page or clear the form here
        setUsername('');
        setPassword('');
      } else {
        // Handle different error cases based on the API response
        if (data.error) {
          alert(`Error: ${data.error}`); // Display the error message returned from the server
        } else {
          alert('Failed to create account. Please try again.'); // Generic error message
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // Catch any network errors
    }
  };

  return (
    <div className="register-container">
      <h1>Create Account</h1>
      <form id="create-account-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Create Account</button>

        <Link to="/login">
          <button type="button">Log in Here</button>
        </Link>
      </form>
    </div>
  );
}

export default Register;
