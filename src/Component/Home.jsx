import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Import your images
import Avatar from "./img/Avtar.PNG";
import Skills from "./img/Skills.PNG";
import Project from "./img/Project.PNG";
import contact from "./img/contact.PNG";

const Home = () => {
    const [activePanel, setActivePanel] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    // Track mouse position for 3D effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 80,
                y: (e.clientY / window.innerHeight - 0.5) * 80
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Spider web animation (canvas bg) - Automatic only
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const isMobile = window.innerWidth < 768; //tailwind md breakpoint
        const web = {
            nodes: [],
            connections: [], 
            numNodes: isMobile ? 20 : 80,
            autoMoveOffset: { x: 0, y: 0 },
            autoMoveAngle: 0,
            maxDistance: isMobile ? 120 : 180, // mobile small distance
            nodeRadiusRange: isMobile ? [0.5, 1.2] : [0.8, 2] 
        };

        // Initialize nodes
        for (let i = 0; i < web.numNodes; i++) {
            const Radius = Math.random() * (web.nodeRadiusRange[1] - web.nodeRadiusRange[0]) + web.nodeRadiusRange[0]
            web.nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Radius,
                vx: Math.random() * 0.3 - 0.15,
                vy: Math.random() * 0.3 - 0.15,
                baseX: 0,
                baseY: 0,
                autoMoveX: 0,
                autoMoveY: 0,
                autoMoveSpeed: 0.8 + Math.random() * 0.8,
                autoMoveRadius: isMobile ? 15 + Math.random() * 40 : 20 + Math.random() * 60, //small orbit
                autoMoveAngle: Math.random() * Math.PI * 2,
            });
        }

        // Store base positions
        web.nodes.forEach(node => {
            node.baseX = node.x;
            node.baseY = node.y;
        });

        // Create connections
        for (let i = 0; i < web.nodes.length; i++) {
            for (let j = i + 1; j < web.nodes.length; j++) {
                const dx = web.nodes[i].x - web.nodes[j].x;
                const dy = web.nodes[i].y - web.nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180) {
                    web.connections.push({
                        from: i,
                        to: j,
                        length: dist,
                        strength: 0.9 - (dist / 180) * 0.7,
                    });
                }
            }
        }

        // Auto movement parameters
        const autoMoveSpeed = 3.0;
        const autoMoveAmplitude = isMobile ? 60 : 100;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update auto movement angle
            web.autoMoveAngle += autoMoveSpeed;

            // Calculate auto movement offset
            web.autoMoveOffset.x = Math.cos(web.autoMoveAngle) * autoMoveAmplitude;
            web.autoMoveOffset.y = Math.sin(web.autoMoveAngle * 0.7) * autoMoveAmplitude;

            // Auto movement center
            const centerX = canvas.width / 2 + web.autoMoveOffset.x;
            const centerY = canvas.height / 2 + web.autoMoveOffset.y;

            // Update nodes with smoother physics
            for (let i = 0; i < web.nodes.length; i++) {
                const node = web.nodes[i];

                // Add automatic movement
                node.autoMoveAngle += node.autoMoveSpeed * 0.01;
                node.autoMoveX = Math.cos(node.autoMoveAngle) * node.autoMoveRadius;
                node.autoMoveY = Math.sin(node.autoMoveAngle) * node.autoMoveRadius;

                // Apply gentle return to base position
                const returnForce = 0.01;
                node.vx += (node.baseX + node.autoMoveX - node.x) * returnForce;
                node.vy += (node.baseY + node.autoMoveY - node.y) * returnForce;

                // Apply damping (friction)
                node.vx *= 0.92;
                node.vy *= 0.92;

                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Boundary handling with soft constraints
                const boundaryMargin = 50;
                const boundaryForce = 0.05;

                if (node.x < boundaryMargin) node.vx += boundaryForce;
                if (node.x > canvas.width - boundaryMargin) node.vx -= boundaryForce;
                if (node.y < boundaryMargin) node.vy += boundaryForce;
                if (node.y > canvas.height - boundaryMargin) node.vy -= boundaryForce;

                // Center attraction for more cohesive movement
                const dxToCenter = node.x - centerX;
                const dyToCenter = node.y - centerY;
                const distToCenter = Math.sqrt(dxToCenter * dxToCenter + dyToCenter * dyToCenter);

                if (distToCenter > 200) {
                    const angleToCenter = Math.atan2(dyToCenter, dxToCenter);
                    const centerForce = 0.01;

                    node.vx -= Math.cos(angleToCenter) * centerForce;
                    node.vy -= Math.sin(angleToCenter) * centerForce;
                }
            }

            // Draw connections with opacity based on distance
            for (let i = 0; i < web.connections.length; i++) {
                const conn = web.connections[i];
                const fromNode = web.nodes[conn.from];
                const toNode = web.nodes[conn.to];

                const dx = toNode.x - fromNode.x;
                const dy = toNode.y - fromNode.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Calculate connection tension with limits
                const targetLength = conn.length;
                const stretch = dist - targetLength;
                const tension = stretch * 0.015 * conn.strength;

                // Apply constraints to prevent excessive forces
                const maxTension = 2.0;
                const constrainedTension = Math.max(-maxTension, Math.min(maxTension, tension));

                if (dist > 0) {
                    const ax = (dx / dist) * constrainedTension;
                    const ay = (dy / dist) * constrainedTension;

                    fromNode.vx += ax;
                    fromNode.vy += ay;
                    toNode.vx -= ax;
                    toNode.vy -= ay;
                }

                // Draw line with opacity based on stretch
                const opacity = Math.max(0, 0.6 - Math.abs(stretch) / 100);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.5;

                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.stroke();
            }

            // Draw nodes with subtle glow
            for (let i = 0; i < web.nodes.length; i++) {
                const node = web.nodes[i];
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

                // Create gradient for nodes
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius * 2
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

                ctx.fillStyle = gradient;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    // Panel data
    const panelData = [
        { id: 1, title: "About", icon: Avatar, href: "/about", color: "bg-blue-500/10", description: "Learn about my background and skills" },
        { id: 2, title: "Skills", icon: Skills, href: "/skills", color: "bg-orange-400/10", description: "See my professional experience" },
        { id: 3, title: "Projects", icon: Project, href: "/project", color: "bg-purple-500/10", description: "Explore my portfolio" },
        { id: 5, title: "Contact", icon: contact, href: "/contact", color: "bg-yellow-400/10", description: "Get in touch with me" },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
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

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
                <motion.h1
                    className="text-5xl md:text-6xl mt-5 font-extrabold text-white drop-shadow-lg"
                    style={{
                        transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
                    }}
                >
                    JAY <span className="text-purple-700">JAMNAPARA</span>
                </motion.h1>
                <motion.p
                    className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Full Stack Developer & UI Designer
                </motion.p>

                {/* Panels */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {panelData.map((panel) => (
                        <motion.a
                            key={panel.id}
                            href={panel.href}
                            className={`p-6 rounded-2xl shadow-lg backdrop-blur-md text-white hover:shadow-2xl transition ${panel.color}`}
                            onMouseEnter={() => setActivePanel(panel.id)}
                            onMouseLeave={() => setActivePanel(null)}
                            whileHover={{ scale: 1.05 }}
                            animate={{
                                y: [0, -3, 0],
                                transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: panel.id * 0.2 }
                            }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <motion.img src={panel.icon} alt={panel.title} className="w-16 h-16 mb-4"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    animate={{
                                        rotate: [0, 2, 0],
                                        transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: panel.id * 0.3 }
                                    }}
                                />
                                <h3 className="text-xl font-bold">{panel.title}</h3>
                                <p className="text-sm text-gray-300 mt-2">{panel.description}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;