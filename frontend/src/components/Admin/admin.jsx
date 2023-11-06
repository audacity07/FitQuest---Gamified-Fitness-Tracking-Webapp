import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import AdminNav from "./AdminRoute/AdminNav";
import { Link } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/user");
      const data = await response.json();
      setUsers(data.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <div className="p-4">
      {/* <AdminNav /> */}

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold mb-4 mt-4">
          Total Users: {users.length}
        </h1>
        <div>
          <Link className="mx-2 bg-blue-700 text-white font-medium rounded-md py-2 px-3" to="/adminActivity">Activity</Link>
          <Link className="mx-2 bg-blue-700 text-white font-medium rounded-md py-2 px-3" to="/activity/add">Add Activity</Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-center">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">UserName</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">CreatedAt</th>
              <th className="px-4 py-2">Update</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <UserCard key={item._id} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
