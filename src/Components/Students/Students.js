import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-toastify';
import './Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name', { ascending: true });

      if (error) throw error;
      
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students data');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const getDepartmentName = (department) => {
    const departmentMap = {
      'computer_science': 'Computer Science',
      'engineering': 'Engineering',
      'mathematics': 'Mathematics',
      'physics': 'Physics'
    };
    return departmentMap[department] || department;
  };

  const getDepartmentColor = (department) => {
    const colorMap = {
      'computer_science': '#64ffda',
      'engineering': '#ff6b6b',
      'mathematics': '#4ecdc4',
      'physics': '#45b7d1'
    };
    return colorMap[department] || '#64ffda';
  };

  if (loading) {
    return (
      <div className="students-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="students-container">
      <div className="students-header">
        <h1>Student Directory</h1>
        <p>Meet our amazing students from various departments</p>
      </div>

      <div className="students-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, student ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="department-filter"
          >
            <option value="all">All Departments</option>
            <option value="computer_science">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
          </select>
        </div>
      </div>

      <div className="students-stats">
        <div className="stat-card">
          <h3>{filteredStudents.length}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{new Set(students.map(s => s.department)).size}</h3>
          <p>Departments</p>
        </div>
      </div>

      <div className="students-grid">
        {filteredStudents.length === 0 ? (
          <div className="no-students">
            <p>No students found matching your criteria.</p>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-avatar">
                <span>{student.full_name?.charAt(0)?.toUpperCase() || 'S'}</span>
              </div>
              
              <div className="student-info">
                <h3 className="student-name">{student.full_name || 'Unknown'}</h3>
                <p className="student-id">ID: {student.student_id || 'N/A'}</p>
                <p className="student-email">{student.email || 'No email'}</p>
                
                <div 
                  className="student-department"
                  style={{ 
                    backgroundColor: `${getDepartmentColor(student.department)}20`,
                    color: getDepartmentColor(student.department),
                    border: `1px solid ${getDepartmentColor(student.department)}40`
                  }}
                >
                  {getDepartmentName(student.department)}
                </div>
              </div>

              <div className="student-footer">
                <span className="join-date">
                  Joined: {new Date(student.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Students;