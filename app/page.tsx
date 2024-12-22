'use client';

import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { FaSearch } from 'react-icons/fa'; // Search icon
import { motion } from 'framer-motion'; // Import Framer Motion

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
      console.error('Error generating image:', err);
      setError('An error occurred while generating the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-500 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <motion.header
        className="bg-white text-blue-600 py-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">AI Image Generator</h1>
        </div>
      </motion.header>

      <div className="flex-grow p-6">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              className="relative w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt..."
                className="w-full p-3 pl-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </motion.div>

            <motion.button
              onClick={generateImage}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <ClipLoader size={20} color="#fff" />
                  <span>Generating...</span>
                </div>
              ) : (
                'Generate Image'
              )}
            </motion.button>
          </div>

          {loading && (
            <div className="text-center text-gray-500 mt-4">
              <p>Please wait while the image is being generated...</p>
            </div>
          )}

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {imageUrl && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-gray-700">Generated Image:</h2>
              <img
                src={imageUrl}
                alt="Generated AI"
                className="max-w-full max-h-96 mt-4 rounded-lg shadow-lg"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* About Section */}
      <motion.section
        className="bg-blue-600 text-white py-12"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p className="text-lg">
            Our AI-powered image generator can create stunning images based on any text prompt you provide.
            Explore the power of artificial intelligence and see what it can create for you!
          </p>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Fast Generation</h3>
              <p>Create images in a matter of seconds, using the latest AI technology.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Unlimited Creativity</h3>
              <p>Provide any prompt, and watch AI bring it to life with unique creations.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">High-Quality Results</h3>
              <p>Our AI generates high-resolution images that you can download and use.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-blue-600 text-white py-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        <div className="max-w-7xl mx-auto text-center px-4">
          <p>&copy; 2024 AI Image Generator. All rights reserved.</p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
