import React, { useState, useRef, useEffect } from 'react';

function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your SecureID assistant. How can I help you with your decentralized identity today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simple rule-based responses (in a real app, this would call an API)
    setTimeout(() => {
      let botResponse = '';
      const userMessage = input.toLowerCase();
      
      if (userMessage.includes('what is') || userMessage.includes('how does')) {
        botResponse = "SecureID is a blockchain-based identity solution that allows you to create, manage, and verify your digital identity credentials without relying on centralized authorities. Your data is stored securely on blockchain and you control who can access it.";
      } else if (userMessage.includes('verify') || userMessage.includes('verification')) {
        botResponse = "To verify your identity, you need to add credentials to your profile. You can do this by clicking on 'Add New Credential' in your identity dashboard. In a real-world scenario, trusted authorities would verify these credentials.";
      } else if (userMessage.includes('credential')) {
        botResponse = "Credentials are verifiable claims about your identity, like a digital version of your ID card, diploma, or license. You can add these to your identity profile, and they can be verified by authorities without revealing all your personal information.";
      } else if (userMessage.includes('thank')) {
        botResponse = "You're welcome! If you have any other questions about your decentralized identity, feel free to ask.";
      } else {
        botResponse = "I'm sorry, I don't have specific information about that. As a simple demo assistant, my knowledge about SecureID is limited. For more complex questions, please refer to our documentation or contact support.";
      }
      
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-indigo-700 text-white py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="font-semibold">SecureID Assistant</span>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'
            }`}
          >
            <div
              className={`rounded-lg py-2 px-4 max-w-3/4 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-lg py-2 px-4">
              <div className="flex space-x-1">
                <div className="bg-gray-400 rounded-full h-2 w-2 animate-bounce"></div>
                <div className="bg-gray-400 rounded-full h-2 w-2 animate-bounce delay-100"></div>
                <div className="bg-gray-400 rounded-full h-2 w-2 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form
        onSubmit={handleSendMessage}
        className="border-t flex p-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 py-2 px-3 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full p-2 ml-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatBot;