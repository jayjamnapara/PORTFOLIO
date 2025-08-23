import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css'
import { FaFacebook } from 'react-icons/fa';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa6';
import Avatar from './img/Avatar.WEBP';

const Contact = () => {
  const canvasRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle system
    const particles = [];
    const particleCount = 200;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${Math.random() * 70 + 150}, ${Math.random() * 70 + 150}, ${Math.random() * 70 + 200}, ${Math.random() * 0.5 + 0.2})`
      });
    }
    
    // Draw particles
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      e.target.reset();
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
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
                {isSubmitted ? 'Message Sent!' : 'Send Message'}
              </motion.button>
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
              {[ <FaFacebook />, <FaTwitter/>, <FaInstagram/>, <FaGithub/>].map((social, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="social-icon w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-indigo-900/50 transition-colors duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <svg className="w-5 h-5 text-2xl text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social}
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