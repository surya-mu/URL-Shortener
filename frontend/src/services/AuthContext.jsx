import { useContext, createContext, useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
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

        const isExpired = decoded.exp * 1000 < Date.now()
        if(!isExpired){
          setIsAuth({
          isAuthenticated: true,
          role: decoded.role,
          username: decoded.username,
        });
        }
        else{
          logout();
        }

        const expiryTime = decoded.exp * 1000 - Date.now();
        setTimeout(()=>{
          toast.error("Session Expired! Kindly Login Again!");
          logout()
        },expiryTime)
        
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("user");
    }
  }, []);
  const login = (token) => {
    const decoded = jwtDecode(token);
    localStorage.setItem('user',token);

     const expiryTime = decoded.exp * 1000 - Date.now();
        setTimeout(()=>{
          toast.error("Session Expired! Kindly Login Again!");
          logout()
        },expiryTime)

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
