import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient'; // Make sure this import path is correct
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import AboutUs from './Components/AboutUs/AboutUs';
import Programs from './Components/Programs/Programs';
import ContactUs from './Components/ContactUs/ContactUs';
import Gallery from './Components/Gallery/Gallery';
import Students from './Components/Students/Students';
import Dashboard from './Components/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session?.user);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveSection('home');
  };

  if (loading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px' 
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <ToastContainer />
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        user={user}
        setUser={setUser}
      />
     
    <main className="main-content">
        {activeSection === 'home' && <LandingPage setActiveSection={setActiveSection} />}
        {activeSection === 'login' && (
    <Login
        setActiveSection={setActiveSection}
        onLoginSuccess={handleLoginSuccess}
    />
  )}
        {activeSection === 'signup' && <SignUp setActiveSection={setActiveSection} />}
        {activeSection === 'aboutus' && <AboutUs setActiveSection={setActiveSection} />}
        {activeSection === 'programs' && <Programs setActiveSection={setActiveSection} />}
        {activeSection === 'contactus' && <ContactUs setActiveSection={setActiveSection} />}
        {activeSection === 'studentnames' && <Students />}
        {activeSection === 'gallery' && <Gallery />}
        {activeSection === 'dashboard' && (
      <Dashboard 
      user={user} 
      setUser={setUser} 
      setActiveSection={setActiveSection} 
    />
  )}
</main>
      <Footer />
    </div>
  );
}

export default App;