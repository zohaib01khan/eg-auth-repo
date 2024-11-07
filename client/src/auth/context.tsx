import React, { createContext, useState, useContext, ReactNode } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  signup: (email: string, name: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  
  const API_URL = process.env.REACT_APP_API_URL;

  const signup = async (email: string, name: string, password: string) => {
    try{
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Signin failed. Please check your credentials.');
      }
      const data = await response.json();
      // console.log(data.token, 'Response Data');
    }catch (error) {
      throw error;
    }
      
  };


  const signin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Signin failed. Please check your credentials.');
      }
      const data = await response.json();
      // console.log(data.token, 'Response Data');
  
      if (data) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        return data; 
      } 
    } catch (error) {
      throw error;
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
