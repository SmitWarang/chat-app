import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';

const App = () => {
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('');
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (room && user) {
      setJoined(true);
    }
  };

  return (
    <div className="app-container">
      {!joined ? (
        <div className="join-room">
          <input
            type="text"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div className="chat-room">
          <div className="chat-room-header">Room: {room}</div>
          <ChatRoom room={room} user={user} />
          <ChatInput room={room} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
