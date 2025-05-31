import React, { useRef, useState } from 'react';
import './ContactUs.css';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_9omnd2h',
      'template_lqx8jcd',
      form.current,
      '7-98oDrJkS820zArY'
    )
    .then((result) => {
      toast.success('Message sent successfully!', {
        position: "top-center",
        autoClose: 5000,
      });
      form.current.reset();
    }, (error) => {
      toast.error('Failed to send message. Please try again.', {
        position: "top-center",
        autoClose: 5000,
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-header">
          <h2>Get in Touch</h2>
          <p>Have questions? Send us a message and we'll respond as soon as possible.</p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="input-group">
            <input 
              type="text" 
              name="user_name" 
              placeholder="Your Name" 
              required 
            />
            <div className="underline"></div>
          </div>

          <div className="input-group">
            <input 
              type="email" 
              name="user_email" 
              placeholder="Your Email" 
              required 
            />
            <div className="underline"></div>
          </div>

          <div className="input-group">
            <input 
              type="text" 
              name="subject" 
              placeholder="Subject" 
              required 
            />
            <div className="underline"></div>
          </div>

          <div className="input-group">
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows="5" 
              required
            ></textarea>
            <div className="underline"></div>
          </div>

          <button 
            type="submit" 
            className="contact-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-info">
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <span>info@khayyam.ac.ir</span>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <span>051 - 35156</span>
          </div>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Mashhad - Falahi 1 - Khayyam Univercity</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;