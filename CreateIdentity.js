import React, { useState } from 'react';

function CreateIdentity({ contract, account, setHasIdentity, setActiveTab }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email) {
      setError('Please fill out all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // In a real app, we'd upload the image to IPFS here
      const ipfsImageHash = "QmXyZ123456789";
      
      // For demo, just simulate contract call
      await contract.createIdentity(name, email, ipfsImageHash);
      
      // Wait a bit to simulate blockchain confirmation
      setTimeout(() => {
        setHasIdentity(true);
        setActiveTab('view');
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error creating identity:", error);
      setError('Failed to create identity. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">Create Your Decentralized Identity</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Profile Image</label>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-full" />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {loading ? 'Creating Identity...' : 'Create Identity'}
        </button>
      </form>
    </div>
  );
}

export default CreateIdentity;