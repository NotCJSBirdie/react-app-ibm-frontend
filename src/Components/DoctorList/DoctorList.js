// Components/DoctorList/DoctorList.js
import React from 'react';
import DoctorCard from '../DoctorCard/DoctorCard';
import './DoctorList.css';

const DoctorList = ({ doctors, speciality }) => {
    if (!doctors || doctors.length === 0) {
        return (
            <div className="no-doctors">
                <p>No doctors found for the selected specialty.</p>
                <p>Please try searching for a different specialty.</p>
            </div>
        );
    }

    return (
        <div className="doctor-list-container">
            <h2>Available {speciality} Doctors</h2>
            <div className="doctors-grid">
                {doctors.map((doctor, index) => (
                    <DoctorCard
                        key={index}
                        name={doctor.name}
                        speciality={doctor.speciality}
                        experience={doctor.experience}
                        ratings={doctor.ratings}
                        profilePic={doctor.profilePic}
                    />
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
