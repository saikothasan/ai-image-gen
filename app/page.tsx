'use client';

import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { FaSearch } from 'react-icons/fa'; // Search icon

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch(`/api/generateImage?prompt=${encodeURIComponent(prompt)}`);
      const data = await response.json();

      if (response.ok && data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setError('Failed to generate image');
      }
    } catch (err) {
      setError('An error occurred while generating the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-4xl font-semibold text-center text-blue-600">AI Image Generator</h1>

        {/* Input field and Button */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt..."
              className="w-full p-3 pl-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>

          <button
            onClick={generateImage}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <ClipLoader size={20} color="#fff" />
                <span>Generating...</span>
              </div>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>

        {/* Loading message */}
        {loading && (
          <div className="text-center text-gray-500 mt-4">
            <p>Please wait while the image is being generated...</p>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Display Image */}
        {imageUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Generated Image:</h2>
            <img src={imageUrl} alt="Generated AI" className="max-w-full max-h-96 mt-4 rounded-lg shadow-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
