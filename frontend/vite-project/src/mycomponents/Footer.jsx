// import { Link } from 'react-router-dom';
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
    // setShowMobileMenu(false); // Close mobile menu after logout
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
                <a href="/request" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <span>Request Blood</span>
                </a>
              </li>
              <li>
                <a href="/donate" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <span>Donate Blood</span>
                </a>
              </li>
              <li>
                <a href="/myrequets" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <span>My Blood Requests</span>
                </a>
              </li>
              <li>
                <a href="/mydonations" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <span>My Donations</span>
                </a>
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
                <a href="/register" className="text-red-100 hover:text-white transition-colors duration-200">
                  Register as New User
                </a>
              </li>
              <li>
                <a href="/login" className="text-red-100 hover:text-white transition-colors duration-200">
                  Login
                </a>
              </li>
              <li>
                <a onClick={handleLogout} className="text-red-100 hover:text-white transition-colors duration-200">
                  Logout
                </a>
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
                <a href="/about" className="text-red-100 hover:text-white transition-colors duration-200">
                  About Us
                </a>
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