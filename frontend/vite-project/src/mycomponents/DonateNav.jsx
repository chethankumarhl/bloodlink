import { Link, useLocation } from 'react-router-dom';

const DonateNav = () => {
  const location = useLocation();

  return (
    <div className="my-4 flex justify-center gap-4 text-sm md:text-base">
      <Link
        to="/donate"
        className={`px-2 py-1 ${
          location.pathname === "/donate" ? "text-red-600 font-semibold border-b-2 border-red-600" : "text-gray-600"
        }`}
      >
        Pending
      </Link>
      <span className="text-gray-400">|</span>
      <Link
        to="/donate/donating"
        className={`px-2 py-1 ${
          location.pathname === "/donate/donating" ? "text-red-600 font-semibold border-b-2 border-red-600" : "text-gray-600"
        }`}
      >
        Donating
      </Link>
      <span className="text-gray-400">|</span>
      <Link
        to="/donate/completed"
        className={`px-2 py-1 ${
          location.pathname === "/donate/completed" ? "text-red-600 font-semibold border-b-2 border-red-600" : "text-gray-600"
        }`}
      >
        Completed
      </Link>
    </div>
  );
};

export default DonateNav;
