import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const canvasRef = useRef(null);

  // Skill categories
  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      skills: [
        { name: 'ReactJS', level: 95, color: '#61DAFB', icon: '⚛️' },
        { name: 'JavaScript', level: 93, color: '#F7DF1E', icon: '📜' },
        { name: 'HTML/CSS', level: 98, color: '#E34F26', icon: '🎨' },
        { name: 'Tailwind CSS', level: 96, color: '#06B6D4', icon: '💨' },
      ]
    },
    backend: {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 90, color: '#339933', icon: '🟢' },
        { name: 'Express', level: 88, color: '#000000', icon: '🚂' },
        { name: 'MongoDB', level: 82, color: '#47A248', icon: '🍃' },
        { name: 'Firebase', level: 83, color: '#FFCA28', icon: '🔥' },
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git/GitHub', level: 94, color: '#181717', icon: '📊' },
        { name: 'Figma', level: 90, color: '#F24E1E', icon: '🎨' },
        { name: 'Webpack', level: 82, color: '#8DD6F9', icon: '📦' },
      ]
    },
    soft: {
      title: 'Soft Skills',
      skills: [
        { name: 'Problem Solving', level: 96, color: '#8A2BE2', icon: '🧩' },
        { name: 'Team Collaboration', level: 92, color: '#228B22', icon: '👥' },
        { name: 'Communication', level: 90, color: '#1E90FF', icon: '💬' },
        { name: 'Project Management', level: 85, color: '#4B0082', icon: '📅' },
        { name: 'Creativity', level: 93, color: '#FF1493', icon: '🎭' },
        { name: 'Adaptability', level: 94, color: '#FF8C00', icon: '🔄' },
      ]
    }
  };

  // Canvas animation for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${Math.random() * 360}, 50%, 50%, ${1 - distance/100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      } 
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { 
        duration: 1.5, 
        ease: "easeOut", 
        delay: 0.5 
      }
    })
  };

  const categoryButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative py-12">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20 z-0"></canvas>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10"
        animate={{ 
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 20, 0],
        }} 
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"
        animate={{ 
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          rotate: [0, -15, 0],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
      />

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-20">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Skills & Expertise
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            A visual representation of my technical abilities and professional strengths
          </motion.p>
        </motion.div>

        {/* Category selector */}
        <motion.div 
          className="flex flex-wrap max-w-4xl mx-auto justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {Object.keys(skillCategories).map((category, index) => (
            <motion.button
              key={index}
              className={`px-6 py-3 z-50 rounded-xl font-medium transition-all relative overflow-hidden group ${
                activeCategory == category 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-sm border border-white/10'
              }`}
              onClick={() => setActiveCategory(category)}
              variants={categoryButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              {/* Button shine effect on hover */}
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              {skillCategories[category].title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-white/5 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden group cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Skill icon */}
              <div className="text-3xl mb-4" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{skill.name}</h3>
                <span className="text-sm font-medium text-gray-300">
                  {skill.level}%
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4 relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  variants={progressVariants}
                  custom={skill.level}
                  initial="hidden"
                  animate="visible"
                />
              </div>
              
              {/* Skill level indicator dots */}
              <div className="flex justify-between items-center">
                {[0, 25, 50, 75, 100].map((point) => (
                  <div
                    key={point}
                    className={`w-2 h-2 rounded-full ${
                      skill.level >= point ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{ backgroundColor: skill.color }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-3xl p-8 backdrop-blur-lg border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">My Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: "🚀", 
                title: "Continuous Learning", 
                text: "Always exploring new technologies and methodologies to stay at the forefront of development" 
              },
              { 
                icon: "💡", 
                title: "Problem Solving", 
                text: "Transforming complex challenges into elegant, efficient solutions through analytical thinking" 
              },
              { 
                icon: "🔍", 
                title: "Attention to Detail", 
                text: "Meticulous approach to crafting clean, maintainable, and performant code" 
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="text-center p-6 bg-black/20 rounded-2xl hover:bg-purple-900/20 transition-colors duration-300"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;