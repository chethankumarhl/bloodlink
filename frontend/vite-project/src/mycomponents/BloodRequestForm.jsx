'use client';
import { useState, useContext } from 'react';
import ApiContext from '../context/ApiContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const BloodRequestForm = () => {
  const { createRequest } = useContext(ApiContext);
  const [formData, setFormData] = useState({
    bloodGroup: '',
    unitsRequired: '',
    hospitalName: '',
    contactNumber: '',
    location: '',
    urgency: 'normal',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createRequest(formData);
      window.location.href = '/requests'; // Full reload redirect
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Blood</h1>
          <p className="text-gray-600">Help us connect you with potential donors</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100"
        >
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Blood Group</Label>
            <Select
              value={formData.bloodGroup}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, bloodGroup: val }))
              }
            >
              <SelectTrigger className="h-12 border-2 border-gray-200 rounded-lg focus:border-red-500 transition-colors">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
                  <SelectItem key={type} value={type} className="h-10">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Units Required</Label>
            <Input
              name="unitsRequired"
              value={formData.unitsRequired}
              onChange={handleChange}
              type="number"
              placeholder="Enter number of units"
              className="h-12 border-2 border-gray-200 rounded-lg focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Hospital Name</Label>
            <Input
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="h-12 border-2 border-gray-200 rounded-lg focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Contact Number</Label>
            <Input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="h-12 border-2 border-gray-200 rounded-lg focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Location</Label>
            <Textarea
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter hospital address or location details"
              className="min-h-[100px] border-2 border-gray-200 rounded-lg focus:border-red-500 transition-colors resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Urgency Level</Label>
            <Select
              value={formData.urgency}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, urgency: val }))
              }
            >
              <SelectTrigger className="h-12 border-2 border-gray-200 rounded-lg focus:border-red-500 transition-colors">
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal" className="h-10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Normal
                  </div>
                </SelectItem>
                <SelectItem value="high" className="h-10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    High
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting Request...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Submit Request
              </div>
            )}
          </Button>

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              Your request will be visible to registered donors in your area
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodRequestForm;