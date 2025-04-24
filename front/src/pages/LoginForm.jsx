import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../contexts/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData);
       navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-purple-500 p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded mb-2  text-white autofill:transition-colors autofill:duration-[999999999s]" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded mb-2 text-white" />
        <button type="submit" className="w-full bg-purple-800 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
