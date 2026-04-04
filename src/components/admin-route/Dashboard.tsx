import { useState, useEffect } from "react";
import { FaBell, FaShop } from "react-icons/fa6";
import AllUsers from "./AllUsers";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../axiosPublic/useAxiosPublic";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch from backend /api/admin/stats
        const res = await axiosPublic.get('/admin/stats');
        if (res.data?.success) {
           setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    
    fetchStats();
  }, [axiosPublic]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white shadow p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <FaShop />
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search now"
            className="hidden md:block px-3 py-1 border rounded-md focus:outline-none focus:ring"
          />
          <FaBell className="w-5 h-5 cursor-pointer" />
          <img
            src="https://i.ibb.co.com/Xrrw66mQ/image-1.png"
            alt="profile"
            className="w-10 h-10  rounded-full object-cover"
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Welcome & Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Weather Card */}
          <div className="bg-white rounded-xl shadow p-5 col-span-1 md:col-span-1">
            <h2 className="text-lg font-semibold mb-2">Welcome Hridy Roy</h2>
            <div className="flex justify-between items-center rounded-lg p-2">
              <img
                src="https://i.ibb.co.com/1Y4hPmLH/old-books-quill-pen-vintage-600nw-2320613233.webp"
                alt="weather"
                className="w-full"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
            {[
              { title: "Total Book", value: stats.totalBooks.toString() },
              { title: "Total User", value: stats.totalUsers.toString() },
              { title: "Total Orders", value: stats.totalOrders.toString() },
              { title: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}` },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl shadow ${
                  i === 0
                    ? "bg-blue-400 text-white"
                    : i === 1
                    ? "bg-indigo-600 text-white"
                    : i === 2
                    ? "bg-indigo-400 text-white"
                    : "bg-red-400 text-white"
                }`}
              >
                <h3 className="text-sm mb-2">{stat.title}</h3>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Section */}
        <section className="bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">User</h2>
            <Link to="all-user">
              {" "}
              <button className="text-sm text-blue-600 hover:underline">
                View All
              </button>
            </Link>
          </div>
          <AllUsers />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
