import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-hot-toast';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password });
      toast.success('🎉 Registration successful!');
      setTimeout(() => navigate('/signin'), 1500);
    } catch (err) {
      toast.error('❌ Signup failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/src/assets/mic.jpg')` }}
      ></div>

      {/* Right Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit} className="w-full max-w-md">

          {/* App Intro Section */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-3">
               <span className="text-purple-900">Transform Your Voice Into Perfect Text</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              🎤 Stop typing. Start talking. Our AI-powered transcription technology converts your voice to text with stunning accuracy in seconds.
            </p>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded transition duration-200"
          >
            Register
          </button>

          <p className="mt-4 text-sm text-gray-700 text-center">
            Already have an account?{' '}
            <Link className="text-gray-900 font-medium hover:underline" to="/signin">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
