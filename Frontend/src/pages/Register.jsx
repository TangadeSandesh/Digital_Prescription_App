import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/auth/authSlice';
import { registerUser } from '../features/auth/authAPI';
import { toast } from 'react-toastify';


export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', hospital: '', qualification: '', RegistrationNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const token = await registerUser(formData);
      dispatch(loginSuccess(token));
      toast.success('Registration successful 🎉', {
              position: 'top-center',
              autoClose: 1500,
            });
      
      // Delay navigation slightly to let user see the popup
      setTimeout(() => navigate('/'), 1600);
    } catch (err) {
      setError(err.message || 'Registration failed');
      toast.error('Registration failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-2">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 md:p-6 bg-white border rounded shadow-lg flex flex-col gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo mb-3">Register</h2>
        {error && <p className="text-red-600">{error}</p>}
        <input className="w-full border p-2 md:p-3 rounded focus:outline-indigo" type="text" name="name" placeholder="Doctor's Full Name" required value={formData.name} onChange={handleChange} />
        <input className="w-full border p-2 md:p-3 rounded focus:outline-indigo" type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <input className="w-full border p-2 md:p-3 rounded focus:outline-indigo" type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
        <input className="w-full border p-2 md:p-3 rounded focus:outline-indigo" type="text" name="hospital" placeholder="Hospital Name" required value={formData.hospital} onChange={handleChange} />
        <input className="w-full border p-2 md:p-3 rounded focus:outline-indigo" type="text" name="qualification" placeholder="Qualification" required value={formData.qualification} onChange={handleChange} />
        <input className="w-full border p-2 md:p-3 rounded focus:outline-indigo" type="text" name="RegistrationNumber" placeholder="Reg. No-24325121" value={formData.RegistrationNumber} onChange={handleChange} />
        <button disabled={loading} type="submit" className="w-full bg-saffron text-white py-2 md:py-3 rounded hover:bg-indigo disabled:opacity-50">{loading ? 'Registering...' : 'Register'}</button>
      </form>
    </div>
  );
}
