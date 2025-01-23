import React, { useState, useEffect } from 'react';
import socket from '../socket';

const ChatRoom = ({ room, user }) => {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState('');

  useEffect(() => {
    // Join the room
    socket.emit('join_room', room);

    // Listen for messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Listen for typing indicators
    socket.on('user_typing', (typingUser) => {
      if (typingUser !== user) {
        setTypingUser(typingUser);
        // Remove typing indicator after 2 seconds
        setTimeout(() => setTypingUser(''), 2000);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off('receive_message');
      socket.off('user_typing');
    };
  }, [room, user]);

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.user === user ? 'own' : ''}`}
        >
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
      {typingUser && <p className="typing-indicator">{typingUser} is typing...</p>}
    </div>
  );
};

export default ChatRoom;
