import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import useApi from '../hooks/useApi';
import { Heart } from 'lucide-react';
// import { Link } from 'react-router-dom';
function Header() {
  const { user, setUser } = useApi();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    setShowMobileMenu(false); // Close mobile menu after logout
  };

  return (
    <div className="p-3 shadow-sm">
      {/* Desktop Layout */}
      <div className="flex justify-between items-center px-5">
       <Link to="/"> <div className='flex items-center space-x-2'>
        <Heart className="w-8 h-10 text-red-600" />
         <h1 className='text-xl font-semibold'>BLOODLINK</h1>
        </div></Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <Link to="/" className="mr-5 text-gray-800 font-medium hover:text-gray-500 text-lg">Home</Link>
          <Link to="/donate" className="mr-5 text-gray-800 font-medium hover:text-gray-500 text-lg">Donate</Link>
          <Link to="/requests" className="mr-10 text-gray-800 font-medium hover:text-gray-500 text-lg">Request</Link>

          {user ? (
            <>
             <Link to="/profile"> <div className="flex items-center mr-4 bg-gray-50 rounded-lg px-3 py-2">
                <User className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div></Link>
              <Link to="/myrequests" className="mr-4">
                <p className='text-gray-700 font-medium hover:text-gray-500'>My Requests</p>
              </Link>
              <Button variant="destructive" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button variant="destructive" className="mr-2">Sign in</Button>
              </Link>
              <Link to="/login">
                <Button variant="destructive">Log in</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-col space-y-3 px-5">
            <Link 
              to="/" 
              className="text-gray-700 font-medium hover:text-gray-500 py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link 
              to="/donate" 
              className="text-gray-800 hover:text-gray-500 text-lg py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Donate
            </Link>
            <Link 
              to="/requests" 
              className="text-gray-800 hover:text-gray-500 text-lg py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Request
            </Link>
            
            {user ? (
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center mb-3 bg-gray-50 rounded-lg px-3 py-2">
                  <User className="w-4 h-4 text-gray-600 mr-2" />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </div>
                <Link to="/myrequests" onClick={() => setShowMobileMenu(false)}>
                  <p className='text-gray-700 font-medium hover:text-gray-500 py-2'>My Requests</p>
                </Link>
                <Button variant="destructive" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Link to="/register" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="destructive" className="w-full">Sign Up</Button>
                </Link>
                <Link to="/login" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="destructive" className="w-full">Log in</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;