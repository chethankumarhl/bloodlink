import heroImg from '../assets/corousel/blood1.jpg';
import { Link } from 'react-router-dom';
import { HeartHandshake, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6 py-16 bg-white">
      {/* Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={heroImg}
          alt="Donate Blood Hero"
          className="w-full max-w-md lg:max-w-lg"
        />
      </div>

      {/* Text Content */}
      <div className="flex-1 max-w-xl">
        <div className="mb-4 flex items-center gap-2 text-sm text-red-600 font-semibold uppercase">
          <HeartHandshake className="h-5 w-5" />
          Donate Blood, Save Lives
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight mb-6">
          One Pint Can Save Three Lives
        </h1>

        <p className="text-gray-600 text-base leading-relaxed mb-8">
          Your simple act of donating blood can become someone’s second chance at life.
          Join our mission to make a difference — be the reason for someone’s heartbeat.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-sm text-gray-700">
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span>
              Boosts red blood cell count
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span>
              Promotes cardiovascular health
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span>
              Free health checkup
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span>
              Improves mental wellness
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span>
              Refreshes your body
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span>
              Every drop counts!
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/donate"
          className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow transition-all"
        >
          Become a Lifesaver
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
