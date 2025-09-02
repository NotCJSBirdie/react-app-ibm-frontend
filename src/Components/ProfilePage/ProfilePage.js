import React from 'react';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;
