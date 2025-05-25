import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, Route, Routes, BrowserRouter } from "react-router-dom";
// import './index.css'
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Redirect from "./pages/Redirect.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx";
import UrlList from "./pages/UrlList.jsx";
import About from "./pages/About.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import  { AuthProvider } from './services/AuthContext.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import  './main.css'
import Faq from "./pages/Faq.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
    <ToastContainer theme="dark" autoClose={2000} pauseOnFocusLoss={false} pauseOnHover={false} closeOnClick/>
    <Routes>
      
      <Route path='/' element={<App/>}></Route>


      <Route path="/:url" element={<Redirect/>}></Route>
      <Route path="/error" element={<ErrorComponent/>}></Route>
      <Route path="/my-url" element={<ProtectedRoute><UrlList/></ProtectedRoute>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path='/register' element={<SignUp/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      <Route path='/faq' element={<Faq/>}></Route> 
      </Routes> 
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
