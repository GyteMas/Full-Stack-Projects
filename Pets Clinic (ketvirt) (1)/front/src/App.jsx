import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './contexts/useAuth';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/LoginForm';
import Signup from './pages/SignUp';
import Dashboard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  const { isAdmin } = useAuth();

  return (
    <div className='grid grid-cols-1 grid-rows-[1fr_auto] bg-white min-h-screen'>
        <Navigation />
        <main className='flex flex-col items-center justify-center text-center bg-purple-100 m-0'>
        <Routes className='flex-1'>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </main>
        <Footer/>
    </div>
  );
}

export default App;

