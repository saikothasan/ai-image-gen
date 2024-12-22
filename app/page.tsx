'use client';

import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { FaSearch, FaBolt, FaPaintBrush, FaDownload, FaCheckCircle } from 'react-icons/fa'; // Icons for Features and About
import { motion } from 'framer-motion'; // Import Framer Motion
import ReactLoading from 'react-loading'; // For loading spinner
import { ToastContainer, toast } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Required Toast styles

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt) {
      toast.error('Please enter a prompt');
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
        toast.success('Image generated successfully!');
      } else {
        setError('Failed to generate image');
        toast.error('Failed to generate image');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError('An error occurred while generating the image');
      toast.error('An error occurred while generating the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-teal-400 to-indigo-600 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ToastContainer />
      
      {/* Header */}
      <motion.header
        className="bg-white text-teal-600 py-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-gradient">AI Image Generator</h1>
          <p className="text-center text-xl text-gray-500 mt-2">Generate unique images with just a prompt.</p>
        </div>
      </motion.header>

      <div className="flex-grow p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6">
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
                className="w-full p-4 pl-10 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </motion.div>

            <motion.button
              onClick={generateImage}
              disabled={loading}
              className="w-full py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:bg-teal-400 transition duration-300"
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
              <h2 className="text-3xl font-semibold text-gray-700">Generated Image:</h2>

              {/* Image Viewer */}
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Generated AI"
                  className="max-w-full max-h-96 mt-4 rounded-xl shadow-2xl"
                />
              </div>

              {/* Download Button */}
              <div className="mt-4">
                <a
                  href={imageUrl}
                  download="generated-image.png"
                  className="py-2 px-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
                >
                  <FaDownload className="inline-block mr-2" size={20} />
                  Download Image
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* About Section */}
      <motion.section
        className="bg-teal-600 text-white py-16"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">About</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="flex flex-col items-center">
              <FaBolt className="text-5xl text-yellow-400 mb-4" />
              <p className="text-lg">Quick & Easy</p>
            </div>
            <div className="flex flex-col items-center">
              <FaPaintBrush className="text-5xl text-pink-400 mb-4" />
              <p className="text-lg">Creative Potential</p>
            </div>
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-5xl text-green-400 mb-4" />
              <p className="text-lg">High-Quality Output</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-8 bg-white shadow-xl rounded-lg">
              <div className="text-teal-600 text-4xl mb-4">
                <FaBolt />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Fast Generation</h3>
              <p>Create images in seconds, powered by advanced AI algorithms.</p>
            </div>
            <div className="p-8 bg-white shadow-xl rounded-lg">
              <div className="text-pink-500 text-4xl mb-4">
                <FaPaintBrush />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Unlimited Creativity</h3>
              <p>Provide any prompt, and watch AI generate stunning images.</p>
            </div>
            <div className="p-8 bg-white shadow-xl rounded-lg">
              <div className="text-teal-500 text-4xl mb-4">
                <FaDownload />
              </div>
              <h3 className="text-2xl font-semibold mb-2">High-Quality Output</h3>
              <p>Our AI generates high-resolution images you can easily download.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-teal-600 text-white py-6"
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
