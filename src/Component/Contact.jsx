import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css'
import { FaGithub, FaInstagram, FaLinkedin, FaCheck, FaWhatsapp } from 'react-icons/fa6';
import Avatar from './img/Avatar.webp';

const Contact = () => {
  const canvasRef = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending...");
    setShowSuccess(false);

    // backend url (https://backend-portfolio-qidj.onrender.com/)

    try {
      const res = await fetch("https://backend-portfolio-qidj.onrender.com/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData)
      })

      let Data = await res.json();
      if (Data.success) {
        setStatus("");
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
      else {
        setStatus("Failed to send message. Please try again.");
      }
    }
    catch (err) {
      console.error("sent mail error:", err);
      setStatus("Connection error. Please try again later.");
    }
  }

  // Rest of your existing code for canvas animation...

  let social = [
    {
      link: "https://www.instagram.com/___jay_2705?igsh=NTB6cXExdXk1Zzlx",
      icon: <FaInstagram />
    },
    {
      link: "https://github.com/jayjamnapara/",
      icon: <FaGithub />
    },
    {
      link: "https://www.linkedin.com/in/jay-jamnapara-111062322/",
      icon: <FaLinkedin />
    },
    {
      link: "https://wa.me/917861908503",
      icon: <FaWhatsapp/>
    }
  ]

  return (
    <div className="relative pb-10 lg:pb-0 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.7,
          transition: 'opacity 0.5s ease'
        }}
      />

      {/* Floating Shapes */}
      <motion.div className="absolute top-20 left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-40 right-20 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Success Message Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowSuccess(false)}></div>
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-purple-500/30 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="text-center">
                <motion.div
                  className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-900/20 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    <FaCheck className="text-5xl text-green-500" />
                  </motion.div>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-white mb-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Message Sent!
                </motion.h3>
                
                <motion.p 
                  className="text-gray-300 mb-6"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </motion.p>
                
                <motion.button
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSuccess(false)}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Continue
                </motion.button>
              </div>
              
              {/* Animated confetti effect */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: [`#ff7373`, `#73b0ff`, `#ffdf73`, `#73ff8c`][i % 4],
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ 
                    y: [0, -40, 0],
                    opacity: [0, 1, 0],
                    x: Math.random() > 0.5 ? [0, 20, 0] : [0, -20, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-4 my-8">
        <motion.h1
          className="text-5xl font-light text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch
        </motion.h1>

        <motion.div
          className="flex flex-col md:flex-row bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Contact Form */}
          <div className="w-full md:w-1/2 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg input-field text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg input-field text-white"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Your Message</label>
                <textarea
                  id="message"
                  rows="4"
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg input-field text-white"
                  placeholder="Hello, I would like to..."
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>

              {status && (
                <motion.p
                  className={`text-center text-xl font-semibold ${
                    status.includes("Failed") || status.includes("error") 
                      ? "text-red-400" 
                      : "text-white"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {status}
                </motion.p>
              )}
            </form>
          </div>

          {/* Contact Info & Avatar */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black p-8 flex flex-col justify-center">
            <div className="text-center mb-8">
              <motion.div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden border-2 border-gray-700">
                  <div className="w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    <img src={Avatar} className='h-full w-full' alt="" />
                  </div>
                </div>
              </motion.div>
              <h2 className="text-2xl font-semibold text-white">Jay Jamnapara</h2>
              <p className="text-gray-400">Full Stack Developer</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-300">jayjamnapara27@gmail.com</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-300">+91 7861908503</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-300">Ahmedabad, India</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              {social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className="social-icon w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-indigo-900/50 transition-colors duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <svg className="w-5 h-5 text-2xl text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;