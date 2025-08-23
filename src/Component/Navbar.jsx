import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaDiagramProject, FaDownload, FaPhone } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import Resume from './MyResume/JAY_JAMNAPARA_CV.pdf'
import { FaExclamationCircle, FaHome } from "react-icons/fa";

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [hover, setHover] = useState(false);
  const [cvHover, setCvHover] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/about", icon: <FaExclamationCircle />, label: "About" },
    { path: "/skills", icon: <GiSkills />, label: "Skills" },
    { path: "/project", icon: <FaDiagramProject />, label: "Projects" },
    { path: "/contact", icon: <FaPhone />, label: "Contact" },
  ];

  return (
    <nav className="fixed z-50 lg:top-1/4 lg:left-15 md:bottom-1 bottom-4 left-1/2 -translate-x-1/2 flex justify-center px-2 w-fit h-fit">
      <div className="flex flex-row lg:flex-col items-center justify-center gap-3 sm:gap-4 px-3 py-3 rounded-full bg-gradient-to-tl from-[#1e1439] to-blue-950 backdrop-blur-2xl shadow-md w-fit h-fit">
        {/* Logo */}
        <div
          className="flex rounded-full items-center gap-2 font-semibold text-lg cursor-pointer relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="180" height="180" rx="100" ry="100" fill="#8200db" />
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fontSize="80"
              fontWeight="bold"
              fontFamily="Verdana, sans-serif"
              fill="#fff"
              dy=".3em"
            >
              JJ
            </text>
          </svg>

          <AnimatePresence>
            {hover && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
              >
                Jay Jamnapara
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-row lg:flex-col gap-4">
          {navItems.map((item) => (
            <li key={item.path} className="relative flex justify-center">
              <Link
                to={item.path}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex items-center justify-center p-2 text-xl cursor-pointer"
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
              </Link>
              {/* Tooltip on hover */}
              <AnimatePresence>
                {hovered === item.label && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* CV Download Button */}
        <motion.a
          onMouseEnter={() => setCvHover(true)}
          onMouseLeave={() => setCvHover(false)}
          href={Resume}
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-2.5 py-2 rounded-full bg-white text-black text-sm font-medium shadow relative"
        >
          <FaDownload className="inline" />
          <AnimatePresence>
            {cvHover && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
              >
                Download CV
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      </div>
    </nav>
  );
};

export default Navbar;