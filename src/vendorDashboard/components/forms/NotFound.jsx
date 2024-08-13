import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notFoundWrapper">
      <Link to="/" className="goBackButton">
        Go Back
      </Link>
      <div className="notFoundContent">
        <h1 className="notFoundTitle">404</h1>
        <p className="notFoundMessage">Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
