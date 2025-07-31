import React from 'react';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import { AuthProvider } from './authContext';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast'; 
// const dotenv = require('dotenv');
// dotenv.config(); 
export default function App() {
  return (
      <><Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider></>
     
  );
}
