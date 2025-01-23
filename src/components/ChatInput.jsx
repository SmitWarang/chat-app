import React, { useState } from 'react';
import socket from '../socket';

const ChatInput = ({ room, user }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        room,
        user,
        text: message,
      };
      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', { room, user });
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping} // Updated to use onKeyDown
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;
