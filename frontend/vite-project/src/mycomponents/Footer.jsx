import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

import { Heart, Droplets, Users, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const { user, setUser } = useApi();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <footer className="bg-red-600 text-white mt-2">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Blood Services */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Droplets className="w-5 h-5" />
                            <h3 className="text-lg font-semibold">Blood Services</h3>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/request" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                                    <span>Request Blood</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/donate" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                                    <span>Donate Blood</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/myrequets" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                                    <span>My Blood Requests</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/mydonations" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                                    <span>My Donations</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Users className="w-5 h-5" />
                            <h3 className="text-lg font-semibold">Account</h3>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/register" className="text-red-100 hover:text-white transition-colors duration-200">
                                    Register as New User
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-red-100 hover:text-white transition-colors duration-200">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    className="text-red-100 hover:text-white transition-colors duration-200 text-left bg-transparent border-none cursor-pointer"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Info className="w-5 h-5" />
                            <h3 className="text-lg font-semibold">Company</h3>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-red-100 hover:text-white transition-colors duration-200">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <Heart className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold">BLOOD<span className="text-red-200">LINK</span></h3>
                        </div>
                        <p className="text-red-100 leading-relaxed mb-4">
                            "Be the reason someone lives today. Donate blood. Save a life."
                        </p>
                        <div className="bg-red-700 rounded-lg p-4">
                            <p className="text-sm text-red-100">
                                Connecting donors with those in need across the community.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-red-500">
                    <div className="text-center">
                        <p className="text-red-100 text-sm">
                            &copy; {new Date().getFullYear()} BloodLink | Helping people in need of blood. All rights reserved.
                        </p>
                        <p className="text-red-200 text-xs mt-2">
                            Every donation matters. Every life is precious.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;