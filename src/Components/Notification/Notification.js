import React, { useEffect, useState } from 'react';
import './Notification.css';

// Notification component for global appointment display
const Notification = ({ children }) => {
  // State to control notification display
  const [showNotification, setShowNotification] = useState(false);

  // State variables for appointment details
  const [username, setUsername] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  useEffect(() => {
    // Pull latest appointment info from localStorage
    const latestAppointment = JSON.parse(localStorage.getItem('latestAppointment'));
    if (latestAppointment) {
      setShowNotification(true);
      setUsername(latestAppointment.patientName);
      setDoctorName(latestAppointment.doctorName);
      setAppointmentDate(latestAppointment.date);
      setAppointmentTime(latestAppointment.time);
    }
  }, []);

  useEffect(() => {
    // Listen for storage changes (such as cancellation)
    const onStorageChange = () => {
      const latestAppointment = JSON.parse(localStorage.getItem('latestAppointment'));
      if (latestAppointment) {
        setShowNotification(true);
        setUsername(latestAppointment.patientName);
        setDoctorName(latestAppointment.doctorName);
        setAppointmentDate(latestAppointment.date);
        setAppointmentTime(latestAppointment.time);
      } else {
        setShowNotification(false);
      }
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  const handleCancel = () => {
    localStorage.removeItem('latestAppointment');
    setShowNotification(false);
  };

  return (
    <div>
      {/* Notification UI - top right, not a modal */}
      {showNotification && (
        <div className="notification-container">
          <h3>Appointment Notification</h3>
          <p><strong>User:</strong> {username}</p>
          <p><strong>Doctor:</strong> {doctorName}</p>
          <p><strong>Date:</strong> {appointmentDate}</p>
          <p><strong>Time:</strong> {appointmentTime}</p>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel Appointment
          </button>
        </div>
      )}
      {/* Always render children (routed pages) below notification */}
      {children}
    </div>
  );
};

export default Notification;
