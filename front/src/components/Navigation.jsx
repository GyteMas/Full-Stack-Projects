import { Link } from "react-router-dom";
import useAuth from "../contexts/useAuth";

const Navigation = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-purple-500 p-4 text-white flex justify-between border-b fixed w-full">
      <div className="place-self-center">
        <Link
          to="/"
          className="mr-4 bg-purple-800 px-4 py-2 rounded shadow-md hover:bg-purple-600"
        >
          Home
        </Link>
      </div>
      <div className="place-items-center flex">
        {user && !isAdmin && <h1 className="text-2xl">Dashboard</h1>}
        {isAdmin && <h1 className="text-2xl">Admin Panel</h1>}
      </div>
      <div>
        {!user ? (
          <>
            <Link
              to="/login"
              className="mr-4 bg-purple-800 px-4 py-2 rounded shadow-md hover:bg-purple-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-800 px-4 py-2 rounded shadow-md hover:bg-purple-600"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-purple-800 px-4 py-2 rounded shadow-md hover:bg-purple-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
