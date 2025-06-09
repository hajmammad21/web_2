import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'react-toastify';
import './Programs.css';

const Program = ({ setActiveSection }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Programs', icon: '🎯' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'data', name: 'Data Science', icon: '📊' },
    { id: 'business', name: 'Business', icon: '📈' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ];

  const programs = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description: "Master modern web development with React, Node.js, MongoDB, and cloud deployment. Build real-world applications from scratch.",
      duration: "16 Weeks",
      level: "Intermediate",
      price: "$1,899",
      originalPrice: "$2,299",
      category: "development",
      rating: 4.9,
      students: 2847,
      icon: "💻",
      features: [
        "React & Next.js mastery",
        "Node.js & Express backend",
        "MongoDB & PostgreSQL",
        "AWS deployment",
        "Real-time applications",
        "Career placement support"
      ],
      highlights: ["Most Popular", "Job Guarantee"]
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      description: "Comprehensive data science program covering Python, R, ML algorithms, and AI fundamentals with industry projects.",
      duration: "20 Weeks",
      level: "Beginner",
      price: "$2,199",
      originalPrice: "$2,599",
      category: "data",
      rating: 4.8,
      students: 1923,
      icon: "📊",
      features: [
        "Python & R programming",
        "Advanced statistics",
        "Machine learning algorithms",
        "Deep learning basics",
        "Data visualization",
        "Kaggle competitions"
      ],
      highlights: ["High Demand", "AI Focus"]
    },
    {
      id: 3,
      title: "UX/UI Design Mastery",
      description: "Create stunning user experiences with advanced design principles, prototyping tools, and user research methodologies.",
      duration: "12 Weeks",
      level: "All Levels",
      price: "$1,299",
      originalPrice: "$1,599",
      category: "design",
      rating: 4.7,
      students: 1654,
      icon: "🎨",
      features: [
        "Figma & Adobe XD",
        "User research methods",
        "Design systems",
        "Prototyping & testing",
        "Mobile-first design",
        "Portfolio development"
      ],
      highlights: ["Creative Focus", "Portfolio Ready"]
    },
    {
      id: 4,
      title: "Artificial Intelligence Bootcamp",
      description: "Dive deep into AI and neural networks. Learn TensorFlow, PyTorch, and build intelligent applications.",
      duration: "18 Weeks",
      level: "Advanced",
      price: "$2,799",
      originalPrice: "$3,299",
      category: "data",
      rating: 4.9,
      students: 892,
      icon: "🧠",
      features: [
        "Neural networks & deep learning",
        "Computer vision",
        "Natural language processing",
        "Reinforcement learning",
        "MLOps & deployment",
        "Research projects"
      ],
      highlights: ["Cutting Edge", "Research Focus"]
    },
    {
      id: 5,
      title: "Cybersecurity Specialist",
      description: "Become an ethical hacker and security expert. Learn penetration testing, network security, and incident response.",
      duration: "14 Weeks",
      level: "Intermediate",
      price: "$1,999",
      originalPrice: "$2,399",
      category: "security",
      rating: 4.8,
      students: 743,
      icon: "🔒",
      features: [
        "Ethical hacking techniques",
        "Network security protocols",
        "Incident response",
        "Cryptography basics",
        "Security auditing",
        "Industry certifications prep"
      ],
      highlights: ["High Salary", "Remote Friendly"]
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Build native iOS and Android apps using React Native and Swift/Kotlin. Deploy to app stores successfully.",
      duration: "15 Weeks",
      level: "Intermediate",
      price: "$1,799",
      originalPrice: "$2,199",
      category: "development",
      rating: 4.6,
      students: 1342,
      icon: "📱",
      features: [
        "React Native development",
        "iOS Swift programming",
        "Android Kotlin",
        "App store deployment",
        "Push notifications",
        "Monetization strategies"
      ],
      highlights: ["Mobile First", "App Store Ready"]
    },
    {
      id: 7,
      title: "Digital Marketing Analytics",
      description: "Master digital marketing with data-driven strategies. Learn SEO, PPC, social media, and conversion optimization.",
      duration: "10 Weeks",
      level: "Beginner",
      price: "$899",
      originalPrice: "$1,199",
      category: "business",
      rating: 4.5,
      students: 2156,
      icon: "📈",
      features: [
        "Google Analytics & Ads",
        "Social media marketing",
        "SEO optimization",
        "Email marketing",
        "Content strategy",
        "ROI analysis"
      ],
      highlights: ["Business Focus", "ROI Driven"]
    },
    {
      id: 8,
      title: "Creative Photography & Editing",
      description: "Master photography techniques and post-processing. Learn composition, lighting, and advanced editing workflows.",
      duration: "8 Weeks",
      level: "All Levels",
      price: "$699",
      originalPrice: "$899",
      category: "design",
      rating: 4.4,
      students: 987,
      icon: "📷",
      features: [
        "Photography fundamentals",
        "Lightroom & Photoshop",
        "Portrait & landscape",
        "Studio lighting",
        "Commercial photography",
        "Portfolio building"
      ],
      highlights: ["Creative Skills", "Visual Arts"]
    }
  ];

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  const handleBuyNow = (program) => {
    addToCart(program);
    toast.success(`${program.title} added to cart!`);
  };

  return (
    <div className="enhanced-program-container">
      <div className="background-elements">
        <div className="floating-element floating-element-1"></div>
        <div className="floating-element floating-element-2"></div>
        <div className="floating-element floating-element-3"></div>
      </div>

      <div className="enhanced-program-wrapper">
        <div className="enhanced-program-header">
          <div className="premium-badge">
            <span className="badge-icon">🏆</span>
            Premium Learning Programs
          </div>
          
          <h1 className="main-title">
            Transform Your
            <span className="title-highlight">Career Journey</span>
          </h1>
          
          <p className="main-description">
            Choose from our expertly crafted programs designed by industry professionals. 
            Each course includes hands-on projects, mentorship, and career support.
          </p>

          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number stat-teal">12,000+</div>
              <div className="stat-label">Students Enrolled</div>
            </div>
            <div className="stat-item">
              <div className="stat-number stat-blue">95%</div>
              <div className="stat-label">Job Placement Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number stat-purple">4.8</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="enhanced-program-grid">
          {filteredPrograms.map((program, index) => (
            <div
              key={program.id}
              className="enhanced-program-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-glow"></div>
              
              {program.highlights && (
                <div className="highlights-container">
                  {program.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight-badge">
                      {highlight}
                    </span>
                  ))}
                </div>
              )}

              <div className="card-content">
                <div className="card-header">
                  <div className="program-icon">
                    <span className="icon-emoji">{program.icon}</span>
                  </div>
                  <div className="program-info">
                    <h3 className="program-title">{program.title}</h3>
                    <div className="program-meta">
                      <div className="rating">
                        <span className="star">⭐</span>
                        <span className="rating-number">{program.rating}</span>
                      </div>
                      <div className="students">
                        <span className="students-icon">👥</span>
                        <span>{program.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="program-description">{program.description}</p>

                <div className="program-details-grid">
                  <div className="detail-box">
                    <div className="detail-header">
                      <span className="detail-icon">⏱️</span>
                      <span className="detail-label">Duration</span>
                    </div>
                    <div className="detail-value">{program.duration}</div>
                  </div>
                  <div className="detail-box">
                    <div className="detail-header">
                      <span className="detail-icon">🏆</span>
                      <span className="detail-label">Level</span>
                    </div>
                    <div className="detail-value">{program.level}</div>
                  </div>
                </div>

                <div className="features-section">
                  <h4 className="features-title">What you'll learn:</h4>
                  <div className="features-list">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <div className="feature-dot"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pricing-section">
                  <div className="price-container">
                    <span className="current-price">{program.price}</span>
                    <span className="original-price">{program.originalPrice}</span>
                  </div>
                  <div className="savings">
                    Save ${parseInt(program.originalPrice.replace('$', '').replace(',', '')) - parseInt(program.price.replace('$', '').replace(',', ''))}
                  </div>
                </div>

                <button
                  onClick={() => handleBuyNow(program)}
                  className="enroll-button"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-cta">
          <h2 className="cta-title">
            Not sure which program is right for you?
          </h2>
          <p className="cta-description">
            Schedule a free consultation with our career advisors to find the perfect learning path for your goals.
          </p>
          <button className="consultation-button">
            Get Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Program;