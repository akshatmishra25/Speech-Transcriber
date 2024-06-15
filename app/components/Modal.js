import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, onStartTranscription, transcriptName }) => {
  const [name, setName] = useState('');
  const [transcription, setTranscription] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscription = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscription((prev) => prev + transcript + ' ');
        } else {
          interimTranscription += transcript;
        }
      }
      setTranscription((prev) => prev + interimTranscription);
    };

    recognitionRef.current = recognition;
  }, []);

  const startTranscription = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      onStartTranscription(name);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>
          &times;
        </button>
        {transcriptName ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{transcriptName}</h2>
            <div className="bg-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
              <p>{transcription}</p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Enter Transcript Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-4"
            />
            <button
              onClick={startTranscription}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Start Transcription
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
