// Components/BookingConsultation/BookingConsultation.js
import React, { useState } from 'react';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';
import './BookingConsultation.css';

const BookingConsultation = () => {
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
        <div className="booking-consultation">
            {/* Search Section */}
            <div className="search-section">
                <FindDoctorSearch onSpecialitySelect={handleSpecialitySelect} />
            </div>

            {/* Results Section */}
            {showResults && (
                <div className="results-section">
                    {searchResults.length > 0 ? (
                        <>
                            <div className="results-header">
                                <h2>Available {selectedSpeciality} Doctors ({searchResults.length} found)</h2>
                                <p>Book appointments with qualified doctors in your area</p>
                            </div>
                            <div className="doctors-grid">
                                {searchResults.map((doctor, index) => (
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
                        </>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-content">
                                <i className="fa fa-search" style={{fontSize: '48px', color: '#ccc', marginBottom: '20px'}}></i>
                                <h3>No doctors found</h3>
                                <p>Sorry, we couldn't find any doctors for "{selectedSpeciality}"</p>
                                <p>Please try searching for a different specialty or check your spelling.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Welcome Section - shown when no search has been performed */}
            {!showResults && (
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h2>Find & Book Appointments with Top Doctors</h2>
                        <div className="features">
                            <div className="feature-item">
                                <i className="fa fa-search" style={{fontSize: '24px', color: '#3498db'}}></i>
                                <h4>Easy Search</h4>
                                <p>Search for doctors by specialty and location</p>
                            </div>
                            <div className="feature-item">
                                <i className="fa fa-calendar" style={{fontSize: '24px', color: '#27ae60'}}></i>
                                <h4>Instant Booking</h4>
                                <p>Book appointments instantly with no booking fees</p>
                            </div>
                            <div className="feature-item">
                                <i className="fa fa-star" style={{fontSize: '24px', color: '#f39c12'}}></i>
                                <h4>Verified Doctors</h4>
                                <p>All doctors are verified and highly rated</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingConsultation;
