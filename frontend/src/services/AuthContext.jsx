import { useContext, createContext, useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
// import { AuthProvider } from './AuthContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState({
    isAuthenticated: false,
    role: null,
    username: null,
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem("user");
      if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setIsAuth({
          isAuthenticated: true,
          role: decoded.role,
          username: decoded.username,
        });
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("user");
    }
  }, []);
  const login = (token) => {
    const decoded = jwtDecode(token);
    localStorage.setItem('user',token);
    setIsAuth({
      isAuthenticated: true,
      role: decoded.role,
      username: decoded.username,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuth({
      isAuthenticated: false,
      role: null,
      username: null,
    });
  };
  return (
    <AuthContext.Provider value={{ ...isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
