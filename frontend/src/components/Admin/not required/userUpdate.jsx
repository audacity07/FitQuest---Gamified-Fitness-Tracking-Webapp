// // import { useState } from "react";
// // import { useParams } from "react-router-dom";

// // function UserUpdate() {
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const { id } = useParams();
// //   // console.log(id)

// //   const upadteFun = async () => {
// //     let res = await fetch(`http://localhost:8080/user/update/${id}`, {
// //       method: "PATCH",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ username, email, password }),
// //     });
// //     res = await res.json();
// //     console.log(res);
// //     alert("Updated Successfully");
// //   };

// //   const handleUpdate = (e) => {
// //     e.preventDefault();
// //     upadteFun();
// //     // console.log(username,email,password)
// //   };
// //   return (
// //     <>
// //       <form onSubmit={handleUpdate}>
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //         />
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />
// //         <input type="submit" value={"Update User"} />
// //       </form>
// //     </>
// //   );
// // }
// // export default UserUpdate;

// import { useState } from "react";
// import { useParams } from "react-router-dom";

// function UserUpdate() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { id } = useParams();

//   const upadteFun = async () => {
//     let res = await fetch(`http://localhost:8080/user/update/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, email, password }),
//     });
//     res = await res.json();
//     console.log(res);
//     alert("Updated Successfully");
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     upadteFun();
//   };

//   return (
//     <div className="p-4 md:p-8 lg:p-12">
//       <form
//         onSubmit={handleUpdate}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//       >
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="username"
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Update User
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UserUpdate;

// import { Link } from "react-router-dom";

// function UserCard({ _id, email, username, password, createdAt }) {
//   const handleDelete = async (id) => {
//     try {
//       let res = await fetch(`http://localhost:8080/user/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       //  res = await res.json()
//       alert("Deleted successfully");
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div style={{ textAlign: "left" }}>
//         <p>{username}</p>
//       </div>
//       <div style={{ textAlign: "left" }}>
//         <p>{email}</p>
//       </div>
//       <div style={{ textAlign: "left" }}>
//         <p>{createdAt}</p>
//       </div>
//       <div style={{ textAlign: "left" }}>
//         <Link to={`/userupdate/${_id}`}>
//           <button>Edit</button>
//         </Link>
//       </div>
//       <div style={{ textAlign: "left" }}>
//         <button onClick={() => handleDelete(_id)}>Delete</button>
//       </div>
//     </>
//   );
// }
// export default UserCard;

// UserCard.js

// import { Link } from "react-router-dom";

// function UserCard({ _id, email, username, createdAt }) {
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/user/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200) {
//         alert("Deleted successfully");
//       } else {
//         alert("Failed to delete user");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <tr className="border-b border-gray-300">
//       <td className="px-4 py-2 font-semibold text-gray-800">{username}</td>
//       <td className="px-4 py-2">{email}</td>
//       <td className="px-4 py-2">{createdAt}</td>
//       <td className="px-4 py-2">
//         <Link to={`/userupdate/${_id}`}>
//           <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
//             Edit
//           </button>
//         </Link>
//       </td>
//       <td className="px-4 py-2">
//         <button
//           onClick={() => handleDelete(_id)}
//           className="bg-red-500 text-white py-2 px-4 rounded-full"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// }

// export default UserCard;

// import { Link } from "react-router-dom";

// function AdminNav() {
//   return (
//     <>
//       <Link to={"/admin"}>User</Link>
//       <Link to={"/adminActivity"}>Activity</Link>
//       <Link to={"/activity/add"}>AddActivity</Link>
//     </>
//   );
// }
// export default AdminNav;
