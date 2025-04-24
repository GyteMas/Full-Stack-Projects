
import { Link } from 'react-router-dom';
import useAuth from '../contexts/useAuth';
import pic from '../assets/OIP.jpg';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-center bg-purple-100 m-0 h-full w-full">
      <h1 className="text-4xl font-bold mb-4 text-black pt-16">Welcome to Pets Medicare</h1>
      <p className="text-lg mb-6 text-black">Manage your pet appointments with ease.</p>
      {user ? (
        <Link to="/dashboard" className="bg-purple-800 text-white px-6 py-2 rounded">Go to Dashboard</Link>
      ) : (
        <div>
          <Link to="/login" className="bg-purple-800 px-4 py-2 rounded shadow-md hover:bg-purple-600 mr-4 text-white">Login</Link>
          <Link to="/signup" className="bg-purple-800 px-4 py-2 rounded shadow-md hover:bg-purple-600 text-white">Sign Up</Link>
        </div>
      )}
      <img src={pic} alt="cat" className=' m-10  object-cover w-1/2' />
    </div>
  );
};

export default Home;

