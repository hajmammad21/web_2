import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage'; 
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import AboutUs from './Components/AboutUs/AboutUs';
import Programs from './Components/Programs/Programs';
import ContactUs from './Components/ContactUs/ContactUs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="app">
      <ToastContainer />
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="main-content">
        {activeSection === 'home' && <LandingPage setActiveSection={setActiveSection} />}
        {activeSection === 'login' && <Login setActiveSection={setActiveSection} />}
        {activeSection === 'signup' && <SignUp setActiveSection={setActiveSection} />}
        {activeSection === 'aboutus' && <AboutUs setActiveSection={setActiveSection} />}
        {activeSection === 'programs' && <Programs setActiveSection={setActiveSection} />}
        {activeSection === 'contact' && <ContactUs setActiveSection={setActiveSection} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
