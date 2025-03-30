import React, { useState, useEffect } from 'react';

function ViewIdentity({ contract, account }) {
  const [identity, setIdentity] = useState({
    name: '',
    email: '',
    ipfsImageHash: '',
    isVerified: false
  });
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState([]);
  const [newCredentialType, setNewCredentialType] = useState('');
  const [newCredentialHash, setNewCredentialHash] = useState('');
  const [addingCredential, setAddingCredential] = useState(false);

  useEffect(() => {
    const loadIdentity = async () => {
      try {
        // For demo, just use mock data instead of actual contract call
        // In production, this would be: const identityInfo = await contract.getIdentityInfo(account);
        
        // Simulate loading delay
        setTimeout(() => {
          setIdentity({
            name: "Demo User",
            email: "demo@secureidentity.io",
            ipfsImageHash: "QmHash123",
            isVerified: false
          });
          
          // Mock credentials
          setCredentials([
            { type: 'National ID', hash: '0x7890...' },
            { type: 'Driving License', hash: '0xabcd...' }
          ]);
          
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error("Error loading identity:", error);
        setLoading(false);
      }
    };
    
    loadIdentity();
  }, [contract, account]);

  const handleAddCredential = async (e) => {
    e.preventDefault();
    
    if (!newCredentialType || !newCredentialHash) return;
    
    try {
      setAddingCredential(true);
      
      // Mock adding credential
      await contract.addCredential(newCredentialType, newCredentialHash);
      
      // Simulate blockchain confirmation delay
      setTimeout(() => {
        setCredentials([
          ...credentials,
          { type: newCredentialType, hash: newCredentialHash }
        ]);
        
        setNewCredentialType('');
        setNewCredentialHash('');
        setAddingCredential(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error adding credential:", error);
      setAddingCredential(false);
    }
  };

  const handleVerify = async () => {
    try {
      // In production: const tx = await contract.verifyIdentity();
      await contract.verifyIdentity();
      
      // Simulate blockchain confirmation delay
      setTimeout(() => {
        setIdentity({
          ...identity,
          isVerified: true
        });
      }, 1000);
    } catch (error) {
      console.error("Error verifying identity:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading identity...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">
          {/* In a real app, we'd load the image from IPFS using the hash */}
          <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-indigo-800">{identity.name}</h2>
          <p className="text-gray-600 mb-2">{identity.email}</p>
          
          <div className="flex items-center justify-center md:justify-start mt-3">
            {identity.isVerified ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            ) : (
              <button
                onClick={handleVerify}
                className="inline-flex items-center px-3 py-1 border border-indigo-300 rounded-full text-sm font-medium bg-white text-indigo-700 hover:bg-indigo-50"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verify Identity
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t border-b py-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Credentials</h3>
        
        {credentials.length > 0 ? (
          <div className="space-y-4">
            {credentials.map((credential, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{credential.type}</h4>
                  <p className="text-sm text-gray-500">Hash: {credential.hash}</p>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Verified</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4">No credentials added yet</div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Credential</h3>
        
        <form onSubmit={handleAddCredential} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Credential Type</label>
            <input
              type="text"
              value={newCredentialType}
              onChange={(e) => setNewCredentialType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. National ID, Passport, Education"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Credential Hash</label>
            <input
              type="text"
              value={newCredentialHash}
              onChange={(e) => setNewCredentialHash(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Hash of your credential"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={addingCredential}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
              addingCredential ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {addingCredential ? 'Adding...' : 'Add Credential'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ViewIdentity;