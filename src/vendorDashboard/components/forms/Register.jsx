import React, { useState } from 'react';
import { API_URL } from '../../data/ApiPath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      }
    } catch (error) {
      console.error("Vendor registration failed");
      alert("Registration failed");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="authSection">
      <div className="authForm" >
        <h3>Vendor Registration</h3>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your name' />
          <label>Email</label>
          <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
          <label>Password</label>
          <div className="passwordContainer">
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              name='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='Enter your password' 
            />
            <FontAwesomeIcon 
              icon={passwordVisible ? faEyeSlash : faEye} 
              onClick={togglePasswordVisibility} 
              className="passwordToggleIcon" 
            />
          </div>
          <div className='btnSubmit'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
