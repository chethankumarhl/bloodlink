import React, { useState, useEffect } from 'react';
import ApiContext from './ApiContext';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Login
  // ✅ Updated Login function - store token and use consistent key
const login = async (credentials) => {
  setLoading(true);
  try {
    const res = await axios.post('/api/users/login', credentials, {
      withCredentials: true, // sets cookie
    });

    // ✅ Store the token if your API returns it
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }

    // ✅ Now fetch /me to get user details
    const me = await axios.get('/api/users/me', {
      withCredentials: true,
    });

    setUser(me.data); 
    // ✅ Use consistent key 'userInfo' instead of 'user'
    localStorage.setItem("userInfo", JSON.stringify(me.data)); // Changed from 'user' to 'userInfo'
    return me.data;
  } catch (err) {
    console.log(err.response?.data || err.message); ;
  } finally {
    setLoading(false);
  }
};

  // ✅ Register
  const register = async (userInfo) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/users/register', userInfo, {
        withCredentials: true,
      });

      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Updated logout function to clear localStorage
const logout = async () => {
  try {
    await axios.post('/api/users/logout', {}, { withCredentials: true });
  } catch (err) {
    console.error('Logout failed:', err);
  } finally {
    // Clear localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear old key too
    
    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=");
      const name = eqPos > -1 ? c.substr(0, eqPos) : c;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
    });
    
    setUser(null);
  }
};

const getMyRequests = async (userId) => {
  try {
    // Use cookie-based authentication since you don't have separate token
    const response = await axios.get(`/api/requests/myrequests/${userId}`, {
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching my requests:', error);
    throw error.response?.data || error;
  }
};

// API function to complete a user's request
const completeMyRequest = async (userId, requestId) => {
  try {
    const response = await axios.put(
      `/api/requests/myrequests/${userId}/complete/${requestId}`, // This should match your route
      {}, // Empty body since we're just updating status
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error completing request:', error);
    throw error.response?.data || error;
  }
};
  // ✅ Fetch authenticated user from cookie token
  const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/users/profile', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true, // important to include cookies
});
    return res.data;
  };
  // ✅ Fetch user info by ID
const getUserInfo = async (userId) => {
  try {
    const res = await axios.get(`/api/users/userProfile/${userId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // If your controller returns { success: true, data: {...} }
    return res.data.data || res.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Failed to fetch user information';
    console.error('getUserInfo error:', errorMessage);
    
    // You might want to throw a more specific error
    throw new Error(errorMessage);
  }
};
//update password
const updatePassword = async ({ email, contactNumber, newPassword }) => {
  const res = await axios.put(
    '/api/users/update-password',
    { email, contactNumber, newPassword },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Optional
    }
  );
  return res.data;
};

//update profile
const updateUserProfile = async (updatedUserData) => {
  setLoading(true); // If using global loading
  try {
    const res = await axios.put('/api/users/profile', updatedUserData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Update user in context and localStorage
    setUser(res.data);
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    
    return res.data;
  } catch (err) {
    console.error(err.response?.data?.message || 'Failed to update profile'); // If using global error
    throw err;
  } finally {
    setLoading(false); // If using global loading
  }
};
const getAllBloodRequests = async () => {
  try {
    const res = await axios.get('/api/requests/', {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('Failed to fetch blood requests:', err);
    throw err;
  }
};
const donateToRequest = async (id, userName, userId) => {
  try {
    const res = await axios.patch(`/api/requests/${id}/donate`, { userName, userId },);
    return res.data;
  } catch (error) {
    console.error("Failed to donate:", error);
    throw error;
  }
};
//create request 
const createRequest = async (formData) => {
  try {
    const res = await axios.post('/api/requests', formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('Failed to create blood request:', err);
    throw err;
  }
};
  const fetchMyRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/requests/', { withCredentials: true });
      setMyRequests(res.data);
    } catch (err) {
      console.error('Fetch my requests error:', err);
    } finally {
      setLoading(false);
    }
  };
  // ✅ Updated fetchUser function - check for cookie-based auth first
const fetchUser = async () => {
  setLoading(true);
  
  try {
    // First check if we have stored user info and set it immediately to prevent UI flicker
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const parsedUser = JSON.parse(storedUserInfo);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user info:', error);
        localStorage.removeItem('userInfo');
      }
    }
    
    // Since you're using cookie-based auth, try to fetch user profile
    // This will work if the cookie is still valid
    const res = await axios.get('/api/users/me', { // Use /me endpoint like in login
      withCredentials: true,
    });
    
    // Update with fresh data from server
    setUser(res.data);
    // Also update localStorage with fresh data
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
    
    // If API call fails, clear everything and logout
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token'); // Clean up token if it exists
    setUser(null);
  } finally {
    setLoading(false);
  }
};
  // ✅ Run only once on load
  useEffect(() => {
    fetchUser(); // try to get user from cookie
  }, []);

  return (
    <ApiContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loading,
        getAllBloodRequests,
        donateToRequest,
        updateUserProfile,
        createRequest,
        getUserProfile,
        fetchMyRequests,
        getUserInfo,
        myRequests,
        updatePassword,
        getMyRequests,
        completeMyRequest,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
