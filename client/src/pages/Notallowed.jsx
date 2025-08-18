import React from 'react';
import { Link } from 'react-router-dom';

const NotAllowed = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error">Access Denied</h1>
          <p className="py-6">Sorry, you don't have permission to access this page.</p>
          <Link to="/" className="btn btn-primary">Go Back Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;