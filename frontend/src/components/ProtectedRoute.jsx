import React from 'react'
import {useAuth} from '../services/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth()
    return isAuthenticated ? children : <Navigate to="/signin"/>
  
}

export default ProtectedRoute