import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RequestCard from '../mycomponents/RequestCard';
import ApiContext from '../context/ApiContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const UrgentRequests = ({ user }) => {
  const { getAllBloodRequests } = useContext(ApiContext);
  const [urgentRequests, setUrgentRequests] = useState([]);

  const handleDonate = async (requestId) => {
    // Add your donate logic here if needed
    console.log('Donate clicked for:', requestId);
  };

  useEffect(() => {
    const fetchUrgent = async () => {
      try {
        const data = await getAllBloodRequests();
        const filtered = data
          .filter(req => req.urgency?.toLowerCase() === 'high' && req.status?.toLowerCase() === 'pending')
          .slice(0, 5); // Limit to 5
        setUrgentRequests(filtered);
      } catch (err) {
        console.error('Failed to fetch urgent requests', err);
      }
    };

    fetchUrgent();
  }, [getAllBloodRequests]);

  return (
    <Card className="mt-6 p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-red-600">
          Urgent Blood Requests
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {urgentRequests.length > 0 ? (
          urgentRequests.map((req) => (
            <RequestCard
              key={req._id}
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
          ))
        ) : (
          <p className="text-gray-500">No high urgency requests at the moment.</p>
        )}
      </CardContent>

      <div className="text-right mt-4">
        <Link
          to="/donate"
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View All Requests →
        </Link>
      </div>
    </Card>
  );
};

export default UrgentRequests;
