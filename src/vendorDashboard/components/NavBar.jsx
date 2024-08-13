import React, { useEffect, useState } from 'react';

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogout, logOutHandler }) => {
  const [animate, setAnimate] = useState(false);

  const firmName = localStorage.getItem('firmName');

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <div className={`firmName ${animate ? 'animate' : ''}`}>Restaurant Name: {firmName}</div>
      <div className="userAuth">
        {!showLogout ? (
          <>
            <span onClick={showLoginHandler}>Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logOutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
