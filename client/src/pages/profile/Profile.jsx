// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      fetchUserDetails(userEmail);
    }
  }, []);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${email}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Display other user details if needed */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
