import React, { useState } from 'react';
import './Sign_Up.css';

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Phone validation - exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(true);
    
    if (validateForm()) {
      // Handle successful form submission
      alert('Sign up successful!');
      console.log('Form submitted:', formData);
      // Reset form or redirect
    }
  };

  const handleReset = () => {
    setFormData({
      role: '',
      name: '',
      phone: '',
      email: '',
      password: ''
    });
    setErrors({});
    setShowError(false);
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? <span><a href="/login" style={{ color: '#2190FF' }}> Login</a></span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select 
                name="role" 
                id="role" 
                value={formData.role}
                onChange={handleInputChange}
                required 
                className="form-control"
              >
                <option value="">Select your role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              {showError && errors.role && <span className="error">{errors.role}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                className="form-control" 
                placeholder="Enter your name" 
                aria-describedby="helpId" 
              />
              {showError && errors.name && <span className="error">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
                className="form-control" 
                placeholder="Enter your phone number" 
                aria-describedby="helpId" 
              />
              {showError && errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="form-control" 
                placeholder="Enter your email" 
                aria-describedby="helpId" 
              />
              {showError && errors.email && <span className="error">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                value={formData.password}
                onChange={handleInputChange}
                required 
                className="form-control" 
                placeholder="Enter your password" 
                aria-describedby="helpId" 
              />
              {showError && errors.password && <span className="error">{errors.password}</span>}
            </div>
            
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
              <button type="button" onClick={handleReset} className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
