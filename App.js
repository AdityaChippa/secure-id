import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CreateIdentity from './components/CreateIdentity';
import ViewIdentity from './components/ViewIdentity';
import ChatBot from '../components/ChatBot';

function App() {
  const [account, setAccount] = useState('');
  const [hasIdentity, setHasIdentity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('create');
  const [showChat, setShowChat] = useState(false);

  // Mock contract functions for demo
  const mockContract = {
    hasIdentity: async () => false,
    createIdentity: async (name, email, ipfsImageHash) => {
      console.log('Mock creating identity:', { name, email, ipfsImageHash });
      return { wait: () => Promise.resolve() };
    },
    getIdentityInfo: async () => ["John Doe", "john@example.com", "QmHash123", false],
    addCredential: async (type, hash) => {
      console.log('Mock adding credential:', { type, hash });
      return { wait: () => Promise.resolve() };
    },
    verifyIdentity: async () => {
      console.log('Mock verifying identity');
      return { wait: () => Promise.resolve() };
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // Try to connect to MetaMask if available
        if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            setAccount(account);
          } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            // Set a dummy account for demo
            setAccount('0x123456789abcdef0123456789abcdef012345678');
          }
        } else {
          // Set a dummy account for demo
          setAccount('0x123456789abcdef0123456789abcdef012345678');
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error initializing:", error);
        setLoading(false);
      }
    };
    
    init();
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-blue-500">
        <div className="text-white text-xl font-bold">Loading SecureID...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-500">
      <Header account={account} />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 w-1/2 text-center ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('create')}
            >
              Create Identity
            </button>
            <button
              className={`px-6 py-3 w-1/2 text-center ${activeTab === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('view')}
              disabled={!hasIdentity}
            >
              View Identity
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'create' && (
              <CreateIdentity 
                contract={mockContract} 
                account={account} 
                setHasIdentity={setHasIdentity} 
                setActiveTab={setActiveTab} 
              />
            )}
            
            {activeTab === 'view' && (
              <ViewIdentity 
                contract={mockContract} 
                account={account} 
              />
            )}
          </div>
        </div>
      </main>
      
      <button 
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
      
      {showChat && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white rounded-lg shadow-2xl overflow-hidden">
          <ChatBot onClose={toggleChat} />
        </div>
      )}
    </div>
  );
}

export default App;