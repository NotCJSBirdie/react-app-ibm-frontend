import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Get today's date in YYYY-MM-DD format for minimum date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!date) {
      errors.date = 'Appointment date is required';
    }
    
    if (!selectedSlot) {
      errors.selectedSlot = 'Please select a time slot';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    if (formErrors.selectedSlot) {
      setFormErrors(prev => ({ ...prev, selectedSlot: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const appointmentData = {
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        date,
        timeSlot: selectedSlot,
        doctorName,
        doctorSpeciality
      };
      
      onSubmit(appointmentData);
      
      // Reset form
      setName('');
      setPhoneNumber('');
      setDate('');
      setSelectedSlot('');
      setFormErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'date':
        setDate(value);
        break;
    }
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Book Appointment with Dr. {doctorName}</h2>
      <p className="doctor-speciality">Speciality: {doctorSpeciality}</p>
      
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Patient Name<span className="required">*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className={formErrors.name ? 'error' : ''}
          />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number<span className="required">*</span></label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder="Enter your phone number"
            className={formErrors.phoneNumber ? 'error' : ''}
          />
          {formErrors.phoneNumber && <span className="error-message">{formErrors.phoneNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Appointment Date<span className="required">*</span></label>
          <input
            type="date"
            id="date"
            value={date}
            min={getTodayDate()}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={formErrors.date ? 'error' : ''}
          />
          {formErrors.date && <span className="error-message">{formErrors.date}</span>}
        </div>

        <div className="form-group">
          <label>Select Time Slot<span className="required">*</span></label>
          <div className="time-slots-container">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                onClick={() => handleSlotSelection(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          {formErrors.selectedSlot && <span className="error-message">{formErrors.selectedSlot}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="book-now-btn">
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
