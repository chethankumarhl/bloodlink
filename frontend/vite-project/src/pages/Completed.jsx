import { useEffect, useState, useContext } from 'react';
import ApiContext from '../context/ApiContext';
import RequestCard from '../mycomponents/RequestCard';
import DonateNav from '../mycomponents/DonateNav';
import { Link } from 'react-router-dom';

const Donate = () => {
  const { getAllBloodRequests, donateToRequest } = useContext(ApiContext);
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllBloodRequests();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching requests:', err);
      }
    };
    fetchRequests();
  }, []);

  const handleDonate = async (id) => {
    try {
      const updatedRequest = await donateToRequest(id, user);
      alert('Donation successful!');
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? updatedRequest : req))
      );
    } catch (err) {
      console.error('Donation failed:', err);
    }
  };

  return (
    <div>
      <div className="my-8 px-4 text-center">
        <p className="text-lg text-red-600 font-semibold italic mb-2">
          "Be a hero, donate blood,"
        </p>
        <h1 className="text-2xl md:text-6xl font-bold text-gray-800">Requests</h1>
      </div>
      {/* Column filters */}
      <DonateNav />
      <div className="p-6">
        {requests.filter((req) => req.status === 'completed').length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-12">No requests</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests
              .filter((req) => req.status === 'completed')
              .map((req) => (
                <div 
                  key={req._id} 
                  className={req.status === 'completed' ? 'bg-green-100 border-2 border-green-300 rounded-lg p-1 relative' : ''}
                >
                  {req.status === 'completed' && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      COMPLETED
                    </div>
                  )}
                  <RequestCard
                    bloodGroup={req.bloodGroup}
                    unitsRequired={req.unitsRequired}
                    hospitalName={req.hospitalName}
                    contactNumber={req.contactNumber}
                    location={req.location}
                    urgency={req.urgency}
                    status={req.status}
                    requestedBy={req.user?.name}
                    donatedBy={req.donatedBy}
                    onDonate={() => handleDonate(req._id)}
                    currentUserName={user}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;