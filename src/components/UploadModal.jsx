import React, { useState, useRef } from 'react';
import axios from '../api';
import { toast } from 'react-hot-toast';

const UploadModal = ({ onClose, onUploadSuccess }) => {
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  const allowedTypes = ['.mp3', '.wav', '.m4a', '.webm', '.ogg', '.flac', '.aac'];

  const isAllowedFile = (file) => {
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    return allowedTypes.includes(ext);
  };

  // Upload File or Blob to Backend
  const uploadToBackend = async (file) => {
    if (!isAllowedFile(file)) {
      toast.error('❌ Unsupported file type!');
      return;
    }

    try {
      setLoading(true);
      setTranscription('');

      const formData = new FormData();
      formData.append('audio', file);

      const res = await axios.post('/audios/upload', formData);
      const text = res.data.transcript || '✅ Transcription complete but no text detected.';
      setTranscription(text);
      toast.success('✅ Uploaded & Transcribed');
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      toast.error('❌ Upload or transcription failed');
      setTranscription('');
    } finally {
      setLoading(false);
    }
  };

  // Handle File Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) await uploadToBackend(file);
  };

  // Start Browser Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
        uploadToBackend(file);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      toast.error('🎤 Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-0 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded w-full max-w-xl shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Upload or Record Audio</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Upload File:</label>
            <input
              type="file"
              accept=".mp3,.wav,.m4a,.webm,.ogg,.flac,.aac"
              onChange={handleFileChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Or Record:</label>
            {!recording ? (
              <button
                onClick={startRecording}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                🎙️ Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ⏹️ Stop Recording
              </button>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Transcription:</label>
            {loading ? (
              <p className="text-blue-500">⏳ Transcribing...</p>
            ) : transcription ? (
              <p className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{transcription}</p>
            ) : (
              <p className="text-gray-400">Upload or record to see transcription here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
