import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/context';
import Signup from './components/Signup';
import SignIn from './components/Signin';
import Application from './application';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const LoggedIn: React.FC<{ children: ReactElement }> = ({ children }) => {
  const getToken = localStorage.getItem('token');
  // console.log(getToken)
  if (getToken) {
    return <Navigate to="/application" />;
  } else {
    return children || null;
  }
}


const App: React.FC = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <LoggedIn>
              <Signup />
            </LoggedIn>
          } />
          <Route path="/signup" element={
            <LoggedIn>
              <Signup />
            </LoggedIn>
          } />
          <Route path="/signin" element={
            <LoggedIn>
              <SignIn />
            </LoggedIn>
          } />
          <Route
            path="/application"
            element={
              <ProtectedRoute>

                <Application />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
