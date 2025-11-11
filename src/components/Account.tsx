import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Edit2, Save, X, LogOut } from 'lucide-react';

/**
 * Account component
 * Displays and allows editing of user account information
 */
export default function Account() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Handle input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Toggle edit mode
   */
  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data when canceling edit
      setFormData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
      });
      setError('');
      setSuccess('');
    }
    setIsEditing(!isEditing);
  };

  /**
   * Validate form input
   */
  const validateForm = (): string | null => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return 'First name, last name, and email are required';
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    // Validate phone format if provided
    if (formData.phone) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.phone)) {
        return 'Please enter a valid phone number';
      }
    }

    return null;
  };

  /**
   * Handle form submission
   * Updates user information
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Update user
    const updated = updateUser(formData);
    
    if (updated) {
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Failed to update profile. Please try again.');
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="custom-card card shadow fade-in-up">
            <div className="card-body p-4">
              {/* Header with logout button */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                  }}>
                    <User color="white" size={24} />
                  </div>
                  <h2 className="card-title mb-0 page-header">My Account</h2>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>

              {/* Success alert */}
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              {/* Error alert */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Account form */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    disabled={!isEditing}
                  />
                </div>

                {/* Action buttons */}
                <div className="d-flex gap-2">
                  {!isEditing ? (
                    <button
                      type="button"
                      className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                      onClick={handleEditToggle}
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary d-flex align-items-center gap-2"
                        onClick={handleEditToggle}
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>

              {/* Account info */}
              <div className="account-info mt-4">
                <small className="text-muted">
                  <strong>Account ID:</strong> {user?.id}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}