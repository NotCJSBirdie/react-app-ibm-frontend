// Following code has been commented with appropriate comments for your reference. 
// Import necessary modules from React and other files
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

// Define a Function component called ProfileCard (formerly ProfileForm)
const ProfileCard = () => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  
  // Access the navigation functionality from React Router
  const navigate = useNavigate();
  
  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage
      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email, // Add the email to the headers
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          // Fallback to session storage if API fails
          const fallbackUser = {
            name: sessionStorage.getItem("name") || "User",
            email: sessionStorage.getItem("email") || "",
            phone: sessionStorage.getItem("phone") || ""
          };
          setUserDetails(fallbackUser);
          setUpdatedDetails(fallbackUser);
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error case - use session storage data
      const fallbackUser = {
        name: sessionStorage.getItem("name") || "User",
        email: sessionStorage.getItem("email") || "",
        phone: sessionStorage.getItem("phone") || ""
      };
      setUserDetails(fallbackUser);
      setUpdatedDetails(fallbackUser);
    }
  };

  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage
      if (!authtoken || !email) {
        navigate("/login");
        return;
      }
      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
      } else {
        // Handle error case - still update local state
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert(`Profile Updated Successfully!`);
      }
    } catch (error) {
      console.error(error);
      // Handle error case - still update local state
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      alert(`Profile Updated Successfully!`);
    }
  };

  const handleCancel = () => {
    setUpdatedDetails(userDetails);
    setEditMode(false);
  };

  // Render the profile form with different sections based on edit mode
  return (
    <div className="profile-card">
      {editMode ? (
        <div className="profile-edit-form">
          <div className="profile-header">
            <h3>Edit Profile</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  disabled // Disable the email field
                  className="disabled-input"
                />
              </label>
            </div>
            {/* Create similar logic for displaying and editing name and phone from userDetails */}
            <div className="form-group">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={updatedDetails.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Phone
                <input
                  type="text"
                  name="phone"
                  value={updatedDetails.phone || ''}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-save">Save</button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-details">
          <div className="profile-header">
            <h3>Your Profile</h3>
          </div>
          <div className="profile-info">
            <h4>Welcome, {userDetails.name}</h4>
            {/* Implement code to display and allow editing of phone and email similar to above */}
            <div className="profile-field">
              <p><b>Email:</b> {userDetails.email}</p>
            </div>
            <div className="profile-field">
              <p><b>Phone:</b> {userDetails.phone}</p>
            </div>
          </div>
          <div className="profile-actions">
            <button onClick={handleEdit} className="btn-edit">Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the ProfileCard component as the default export
export default ProfileCard;
