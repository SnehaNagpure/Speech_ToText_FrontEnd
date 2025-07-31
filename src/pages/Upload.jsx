import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('audio', file);
    setStatus('Uploading...');

    try {
      const res = await axios.post('/api/audios/upload', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatus(`✅ ${res.data.message}`);
      navigate('/profile');
    } catch (err) {
      setStatus('❌ Upload failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Audio</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}