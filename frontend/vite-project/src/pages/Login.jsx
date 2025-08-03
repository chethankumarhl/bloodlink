import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'; // from shadcn
import { useApi } from '../context/ApiContext'; // ✅ from ApiContext (not ApiProvider)
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useApi(); // ✅ pulling login from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setShowRegister(false);

    try {
      await login({ email, password });
      navigate('/'); // ✅ successful login
    } catch (error) {
      const msg = error?.response?.data?.message || '';
      
      // Only check for user not found in error messages, not status codes
      if (msg.toLowerCase().includes('user not found') ||
          msg.toLowerCase().includes('email not found') ||
          msg.toLowerCase().includes('account not found') ||
          msg.toLowerCase().includes('no user found')) {
        setErrorMessage('User not available, please create an account.');
        setShowRegister(true);
      } else if (msg) {
        // Show the actual error message from backend (like "incorrect password")
        setErrorMessage(msg);
      } else {
        setErrorMessage('Something went wrong during login.Check your credentials and try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-black placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-black placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Link to="/updatepassword"><p className='text-red-600'>Forgot Password...</p></Link>
            </div>
            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </Button>
<div>
              <Link to="/register"><p className='text-red-600 text-center'>Not a user Register..</p></Link>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm text-center font-medium">
                  {errorMessage}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Register Section */}
        {showRegister && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Don't have an account yet?</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/register')}
              className="border-red-500 text-red-500 hover:bg-red-50 font-medium px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Create Account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;