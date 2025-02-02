import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddItems from "./pages/Add";
import ListItems from "./pages/List";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64">
        <Navbar />
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex justify-end p-4">
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Logout
            </button>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/add" element={<AddItems />} />
            <Route path="/list" element={<ListItems />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<AddItems />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
