import "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import {useEffect} from 'react';
import {Loader} from 'lucide-react'
import { Routes, Route, Navigate } from "react-router-dom";
import {useAuthStore} from "./store/useAuthStore.js";
import {useThemeStore} from "./store/useThemeStore.js";
import {Toaster} from 'react-hot-toast';
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
const {theme} = useThemeStore();

console.log({onlineUsers})

  useEffect(() =>{
    checkAuth();
  }, [checkAuth]);

  console.log({authUser})

  //Loader from lucide-react 
 if(isCheckingAuth && !authUser) return(
  <div className="flex items-center justify-center h-screen" >
    <Loader className="size-10 animate-spin"/>
  </div>
 )

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
      {/* if user is try to go directly to / navigate to them /login */}
        <Route path="/" element={authUser ? <HomePage />: <Navigate to="/login" /> } />
        {/* if the user login they can see the signup page and also navigate to / */}
        <Route path="/signup" element={!authUser ?  <SignUpPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ?  <ProfilePage />: <Navigate to="/login" />} />
      </Routes>

      <Toaster/>
    </div>
  );
};

export default App;
