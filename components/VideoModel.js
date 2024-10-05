import React from 'react';
import ReactDOM from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';

const VideoModal = ({ videoUrl, onClose }) => {
  const handleFullscreen = () => {
    const videoElement = document.getElementById('video-player');
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) { // Firefox
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) { // IE/Edge
      videoElement.msRequestFullscreen();
    }
  };

  return ReactDOM.createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
      <div className='relative bg-white p-4 rounded-lg w-full max-w-4xl md:max-w-5xl lg:max-w-6xl'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 z-50 p-2 rounded-full hover:bg-gray-300 transition'
        >
          <IoCloseOutline size={24} className='text-red-800 font-bold' />
        </button>
        <video
          id='video-player'
          src={videoUrl}
          controls
          autoPlay
          className='w-full h-auto rounded-md'
          style={{ maxHeight: '75vh' }}
        />
        <button
          onClick={handleFullscreen}
          className='absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition'
        >
          Fullscreen
        </button>
      </div>
    </div>,
    document.body
  );
};

export default VideoModal;
