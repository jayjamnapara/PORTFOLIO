import React, { useState } from "react";
import { motion } from "framer-motion";
import LunaLush from './Project-Image/Luna_Lush.png';
import carDealer from './Project-Image/Car_Dealer.png';
import AdminPanel from './Project-Image/Admin_panel.png';
import TicTacToe from './Project-Image/Tic_Tac_Toe.png';

const Project = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Project categories
  const categories = ["All", "Frontend", "Backend", "Full Stack"];

  // Project data
  const projects = [
    {
      id: 1,
      title: "Luna Lush",
      category: "Frontend",
      description: "Luna Lush is a sleek, responsive beauty e-commerce frontend built with HTML, CSS, and vanilla JavaScript. It features animated product cards, dynamic filters, and a smooth cart preview for a delightful shopping experience.",
      technologies: ["HTML", "CSS", "tailwindCSS", "JavaScript"],
      image: LunaLush,
      liveLink: "https://luna-lush.netlify.app/",
      githubLink: "https://github.com/jayjamnapara/Perfume-E-Commerce"
    },
    {
      id: 2,
      title: "Car Dealer",
      category: "Full Stack",
      description: "A full-stack car dealership platform where users can explore, filter, and manage car listings. Built with React, Context API, and TailwindCSS for a smooth and responsive experience.",
      technologies: ["React", "ContextAPI", "JSON", "TailwindCSS"],
      image: carDealer,
      liveLink: "https://cardealerjay.netlify.app/",
      githubLink: "https://github.com/jayjamnapara/CarDealer"
    },
    {
      id: 3,
      title: "Product Management Admin Panel",
      category: "Backend",
      description: "A secure authentication service with PassportAuth, and password recovery with mailer funcationality and JWT token through decryption.",
      technologies: ["Node.js", "MongoDB", "PassportAuth", "JWT", "Mailer"],
      image: AdminPanel,
      liveLink: "#",
      githubLink: "https://github.com/jayjamnapara/Admin-Panel"
    },
    {
      id: 4,
      title: "RESTful API Service",
      category: "Backend",
      description: "A scalable REST API with authentication, rate limiting, and comprehensive documentation.",
      technologies: ["Node.js", "Express", "JWT", "MongoDB"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 6,
      title: "Weather Application",
      category: "Frontend",
      description: "A beautiful weather app with location detection, forecasts, and interactive maps.",
      technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation API"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 7,
      title: "Authentication Microservice",
      category: "Backend",
      description: "A secure authentication service with OAuth, two-factor authentication, and password recovery.",
      technologies: ["Node.js", "Redis", "OAuth2", "JWT"],
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 8,
      title: "Tic Tac Teo",
      category: "Frontend",
      description: "",
      technologies: ["React", "TailwindCSS", "JavaScript"],
      image: TicTacToe,
      liveLink: "#",
      githubLink: "#"
    },
  ];

  // Filter projects based on category
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 md:px-8">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.1, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles - fixed positioning and reduced number */}
      <div className="fixed inset-0 overflow-hidden z-10">
        {[...Array(400)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            My Work
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills as a Full Stack Developer.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
              className={`px-6 py-2 rounded-full border transition-all ${activeFilter === category
                ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent"
                : "border-white/20 hover:border-purple-500/50"
                }`}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group cursor-pointer">
              <motion.div variants={hoverVariants} className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm">
                  {project.category}
                </div>
              </motion.div>

              <div className="p-5 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/10 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <motion.a
                    href={project.liveLink}
                    className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    whileHover={{ x: 5 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                    whileHover={{ x: 5 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Code
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-4 right-4 bg-black/70 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black"
                onClick={() => setActiveProject(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm">
                {activeProject.category}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{activeProject.title}</h2>
              <p className="text-gray-300 mb-6">{activeProject.description}</p>

              <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.a
                  href={activeProject.liveLink}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </motion.a>
                <motion.a
                  href={activeProject.githubLink}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-medium hover:bg-white/20 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  View Code
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )} */}
    </div>
  );
};

export default Project;