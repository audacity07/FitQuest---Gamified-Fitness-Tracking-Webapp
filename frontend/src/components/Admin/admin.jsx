import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import AdminNav from "./AdminRoute/AdminNav";

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
      <AdminNav />

      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-2xl font-semibold mb-4 mt-4">
          Total Users: {users.length}
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">UserName</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">CreatedAt</th>
              <th className="px-4 py-2 text-left">Update</th>
              <th className="px-4 py-2 text-left">Delete</th>
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
