import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddItems from "./pages/Add";
import ListItems from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import PrivateRoute from "./private/PrivateRoute";

// start watching the tutorial from 8:02 minute

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64">
        <Navbar />
      </div>

      <div className="flex-1 overflow-auto">
        <main>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/add" element={<AddItems />} />
              <Route path="/list" element={<ListItems />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/" element={<AddItems />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}
