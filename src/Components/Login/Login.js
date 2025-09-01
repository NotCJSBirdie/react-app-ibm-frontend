// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
import './Login.css'; // Apply CSS according to your design theme or the CSS provided in week 2 lab 2
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [showerr, setShowerr] = useState(''); // State to show error messages
  
  // Get navigation function from react-router-dom
  const navigate = useNavigate();
  
  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setShowerr('');
    
    // Client-side validation
    if (!email || !password) {
      setShowerr('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setShowerr('Please enter a valid email address');
      return;
    }

    try {
      // Send a POST request to the login API endpoint
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      
      // Parse the response JSON
      const json = await res.json();
      
      if (json.authtoken) {
        // If authentication token is received, store it in session storage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);
        
        // Store additional user info if provided by backend
        if (json.name) {
          sessionStorage.setItem('name', json.name);
        }
        if (json.phone) {
          sessionStorage.setItem('phone', json.phone);
        }
        
        // Redirect to home page and reload the window
        navigate('/');
        window.location.reload();
      } else {
        // Handle errors if authentication fails
        if (json.errors) {
          for (const error of json.errors) {
            setShowerr(error.msg);
          }
        } else {
          setShowerr(json.error || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setShowerr('Login failed. Please check your connection and try again.');
    }
  };

  // Handle reset functionality
  const handleReset = () => {
    setEmail('');
    setPassword('');
    setShowerr('');
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member? 
            <span>
              <Link to="/signup" style={{ color: '#2190FF' }}>
                {' '}Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                {/* Input field for email */}
                <input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  aria-describedby="helpId"
                  required 
                />
              </div>
              
              {/* Input field for password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                  required
                />
              </div>
              
              {/* Display error messages */}
              {showerr && <div className="err" style={{ color: 'red', marginBottom: '10px' }}>{showerr}</div>}
              
              <div className="btn-group">
                {/* Login button */}
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                  Login
                </button>
                <button type="button" onClick={handleReset} className="btn btn-danger mb-2 waves-effect waves-light">
                  Reset
                </button>
              </div>
              <br />
              <div className="login-text">
                Forgot Password?
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
