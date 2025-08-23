import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Avatar from './img/Avatar.webp';
import { FaReact, FaNodeJs, FaDatabase, FaLayerGroup, FaCode } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';

const About = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const particlesRef = useRef(null);

    // Floating particles effect
    useEffect(() => {
        const container = particlesRef.current;
        if (!container) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-400 pointer-events-none';

            const size = Math.random() * 9 + 7;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            container.appendChild(particle);

            const startPos = {
                x: Math.random() * container.offsetWidth,
                y: Math.random() * container.offsetHeight
            };

            particle.style.left = `${startPos.x}px`;
            particle.style.top = `${startPos.y}px`;

            particle.animate(
                [
                    { transform: `translate(0, 0)`, opacity: 0.7 },
                    { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0 }
                ],
                {
                    duration: Math.random() * 3000 + 2000,
                    iterations: Infinity
                }
            );

            return particle;
        };

        const particles = [];
        for (let i = 0; i < 30; i++) {
            particles.push(createParticle());
        }

        return () => {
            particles.forEach(particle => {
                if (particle && particle.parentNode === container) {
                    container.removeChild(particle);
                }
            });
        };
    }, []);

    // Split name into letters for animation
    const firstName = "JAY";
    const lastName = "JAMNAPARA";

    const letterVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
            rotate: -180,
            filter: "blur(10px)",
            y: 50
        },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            y: 0,
            transition: {
                delay: i * 0.05,
                type: "spring",
                stiffness: 150,
                damping: 12,
                mass: 0.5
            }
        }),
        hover: (i) => ({
            y: -10,
            color: "#ec4899",
            transition: {
                delay: i * 0.02,
                type: "spring",
                stiffness: 500
            }
        })
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3
            }
        }
    };

    return (
        <div className="relative pb-10 lg:pb-0 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
            {/* Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Particles Container */}
            <div
                ref={particlesRef}
                className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            ></div>

            {/* Floating Shapes */}
            <motion.div
                className="absolute top-20 left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-40 right-20 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl"
                animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            {/* Main Content Card */}
            <motion.div
                className="relative z-10 w-[90%] lg:w-[95%] md:w-[85%] lg:max-w-5xl h-[80vh] lg:h-[73vh] bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 md:p-10 text-white overflow-hidden lg:overflow-hidden"
                style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * -0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(0)`,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {/* Animated border gradient */}
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-30"
                    style={{ background: "conic-gradient(from 45deg, #6366f1, #ec4899, #6366f1)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute inset-2 px-5 py-5 rounded-2xl overflow-y-scroll lg:overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] z-0">
                    <div className="relative z-10 flex flex-col justify-center items-center md:flex-row gap-8 md:gap-12">
                        {/* Profile Image */}
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            <motion.div
                                className="relative w-40 h-40 md:w-52 lg:w-44 rounded-full mx-auto flex items-center justify-center shadow-lg"
                                whileHover={{
                                    scale: 1.05,
                                    rotateY: mousePosition.x * 0.5,
                                    transition: { type: "spring", stiffness: 300, damping: 15 }
                                }}
                            >
                                {/* Animated rings */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                                    animate={{
                                        scale: isHovered ? [1, 1.1, 1] : 1,
                                        opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
                                        rotate: isHovered ? 360 : 0
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: isHovered ? Infinity : 0,
                                        ease: "linear"
                                    }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-700"
                                    animate={{
                                        scale: isHovered ? [1, 1.15, 1] : 1,
                                        opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
                                        rotate: isHovered ? -360 : 0
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: isHovered ? Infinity : 0,
                                        ease: "linear",
                                        delay: 0.2
                                    }}
                                />

                                {/* Glow effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-purple-500"
                                    animate={{
                                        scale: isHovered ? [1, 1.2, 1] : 1,
                                        opacity: isHovered ? [0, 0.4, 0] : 0,
                                        boxShadow: isHovered ? "0 0 20px 10px rgba(168, 85, 247, 0.5)" : "none"
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: isHovered ? Infinity : 0
                                    }}
                                />

                                <div className="w-36 h-36 md:w-44 md:h-44 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden z-10">
                                    <motion.img
                                        src={Avatar}
                                        className="w-full h-full object-cover"
                                        alt="Jay Jamnapara"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    />
                                </div>
                            </motion.div>

                            {/* Name Animation */}
                            <motion.div
                                className="flex flex-col mt-5 justify-center items-center"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                            >
                                <div className="name-container flex">
                                    {firstName.split("").map((letter, index) => (
                                        <motion.span
                                            key={`first-${index}`}
                                            className="name-letter text-xl font-bold"
                                            custom={index}
                                            variants={letterVariants}
                                            style={{
                                                transform: `translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`
                                            }}
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="name-container flex">
                                    {lastName.split("").map((letter, index) => (
                                        <motion.span
                                            key={`last-${index}`}
                                            className="text-xl font-bold"
                                            custom={index + firstName.length}
                                            variants={letterVariants}
                                            style={{
                                                transform: `translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`
                                            }}
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div >

                        {/* About Me Text */}
                        <motion.div
                            className="flex-1"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.h1
                                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ["0%", "100%", "0%"]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    backgroundSize: "200% 100%"
                                }}
                            >
                                About Me
                            </motion.h1>

                            <motion.p
                                className="text-base md:text-lg text-gray-300 leading-relaxed mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                I am a passionate <span className="text-purple-400 font-bold">Full Stack Developer</span> and <span className="text-purple-400 font-bold">UI Designer</span>
                                with a strong focus on building elegant and high-performance web applications.
                                My journey in coding started with curiosity, and over time, I honed my skills in front-end & back-end development,
                                blending creativity with logic to deliver impactful solutions.
                            </motion.p>

                            {/* Technical specialties section */}
                            <motion.div
                                className="mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6 }}
                            >
                                <h3 className="text-xl font-semibold text-purple-300 mb-3">Technical Specialties:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="relative group cursor-pointer flex items-center">
                                        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-purple-500 rounded-md group-hover:scale-110 transition-transform duration-300">
                                            <FaReact className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-gray-200 font-medium group-hover:text-purple-300 transition-colors duration-300">ReactJS</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="relative group bg-gray-900/50 rounded-lg cursor-pointer flex items-center">
                                        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-purple-500 rounded-md group-hover:scale-110 transition-transform duration-300">
                                            <SiJavascript className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-gray-200 font-medium group-hover:text-purple-300 transition-colors duration-300">JavaScript</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="relative group bg-gray-900/50 rounded-lg cursor-pointer flex items-center">
                                        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-purple-500 rounded-md group-hover:scale-110 transition-transform duration-300">
                                            <FaNodeJs className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-gray-200 font-medium group-hover:text-purple-300 transition-colors duration-300">NodeJS</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="relative group bg-gray-900/50 rounded-lg cursor-pointer flex items-center">
                                        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-purple-500 rounded-md group-hover:scale-110 transition-transform duration-300">
                                            <FaLayerGroup className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-gray-200 font-medium group-hover:text-purple-300 transition-colors duration-300">UI/UX Design</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="relative group bg-gray-900/50 rounded-lg cursor-pointer flex items-center">
                                        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-purple-500 rounded-md group-hover:scale-110 transition-transform duration-300">
                                            <FaDatabase className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-gray-200 font-medium group-hover:text-purple-300 transition-colors duration-300">Database System</span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            <motion.p
                                className="text-base md:text-lg text-gray-300 leading-relaxed mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8 }}
                            >
                                When I'm not coding, you can find me exploring the latest design trends,
                                contributing to open-source projects, or experimenting with new frameworks
                                and libraries to expand my technical expertise. I also enjoy mentoring junior developers.
                            </motion.p>

                            {/* Contact button */}
                            <motion.div className="mt-4 flex justify-center md:justify-start">
                                <motion.button
                                    className="relative h-12 w-40 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium text-white shadow-lg flex justify-center items-center gap-2 group overflow-hidden"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Button shine effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.6 }}
                                    />

                                    <span>Get In Touch</span>
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div >
                </div >
            </motion.div>
        </div>
    );
};

export default About;