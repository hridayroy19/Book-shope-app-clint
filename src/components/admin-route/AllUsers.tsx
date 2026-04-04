import { useEffect, useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import useAxiosPublic from "../../axiosPublic/useAxiosPublic";
import Swal from "sweetalert2";

interface User {
  _id: string;
  name: string;
  role: string;
  userStatus: string;
  id: string;
}

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/user/user-get");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  const handleDelete = async (id: string, name: string) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You want to delete the user ${name}. This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/user/delete-user/${id}`);
          if (res.data.success || res.status === 200) {
            setUsers((prev) => prev.filter((user) => user._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            });
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user.",
            icon: "error"
          });
        }
      }
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="px-4 w-full md:w-[1000px] mt-5">
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg text-white flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Manage Users</h1>
          <p className="text-blue-100 text-sm">View, manage, and remove registered users from the platform.</p>
        </div>
        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
          <span className="font-bold text-xl">{users.length}</span> Total
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentUsers.map((userdata) => (
                <tr key={userdata._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-sm">
                          {userdata?.name?.slice(0, 2).toUpperCase() || "US"}
                        </div>
                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${userdata?.userStatus === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{userdata?.name}</div>
                        <div className="text-xs text-gray-500">{userdata?.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">{userdata._id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${userdata?.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      {userdata?.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${userdata?.userStatus === 'active' ? 'text-green-700 bg-green-50' : 'text-gray-600 bg-gray-100'}`}>
                      {userdata?.userStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleDelete(userdata._id, userdata.name)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all"
                      title="Delete User"
                    >
                      <RiDeleteBin4Line className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination  */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{users.length > 0 ? indexOfFirstItem + 1 : 0}</span> to <span className="font-medium">{Math.min(indexOfLastItem, users.length)}</span> of <span className="font-medium">{users.length}</span> users
          </p>
          <div className="flex gap-1">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border rounded-md transition ${
                  currentPage === i + 1 ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
