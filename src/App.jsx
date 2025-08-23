import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from './Component/Home';
import About from './Component/About';
// import Work from "./Component/Work";
import Project from "./Component/Project";
import Contact from "./Component/Contact";
import Navbar from "./Component/Navbar";
import Skills from "./Component/Skills";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills/>}/>
        <Route path="/project" element={<Project/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </Router>
  )
}

export default App;
