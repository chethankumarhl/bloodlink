import { useState } from 'react';
import { useApi } from '../context/ApiContext';import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { updatePassword } = useApi();
  const [formData, setFormData] = useState({
    email: '',
    contactNumber: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(formData);
      toast.success('Password updated successfully');
      setFormData({ email: '', contactNumber: '', newPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Enter your mobile number"
          className="w-full p-2 border rounded"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          className="w-full p-2 border rounded"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
