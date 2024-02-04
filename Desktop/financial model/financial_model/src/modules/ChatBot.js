import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('Please provide more detials.');

  const handleSend = () => {
    const newMessage = { id: messages.length + 1, text: userInput, sender: 'user' };
    const reply = { id: messages.length + 2, text: 'Reply', sender: 'bot' };
    setMessages([...messages, newMessage, reply]);
    setUserInput('');
  };

  return (
    <div>
      <div id="messageList">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chatbot;
