import { Button } from "../components/ui/button";
import { Heart, MapPin, Phone, Building, Clock, User, Droplets, CheckCircle, Plus } from 'lucide-react';
import { Link } from "react-router-dom";

const RequestCard = ({
    bloodGroup,
    unitsRequired,
    hospitalName,
    contactNumber,
    location,
    urgency,
    status,
    requestedBy,
    donatedBy,
    donatedById, // Add this prop to get the donor's ID
    onDonate,
    currentUserName
}) => {
    const getUrgencyStyle = (urgency) => {
        switch (urgency?.toLowerCase()) {
            case 'critical':
                return 'bg-red-600 text-white border-red-600 animate-pulse shadow-red-200 shadow-lg';
            case 'high':
                return 'bg-red-500 text-white border-red-500';
            case 'medium':
                return 'bg-red-400 text-white border-red-400';
            case 'low':
                return 'bg-red-300 text-white border-red-300';
            default:
                return 'bg-gray-400 text-white border-gray-400';
        }
    };

    const getBloodGroupStyle = (bloodGroup) => {
        return 'bg-red-600 border-4 border-red-200 shadow-red-100 shadow-lg';
    };

    const isOwnRequest = requestedBy === currentUserName;
    const isDonated = !!donatedBy;
    // console.log("donor id", donatedById);
    return (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-red-50 p-6 hover:shadow-xl hover:border-red-100 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            {/* Medical Cross Pattern */}
            <div className="absolute top-4 right-4 opacity-5">
                <Plus className="w-16 h-16 text-red-600" />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    {/* Blood Group Circle */}
                    <div className={`w-16 h-16 rounded-full ${getBloodGroupStyle(bloodGroup)} flex items-center justify-center text-white font-bold text-xl transform hover:scale-110 transition-transform duration-200`}>
                        {bloodGroup}
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">Blood Request</h3>
                        <div className="flex items-center text-red-600">
                            <Droplets className="w-4 h-4 mr-2" />
                            <span className="font-medium">{unitsRequired} units needed</span>
                        </div>
                    </div>
                </div>

                {/* Urgency Badge */}
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getUrgencyStyle(urgency)}`}>
                    {urgency}
                </span>
            </div>

            {/* Hospital Information */}
            <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <Building className="w-5 h-5 text-red-600" />
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Hospital</p>
                        <p className="font-semibold text-gray-900">{hospitalName}</p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Location</p>
                        <p className="font-semibold text-gray-900">{location}</p>
                    </div>
                </div>
            </div>

            {/* Contact & Requester Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <Phone className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Contact</p>
                            <p className="font-semibold text-gray-900">{contactNumber}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Requested by</p>
                            <p className="font-semibold text-gray-900">
                                {isOwnRequest ? `You (${currentUserName})` : requestedBy}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status & Action Section */}
            {isDonated ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                        <p className="text-green-800 font-semibold">Donation Confirmed</p>
                        <Link to={`/userprofile/${donatedById}`}>
                            <p className="text-green-700 text-sm hover:text-green-800 hover:underline cursor-pointer">
                                Donor: <span className="font-medium">{donatedBy}</span>
                            </p>
                        </Link>
                    </div>
                </div>
            ) : isOwnRequest ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                        <p className="text-blue-800 font-semibold">Your Request</p>
                        <p className="text-blue-700 text-sm">Awaiting donor response</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Response needed</span>
                    </div>
                    <Button 
                        variant="destructive" 
                        onClick={onDonate}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                    >
                        <Heart className="w-4 h-4" />
                        <span>Donate</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default RequestCard;