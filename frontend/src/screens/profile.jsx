import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get('/users/profile');
                setProfileData(response.data.user);
            } catch (err) {
                setError('Failed to load profile');
                console.error(err);
            }
        };

        fetchProfile();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 font-poppins text-gray-700 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Profile</h2>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                {profileData ? (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <span className="w-1/3 text-gray-600 font-medium">First Name:</span>
                            <span className="w-2/3 p-3 bg-gray-50 rounded-lg">{profileData.firstName}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="w-1/3 text-gray-600 font-medium">Last Name:</span>
                            <span className="w-2/3 p-3 bg-gray-50 rounded-lg">{profileData.lastName}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="w-1/3 text-gray-600 font-medium">Email:</span>
                            <span className="w-2/3 p-3 bg-gray-50 rounded-lg">{profileData.email}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="w-1/3 text-gray-600 font-medium">Mobile:</span>
                            <span className="w-2/3 p-3 bg-gray-50 rounded-lg">{profileData.mobile}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="w-1/3 text-gray-600 font-medium">Date of Birth:</span>
                            <span className="w-2/3 p-3 bg-gray-50 rounded-lg">
                                {new Date(profileData.dob).toLocaleDateString()}
                            </span>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full p-3 mt-6 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;