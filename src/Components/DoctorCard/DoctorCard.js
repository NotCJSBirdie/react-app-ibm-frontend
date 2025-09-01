import React, { useState } from 'react';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBookAppointment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (appointmentData) => {
    // Add the new appointment to the list
    const newAppointment = {
      id: Date.now(), // Simple ID generation
      ...appointmentData,
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowModal(false);
    
    // You can add additional logic here like API calls
    console.log('New appointment:', newAppointment);
  };

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      appointment => appointment.id !== appointmentId
    );
    setAppointments(updatedAppointments);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={`Dr. ${name}`} />
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="46" 
              height="46" 
              fill="currentColor" 
              className="bi bi-person-fill" 
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          )}
        </div>
        
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        
        <div>
          <button 
            className={`book-appointment-btn ${appointments.length > 0 ? 'has-appointments' : ''}`}
            onClick={handleBookAppointment}
          >                    
            <div>{appointments.length > 0 ? 'View/Book Again' : 'Book Appointment'}</div>
            <div>No Booking Fee</div>
          </button>
        </div>

        {/* Display existing appointments */}
        {appointments.length > 0 && (
          <div className="existing-appointments">
            <h4>Your Appointments:</h4>
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-item">
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.timeSlot}</p>
                <p><strong>Patient:</strong> {appointment.name}</p>
                <button 
                  className="cancel-btn" 
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Appointment Form */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseModal}>×</button>
            <AppointmentForm
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
