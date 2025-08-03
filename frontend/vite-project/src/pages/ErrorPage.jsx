import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
          <div className="text-6xl font-bold text-red-500 mb-2">
            Oops!
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-black mb-3">
          Something went wrong
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          We're sorry, but something unexpected happened. Please try again or return to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleGoHome}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Home size={18} className="mr-2" />
            Go to Homepage
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              onClick={handleGoBack}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft size={16} className="mr-1" />
              Go Back
            </Button>

            <Button 
              variant="outline"
              onClick={handleRefresh}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <RefreshCw size={16} className="mr-1" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team or try again later.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            BloodLink - Connecting donors, saving lives
          </p>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;