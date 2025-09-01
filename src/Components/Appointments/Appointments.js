// Components/Appointments/Appointments.js
import React, { useState } from 'react';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorList from '../DoctorList/DoctorList';
import './Appointments.css';

const Appointments = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [showResults, setShowResults] = useState(false);

    // Sample doctors database - in a real app, this would come from an API
    const doctorsDatabase = [
        {
            name: "Dr. Sarah Johnson",
            speciality: "Cardiologist",
            experience: 8,
            ratings: "4.8★",
            profilePic: null
        },
        {
            name: "Dr. Michael Chen",
            speciality: "Dermatologist",
            experience: 12,
            ratings: "4.9★",
            profilePic: null
        },
        {
            name: "Dr. Emily Davis",
            speciality: "General Physician",
            experience: 5,
            ratings: "4.7★",
            profilePic: null
        },
        {
            name: "Dr. Robert Wilson",
            speciality: "Dentist",
            experience: 15,
            ratings: "4.6★",
            profilePic: null
        },
        {
            name: "Dr. Amanda Rodriguez",
            speciality: "Gynecologist/obstetrician",
            experience: 10,
            ratings: "4.7★",
            profilePic: null
        },
        {
            name: "Dr. James Thompson",
            speciality: "Ear-nose-throat (ent) Specialist",
            experience: 7,
            ratings: "4.6★",
            profilePic: null
        },
        {
            name: "Dr. Lisa Patel",
            speciality: "Homeopath",
            experience: 6,
            ratings: "4.5★",
            profilePic: null
        },
        {
            name: "Dr. Raj Kumar",
            speciality: "Ayurveda",
            experience: 9,
            ratings: "4.8★",
            profilePic: null
        }
    ];

    // Handle specialty selection from FindDoctorSearch
    const handleSpecialitySelect = (speciality) => {
        setSelectedSpeciality(speciality);
        
        // Filter doctors based on selected specialty
        const filtered = doctorsDatabase.filter(doctor => 
            doctor.speciality.toLowerCase().includes(speciality.toLowerCase()) ||
            speciality.toLowerCase().includes(doctor.speciality.toLowerCase())
        );
        
        setSearchResults(filtered);
        setShowResults(true);
    };

    return (
        <div className="appointments-page">
            <FindDoctorSearch onSpecialitySelect={handleSpecialitySelect} />
            
            {showResults && (
                <DoctorList 
                    doctors={searchResults} 
                    speciality={selectedSpeciality} 
                />
            )}
        </div>
    );
};

export default Appointments;
