import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../authContext.jsx';
import UploadModal from '../components/UploadModal';

const Profile = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [audios, setAudios] = useState([]);

  const fetchAudios = async () => {
    try {
      const res = await API.get('/audios');
      setAudios(res.data);
    } catch (err) {
      console.error('Audio fetch failed:', err.response?.data || err.message);
      navigate('/signin');
    }
  };

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/signin');
    return;
  }

  fetchAudios(); // use the function defined outside

  const handleClickOutsideAudio = (e) => {
    const audioElements = document.querySelectorAll('audio');
    const clickedInsideAudio = [...audioElements].some(audio => audio.contains(e.target));

    if (!clickedInsideAudio) {
      audioElements.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
        }
      });
    }
  };

  document.addEventListener('click', handleClickOutsideAudio);

  return () => {
    document.removeEventListener('click', handleClickOutsideAudio);
  };
}, [navigate]);


  return (
  <>
    <Header />

    <div className="px-4 pt-6 bg-gray-300">
      {/* Flex container for title + button on same row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">🎤 Your Recordings</h2>
        <button
             onClick={() => setShowModal(true)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
        >
          ➕ Speech to Text Transcription
        </button>
      </div>

      {/* Recordings list */}
      {audios.length === 0 ? (
        <p className="text-gray-900">No recordings yet. Go to Upload page to get started.</p>
      ) : (
        <ul className="space-y-4">
          {audios.map((audio) => (
            <li key={audio.id} className="bg-gray-200 p-4 rounded shadow-md border border-gray-300">
              <p className="text-purple-600 text-lg font-bold">{audio.filename}</p>
              <p className="text-black-700 text-sm mb-2">{audio.transcription}</p>
              <audio controls src={audio.url} className="w-full" />
              <p className="text-xs text-gray-500 mt-1">{new Date(audio.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
 
    {/* 🔽 Modal Renders Here */}
    {showModal && (
  <UploadModal
    onClose={() => setShowModal(false)}
    onUploadSuccess={fetchAudios}
  />
    )}
  </>
);

};

export default Profile;
