// import { useEffect, useState } from "react";
// import UserCard from "./UserCard";
// import AdminNav from "./AdminRoute/AdminNav";

// function Admin() {
//   const [users, setusers] = useState([]);

//   const fetchFun = async () => {
//     let res = await fetch("http://localhost:8080/user");
//     res = await res.json();
//     setusers(res.data.users);
//     console.log(res.data.users);
//   };

//   useEffect(() => {
//     fetchFun();
//   }, []);
//   return (
//     <>
//       <AdminNav />

//       <div style={{ display: "flex", justifyContent: "space-around" }}>
//         <h1>Total User:-{users.length}</h1>
//       </div>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(5,1fr)",
//           width: "80%",
//           margin: "auto",
//         }}
//       >
//         <div>
//           <h1>UserName</h1>
//         </div>
//         <div>
//           <h5>Email</h5>
//         </div>
//         <div>
//           <h1>CreatedAt</h1>
//         </div>
//         <div>
//           <h1>Update</h1>
//         </div>
//         <div>
//           <h1>Delete</h1>
//         </div>

//         {users.map((item) => (
//           <UserCard key={item._id} {...item} />
//         ))}
//       </div>
//     </>
//   );
// }
// export default Admin;

// Admin.js

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
