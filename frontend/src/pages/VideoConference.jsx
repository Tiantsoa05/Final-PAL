/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { 
  Video, 
  ScreenShare, 
  Copy, 
  Mic, 
  MicOff, 
  Camera,
  CameraOff,
  Settings 
} from 'lucide-react';

const SOCKET_SERVER_URL = 'http://localhost:3000';

const VideoConference = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  const generateMeetingLink = () => {
    const uniqueId = crypto.randomUUID();
    const link = `${window.location.origin}/meet/${uniqueId}`;
    setMeetingLink(link);
    setRoomId(uniqueId);
    setUserId(crypto.randomUUID());
    return link;
  };

  const initializeConnection = async (customRoomId = null) => {
    try {
      // Close existing connections if any
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }

      // Socket connection
      socketRef.current = io(SOCKET_SERVER_URL, {
        transports: ['websocket'],
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 6000
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
  
      socketRef.current.on('connect_failed', (error) => {
        console.error('Socket connection failed:', error);
      });

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });

      localVideoRef.current.srcObject = stream;
      localStreamRef.current = stream;

      // WebRTC setup
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      };
      peerConnectionRef.current = new RTCPeerConnection(configuration);

      // Add local tracks to peer connection
      stream.getTracks().forEach(track => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      // Use custom room ID or generated one
      const activeRoomId = customRoomId || roomId;

      // Socket event handlers
      socketRef.current.emit('join-room', activeRoomId, userId);

      socketRef.current.on('user-connected', async (remoteUserId) => {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socketRef.current.emit('offer', offer, activeRoomId);
      });

      socketRef.current.on('offer', async (offer) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socketRef.current.emit('answer', answer, activeRoomId);
      });

      socketRef.current.on('answer', async (answer) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socketRef.current.on('ice-candidate', async (candidate) => {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      });

      peerConnectionRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

    } catch (error) {
      console.error('Connection initialization error:', error);
    }
  };

  const joinRoom = () => {
    if (joinRoomId) {
      setRoomId(joinRoomId);
      setUserId(crypto.randomUUID());
      initializeConnection(joinRoomId);
    }
  };

  const toggleMicrophone = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMicMuted;
      });
      setIsMicMuted(!isMicMuted);
    }
  };

  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const startScreenSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
        video: true 
      });
      
      const videoTrack = screenStream.getVideoTracks()[0];
      const sender = peerConnectionRef.current
        .getSenders()
        .find(s => s.track.kind === 'video');
      
      sender.replaceTrack(videoTrack);
      setIsScreenSharing(true);
      socketRef.current.emit('start-screen-share');

      videoTrack.onended = () => {
        const cameraTrack = localStreamRef.current.getVideoTracks()[0];
        sender.replaceTrack(cameraTrack);
        setIsScreenSharing(false);
        socketRef.current.emit('stop-screen-share');
      };
    } catch (error) {
      console.error('Screen sharing error:', error);
    }
  };

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
  };

  useEffect(() => {
    generateMeetingLink();
    initializeConnection();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  return (
    <div className={`flex h-screen p-6 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto max-w-6xl">
        <div className={`rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-3xl font-semibold">
              Réunion
            </h1>
            
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 relative">
                <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
                  <video 
                    ref={localVideoRef} 
                    autoPlay 
                    muted 
                    className={`w-full h-full object-cover ${isCameraOff ? 'hidden' : ''}`}
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 rounded-full px-3 py-1 text-white flex items-center">
                    <Camera className="mr-2" /> You
                  </div>
                </div>
              </div>

              <div className="col-span-6 relative">
                <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
                  <video 
                    ref={remoteVideoRef} 
                    autoPlay 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 rounded-full px-3 py-1 text-white flex items-center">
                    <Video className="mr-2" /> Remote
                  </div>
                </div>
              </div>

              <div className="col-span-12 flex justify-center space-x-4">
                <button 
                  className={`p-3 rounded-full ${isMicMuted ? 'bg-red-500' : 'bg-gray-700'} text-white`}
                  onClick={toggleMicrophone}
                  title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
                >
                  {isMicMuted ? <MicOff /> : <Mic />}
                </button>

                <button 
                  className={`p-3 rounded-full ${isCameraOff ? 'bg-red-500' : 'bg-gray-700'} text-white`}
                  onClick={toggleCamera}
                  title={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                >
                  {isCameraOff ? <CameraOff /> : <Camera />}
                </button>

                <button 
                  className={`p-3 rounded-full ${isScreenSharing ? 'bg-red-500' : 'bg-gray-700'} text-white`}
                  onClick={startScreenSharing}
                  title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                >
                  <ScreenShare />
                </button>

                <button 
                  className="p-3 rounded-full bg-gray-700 text-white"
                  onClick={() => alert('Settings dialog - implement your settings here')}
                  title="Settings"
                >
                  <Settings />
                </button>
              </div>

              <div className="col-span-12 flex items-center space-x-4">
                <input 
                  type="text" 
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  placeholder="Enter Room ID" 
                  className="flex-grow bg-gray-800 text-white p-2 rounded"
                />
                <button 
                  onClick={joinRoom}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Join Room
                </button>
              </div>

              <div className="col-span-12">
                <div className="bg-gray-800/50 rounded-lg p-4 flex items-center">
                  <input 
                    type="text" 
                    value={meetingLink} 
                    readOnly 
                    className="flex-grow bg-transparent text-white border-none outline-none"
                  />
                  <button 
                    className="ml-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                    onClick={copyMeetingLink}
                  >
                    <Copy className="mr-2" /> Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;