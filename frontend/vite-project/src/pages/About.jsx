import React from 'react';
import { Heart, Users, Clock, Shield, Target, Droplets, Plus, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
const AboutUs = () => {
  const stats = [
    { number: "1", label: "Life Saved Every 3 Seconds", icon: Clock },
    { number: "3", label: "Lives Saved Per Donation", icon: Heart },
    { number: "37%", label: "Of Population Eligible to Donate", icon: Users },
    { number: "1 in 7", label: "People Need Blood in Hospital", icon: Plus }
  ];

  const whyImportant = [
    {
      title: "Emergency Situations",
      description: "Accidents, surgeries, and medical emergencies require immediate blood supply.",
      icon: Plus
    },
    {
      title: "Cancer Patients",
      description: "Patients fighting cancer often need regular blood transfusions during treatment.",
      icon: Shield
    },
    {
      title: "Chronic Diseases",
      description: "People with conditions like anemia require ongoing blood support.",
      icon: Heart
    },
    {
      title: "Surgical Procedures",
      description: "Major operations depend on adequate blood reserves being available.",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-5xl font-bold mb-6">About BloodLink</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            "Be the bridge between life and hope. Every drop counts, every donor matters."
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Connecting Hearts, Saving Lives</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                BloodLink exists to bridge the gap between generous donors and those in urgent need of blood. 
                We believe that every person deserves access to life-saving blood when they need it most.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our platform makes it simple, safe, and efficient to connect donors with recipients, 
                ensuring that no life is lost due to blood shortage.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Our Goal</h4>
                  <p className="text-gray-600">Zero blood shortage</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Connect donors instantly</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Ensure safe blood supply</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Save lives every day</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Impact of Blood Donation</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every blood donation has the power to save multiple lives. Here's why your contribution matters.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center bg-red-50 rounded-2xl p-8 hover:bg-red-100 transition-colors duration-300">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Blood Donation is Important */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Blood Donation Matters</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Blood cannot be manufactured. It can only come from generous donors like you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyImportant.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Connect */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How BloodLink Works</h2>
            <p className="text-gray-600 text-lg">Simple steps to save lives</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Register</h3>
              <p className="text-gray-600 leading-relaxed">
                Join our community of life-savers. Register as a donor or someone in need of blood.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HandHeart className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform instantly matches donors with recipients based on blood type and location.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Save Lives</h3>
              <p className="text-gray-600 leading-relaxed">
                Every successful connection means lives saved and families kept together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Droplets className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Join thousands of heroes who have already saved lives through BloodLink. 
            Your donation could be the difference between life and death for someone today.
          </p>
          <div className="space-x-4">
           <Link to="/donate"> <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
              Become a Donor
            </button></Link>
            <Link to="/requests"><button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200">
              Request Blood
            </button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;