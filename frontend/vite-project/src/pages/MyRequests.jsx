import { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Heart, Clock, AlertCircle, ArrowLeft, Check } from 'lucide-react';
import RequestCard from '../mycomponents/RequestCard';

const MyRequests = () => {
  const { user, getMyRequests, completeMyRequest } = useApi(); // Added completeMyRequest from context
  const navigate = useNavigate();
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completingRequestId, setCompletingRequestId] = useState(null);

  // Fetch requests on component mount
  useEffect(() => {
    if (user && user._id) {
      fetchMyRequests();
    }
  }, [user]);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      
      // Get user ID from context or localStorage
      let userId = user?._id;
      
      if (!userId) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            userId = parsedUserInfo._id;
          } catch (e) {
            console.log('Could not parse userInfo');
          }
        }
      }
      
      if (!userId) {
        throw new Error('User ID not found');
      }

      // Use getMyRequests from context
      const response = await getMyRequests(userId);
      setRequests(response.data || []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch your requests');
    } finally {
      setLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate('/profile');
  };

  // Handle donate action (this won't be used for own requests, but needed for RequestCard)
  const handleDonate = (requestId) => {
    // This function won't be called for user's own requests
    console.log('Donate clicked for request:', requestId);
  };

  // Handle complete request
  const handleCompleteRequest = async (requestId) => {
    try {
      setCompletingRequestId(requestId);
      
      // Get user ID from context or localStorage
      let userId = user?._id;
      
      if (!userId) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            userId = parsedUserInfo._id;
          } catch (e) {
            console.log('Could not parse userInfo');
          }
        }
      }
      
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      await completeMyRequest(userId, requestId);
      
      // Update the request status in the local state
      setRequests(prevRequests => 
        prevRequests.map(request => 
          request._id === requestId 
            ? { ...request, status: 'completed' }
            : request
        )
      );
      
      toast.success('Request marked as completed successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to complete request');
    } finally {
      setCompletingRequestId(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Heart className="w-12 h-12 text-red-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading your requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Blood Requests</h1>
            <p className="text-gray-600">Track and manage your blood donation requests</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{requests.length}</h3>
                <p className="text-gray-600">Total Requests</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {requests.filter(req => req.status?.toLowerCase() === 'pending').length}
                </h3>
                <p className="text-gray-600">Pending Requests</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {requests.filter(req => req.status?.toLowerCase() === 'donating').length}
                </h3>
                <p className="text-gray-600">In Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Requests Yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any blood requests yet.</p>
            <button
              onClick={() => navigate('/requests')}
              className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Create Your First Request
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div key={request._id} className="relative">
                <RequestCard
                  bloodGroup={request.bloodGroup}
                  unitsRequired={request.unitsRequired}
                  hospitalName={request.hospitalName}
                  contactNumber={request.contactNumber}
                  location={request.location}
                  urgency={request.urgency}
                  status={request.status}
                  requestedBy={request.user?.name || user.name}
                  donatedBy={request.donatedBy}
                  donatedById={null}
                  onDonate={() => handleDonate(request._id)}
                  currentUserName={user.name}
                />
                
                {/* Complete Request Button - Only show for donating status */}
                {request.status?.toLowerCase() === 'donating' && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleCompleteRequest(request._id)}
                      disabled={completingRequestId === request._id}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {completingRequestId === request._id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Completing...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Mark as Completed
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;