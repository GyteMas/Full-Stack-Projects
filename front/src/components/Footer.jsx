import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="bg-purple-500 p-4 text-white flex place-content-center border-t w-full">
      <div className="place-self-center">
        <Link to="/">&copy; 2025 Gyte Maslinskiene</Link>
      </div>
    </div>
  );
};

export default Navigation;
