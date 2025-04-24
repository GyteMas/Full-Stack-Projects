import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../contexts/useAuth';
import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, data, { withCredentials: true });
      if (res.data.status === 'success') {
        await login({ email: data.email, password: data.password });
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError('general', { type: 'manual', message: err.response.data.message });
      } else {
        setError('general', { type: 'manual', message: 'Signup failed. Please try again.' });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-purple-500 p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
        <input {...register("name", { required: "Name is required" })} placeholder="Name" className="w-full p-2 border rounded mb-2  text-white autofill:transition-colors autofill:duration-[999999999s]" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input {...register("email", { required: "Email is required" })} placeholder="Email" className="w-full p-2 border rounded mb-2  text-white autofill:transition-colors autofill:duration-[999999999s]" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("password", { required: "Password is required" })} type="password" placeholder="Password" className="w-full p-2 border rounded mb-2  text-white" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input {...register("passwordconfirm", { required: "Confirm password is required" })} type="password" placeholder="Confirm Password" className="w-full p-2 border rounded mb-2  text-white" />
        {errors.passwordconfirm && <p className="text-red-500 text-sm">{errors.passwordconfirm.message}</p>}

        <button type="submit" className="w-full bg-purple-800 text-white p-2 rounded">Sign Up</button>
      </form>
      {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general.message}</p>}
    </div>
  );
};

export default Signup;
