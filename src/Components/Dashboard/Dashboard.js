import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = ({ user, setUser, setActiveSection }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    id: user?.id || '',
    email: user?.email || '',
    username: '',
    full_name: '',
    phone: '',
    created_at: user?.created_at || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setUserProfile(prev => ({
          ...prev,
          username: data.username || '',
          full_name: data.full_name || '',
          phone: data.phone || ''
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: userProfile.username,
          full_name: userProfile.full_name,
          phone: userProfile.phone,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error('Please type "DELETE" to confirm');
      return;
    }

    setLoading(true);
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
      
      if (authError) {
        await supabase.auth.signOut();
      }

      toast.success('Account deleted successfully');
      setUser(null);
      setActiveSection('home');
    } catch (error) {
      toast.error('Error deleting account: ' + error.message);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Manage your account and access your information</p>
      </div>

      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Account Status</h3>
                <p className="stat-value active">Active</p>
              </div>
              <div className="stat-card">
                <h3>Member Since</h3>
                <p className="stat-value">{formatDate(userProfile.created_at)}</p>
              </div>
              <div className="stat-card">
                <h3>Email</h3>
                <p className="stat-value">{userProfile.email}</p>
              </div>
              <div className="stat-card">
                <h3>Username</h3>
                <p className="stat-value">{userProfile.username || 'Not set'}</p>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button 
                  className="action-btn primary"
                  onClick={() => setActiveTab('profile')}
                >
                  Edit Profile
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => setActiveSection('studentnames')}
                >
                  View Students
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => setActiveSection('programs')}
                >
                  Browse Programs
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-header">
              <h3>Profile Information</h3>
              <button
                className={`edit-btn ${isEditing ? 'cancel' : 'edit'}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label>User ID</label>
                <input
                  type="text"
                  value={userProfile.id}
                  disabled
                  className="form-input disabled"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  disabled
                  className="form-input disabled"
                />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={userProfile.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'disabled' : ''}`}
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={userProfile.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'disabled' : ''}`}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'disabled' : ''}`}
                  placeholder="Enter your phone number"
                />
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button
                    className="save-btn"
                    onClick={handleUpdateProfile}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h3>Account Settings</h3>
            
            <div className="settings-group">
              <h4>Account Information</h4>
              <p>Your account was created on {formatDate(userProfile.created_at)}</p>
            </div>

            <div className="settings-group danger-zone">
              <h4>Danger Zone</h4>
              <p>Once you delete your account, there is no going back. Please be certain.</p>
              <button
                className="delete-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Account</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>This action cannot be undone. This will permanently delete your account and remove all your data.</p>
              <p>Please type <strong>DELETE</strong> to confirm:</p>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="confirmation-input"
                placeholder="Type DELETE to confirm"
              />
            </div>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={handleDeleteAccount}
                disabled={loading || deleteConfirmation !== 'DELETE'}
              >
                {loading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;