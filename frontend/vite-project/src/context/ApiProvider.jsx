import React, { useState, useEffect } from 'react';
import ApiContext from './ApiContext';
import axios from '../axios'; // ✅ Using your custom axios instance with interceptors
import { useNavigate } from 'react-router-dom';

const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Simplified Login - interceptors handle the token automatically
  const login = async (credentials) => {
    setLoading(true);
    try {
      console.log('Attempting login with:', credentials);
      
      const res = await axios.post('/api/users/login', credentials);
      console.log('Login response:', res.data);

      // ✅ Store the token from response
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        console.log('Token stored:', res.data.token);
      }

      // ✅ Now fetch /me - token will be added automatically by interceptor
      const me = await axios.get('/api/users/me');
      
      console.log('User fetched from /me:', me.data);
      setUser(me.data);
      localStorage.setItem("userInfo", JSON.stringify(me.data));
      
      return me.data;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register
  const register = async (userInfo) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/users/register', userInfo);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post('/api/users/logout');
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

  // ✅ Simplified - interceptors handle auth
  const getMyRequests = async (userId) => {
    try {
      const response = await axios.get(`/api/requests/myrequests/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching my requests:', error);
      throw error.response?.data || error;
    }
  };

  // ✅ Complete request
  const completeMyRequest = async (userId, requestId) => {
    try {
      const response = await axios.put(
        `/api/requests/myrequests/${userId}/complete/${requestId}`,
        {} // Empty body since we're just updating status
      );
      return response.data;
    } catch (error) {
      console.error('Error completing request:', error);
      throw error.response?.data || error;
    }
  };

  // ✅ Get user profile
  const getUserProfile = async () => {
    try {
      const res = await axios.get('/api/users/profile');
      return res.data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  };

  // ✅ Get user info by ID
  const getUserInfo = async (userId) => {
    try {
      const res = await axios.get(`/api/users/userProfile/${userId}`);
      return res.data.data || res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch user information';
      console.error('getUserInfo error:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  // ✅ Update password
  const updatePassword = async ({ email, contactNumber, newPassword }) => {
    try {
      const res = await axios.put('/api/users/update-password', {
        email,
        contactNumber,
        newPassword
      });
      return res.data;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };

  // ✅ Update profile
  const updateUserProfile = async (updatedUserData) => {
    setLoading(true);
    try {
      const res = await axios.put('/api/users/profile', updatedUserData);
      
      // Update user in context and localStorage
      setUser(res.data);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get all blood requests
  const getAllBloodRequests = async () => {
    try {
      const res = await axios.get('/api/requests/');
      return res.data;
    } catch (err) {
      console.error('Failed to fetch blood requests:', err);
      throw err;
    }
  };

  // ✅ Donate to request
  const donateToRequest = async (id, userName, userId) => {
    try {
      const res = await axios.patch(`/api/requests/${id}/donate`, {
        userName,
        userId
      });
      return res.data;
    } catch (error) {
      console.error("Failed to donate:", error);
      throw error;
    }
  };

  // ✅ Create request
  const createRequest = async (formData) => {
    try {
      const res = await axios.post('/api/requests', formData);
      return res.data;
    } catch (err) {
      console.error('Failed to create blood request:', err);
      throw err;
    }
  };

  // ✅ Fetch my requests
  const fetchMyRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/requests/');
      setMyRequests(res.data);
    } catch (err) {
      console.error('Fetch my requests error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Simplified fetchUser - interceptors handle auth
  const fetchUser = async () => {
    setLoading(true);
    
    try {
      // First check if we have stored user info and token
      const storedUserInfo = localStorage.getItem('userInfo');
      const storedToken = localStorage.getItem('token');
      
      if (storedUserInfo && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUserInfo);
          setUser(parsedUser);
          console.log('User loaded from localStorage:', parsedUser);
        } catch (error) {
          console.error('Error parsing stored user info:', error);
          localStorage.removeItem('userInfo');
          localStorage.removeItem('token');
        }
      }
      
      // If we have a token, try to fetch fresh user data
      // Token will be automatically added by the interceptor
      if (storedToken) {
        const res = await axios.get('/api/users/me');
        
        console.log('Fresh user data from /me:', res.data);
        setUser(res.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data));
      }
      
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      
      // If API call fails, clear everything and let interceptor handle it
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run only once on load
  useEffect(() => {
    fetchUser();
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