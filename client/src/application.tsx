import React from 'react';
import { useAuth } from './auth/context';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Application: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto', padding: '50px 0', textAlign: 'center' }}>
      <h2>Welcome to the application</h2>
      <Button type="primary" onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </Button>
    </div>
  );
};

export default Application;
