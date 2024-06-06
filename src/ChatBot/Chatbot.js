import React, { useState } from 'react';
import './Chatbot.css';
import chatbot from '../Assets/Images/chatbot.png'; 
import bot from '../Assets/Images/bot.png';
import chatClient from '../Assets/Images/chatClient.png';

const commonQuestions = {
  "hello": "Hello! How can I assist you today?",
  "book ticket": "Sure! Which event would you like to book tickets for?",
  "event": "We have the following events available: Concert, Theatre, Sports. Which one are you interested in?",
  "concert": "Great choice! How many tickets would you like to book?",
  "thank you": "You're welcome! Enjoy your event.",
  "help": "I'm here to help! You can ask me to book tickets for an event, check available events, or provide details about an event."

};

const Chatbot = ({ isOpen, onClose }) => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    const botResponse = commonQuestions[input.toLowerCase()] || "I'm not sure what you mean. Can you explain?";
    const botMessage = { text: botResponse, sender: 'bot' };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const refreshChat = () => {
    setMessages([]); 
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`}>


      <div className="chat-header">
        <button className="close-button" onClick={onClose}>Close</button>
        <button className="refresh-button" onClick={refreshChat}>Refresh</button>
      </div>

      <div className="chat-list">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === 'user' && (
              <img src={chatClient} alt="User" className="message-image" />
            )}
            {message.sender === 'bot' && (
              <img src={bot} alt="Bot" className="message-image" />
            )}
            <div className="message-text">{message.text}</div>
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    
    </div>
  );
};

const ChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-launcher">
      <button className="chatbot-button" onClick={toggleChatbot}>
        <img src={chatbot} alt="Chatbot Icon" className="chatbot-image" />
      </button>
      {isOpen && <Chatbot isOpen={isOpen} onClose={toggleChatbot} />}
    </div>
  );
};

export default ChatbotLauncher;
