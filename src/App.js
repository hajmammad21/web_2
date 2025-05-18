import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage'; 
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="app">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="main-content">
        {activeSection === 'home' && <LandingPage />}
        {activeSection === 'login' && <Login />}
        {/* Add other sections as needed */}
      </main>

      <Footer />
    </div>
  );
}

export default App;