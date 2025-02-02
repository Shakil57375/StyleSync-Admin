import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? "bg-pink-50" : "";
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">FOREVER</span>
          <span className="text-pink-500">.</span>
          <span className="text-sm text-gray-500 ml-1">ADMIN PANEL</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/add" className={`flex items-center p-3 rounded-lg hover:bg-pink-50 ${isActive("/add")}`}>
              <span className="mr-2">+</span>
              Add Items
            </Link>
          </li>
          <li>
            <Link to="/list" className={`flex items-center p-3 rounded-lg hover:bg-pink-50 ${isActive("/list")}`}>
              <span className="mr-2">☰</span>
              List Items
            </Link>
          </li>
          <li>
            <Link to="/orders" className={`flex items-center p-3 rounded-lg hover:bg-pink-50 ${isActive("/orders")}`}>
              <span className="mr-2">📦</span>
              Orders
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
