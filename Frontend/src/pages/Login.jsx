import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSuccess } from '../features/auth/authSlice';
import { loginUser } from '../features/auth/authAPI';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userData = await loginUser(credentials);
      console.log('response',userData)
      dispatch(loginSuccess(userData));

      toast.success('Login successful 🎉', {
        position: 'top-center',
        autoClose: 1500,
      });

      // Delay navigation slightly to let user see the popup
      setTimeout(() => navigate('/'), 1600);

    } catch (err) {
      setError(err.message || 'Login failed');
      toast.error('Login failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-2">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-4 md:p-6 bg-white border rounded shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-indigo mb-3">Login</h2>
        {error && <p className="text-red-600">{error}</p>}

        <input
          className="w-full border p-2 md:p-3 rounded focus:outline-indigo"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 md:p-3 rounded focus:outline-indigo"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={credentials.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-indiagreen text-white py-2 md:py-3 rounded hover:bg-indigo disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
          
        </button>
      </form>
    </div>
  );
}
