import React, { useState } from 'react';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);

    localStorage.removeItem(name);

    localStorage.removeItem("latestAppointment");
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);

    // Save doctor data in localStorage
    const doctorData = { name, speciality, experience, ratings, profilePic };
    localStorage.setItem('doctorData', JSON.stringify(doctorData));

    // Save appointment data in localStorage (use doctor name as key)
    localStorage.setItem(name, JSON.stringify({
      name: newAppointment.name,
      phoneNumber: newAppointment.phoneNumber,
      date: newAppointment.date,
      time: newAppointment.timeSlot,
    }));

    // Save global latest appointment for Notification UI
    localStorage.setItem(
      "latestAppointment",
      JSON.stringify({
        doctorName: name,
        speciality,
        experience,
        ratings,
        profilePic,
        patientName: newAppointment.name,
        phoneNumber: newAppointment.phoneNumber,
        date: newAppointment.date,
        time: newAppointment.timeSlot,
      })
    );
    // Optionally store patient email in sessionStorage if your app collects it
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      </div>

      {/* Doctor Card Options Container - Main booking/cancellation functionality */}
      <div className="doctor-card-options-container">
        <button 
          className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
          onClick={handleBooking}
        >
          {appointments.length > 0 ? (
            <div>Cancel Appointment</div>
          ) : (
            <div>Book Appointment</div>
          )}
          <div>No Booking Fee</div>
        </button>

        {/* Display existing appointments */}
        {appointments.length > 0 && (
          <div className="existing-appointments">
            <h4>Your Appointments:</h4>
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-info">
                  <p><strong>Patient:</strong> {appointment.name}</p>
                  <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.timeSlot}</p>
                </div>
                <button 
                  className="cancel-appointment-btn"
                  onClick={() => handleCancel(appointment.id)}
                >
                  Cancel Appointment
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
            <div className="modal-doctor-info">
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
            </div>
            {appointments.length > 0 ? (
              <div className="appointment-booked-info">
                <h3 style={{ textAlign: 'center', color: '#27ae60' }}>Appointment Booked!</h3>
                {appointments.map((appointment) => (
                  <div className="booked-info" key={appointment.id}>
                    <div className="appointment-details">
                      <p><strong>Patient Name:</strong> {appointment.name}</p>
                      <p><strong>Phone Number:</strong> {appointment.phoneNumber}</p>
                      <p><strong>Appointment Date:</strong> {appointment.date}</p>
                      <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
                    </div>
                    <button 
                      className="cancel-appointment-btn"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel Appointment
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <AppointmentForm 
                doctorName={name} 
                doctorSpeciality={speciality} 
                onSubmit={handleFormSubmit} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
