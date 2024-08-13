import React, { useState } from 'react';
import { API_URL } from '../../data/ApiPath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Vendor logged in successfully");
        setEmail("");
        setPassword("");
        localStorage.setItem('login', data.token);
        showWelcomeHandler();
      } 
      const vendorId = data.vendorId;
      console.log("%%%%%%%%%",vendorId);
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json();

      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorName = vendorData.vendor.firm[0].firmName;
        console.log("checking vendorfirmId",vendorFirmId);
        console.log("my firm name is:",vendorName)
        localStorage.setItem('firmId',vendorFirmId);
        localStorage.setItem('firmName',vendorName);
          window.location.reload();
      }

    } catch (error) {
      console.error("Vendor login failed");
      alert("Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="authSection">
      <div className="authForm">
        <h3>Vendor Login</h3>
        <form onSubmit={handleSubmit}>
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

export default Login;
