// import { useState } from "react";
// import { useParams } from "react-router-dom";

// function ActivityUpdate() {
//   const [name, setName] = useState("");
//   const [emoji, setEmoji] = useState("");
//   const { id } = useParams();
//   console.log(id);
//   const upadteFun = async () => {
//     let res = await fetch(`http://localhost:8080/activity/update/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, emoji }),
//     });
//     res = await res.json();
//     console.log(res);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     upadteFun();
//     // console.log(username,email,password)
//   };

//   return (
//     <>
//       <h1>Activity Update</h1>
//       <form onSubmit={handleUpdate}>
//         <input
//           type="text"
//           placeholder="Enter Activity Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Activity Imoji"
//           value={emoji}
//           onChange={(e) => setEmoji(e.target.value)}
//         />
//         <input type="submit" value={"Update Activity"} />
//       </form>
//     </>
//   );
// }
// export default ActivityUpdate;

// import { useEffect, useState } from "react";
// import AdminNav from "./AdminRoute/AdminNav";
// import ActivityCard from "./activityCard";

// function Activity() {
//   const [data, setData] = useState([]);
//   const getImojiFun = async () => {
//     try {
//       let res = await fetch("http://localhost:8080/activity", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       res = await res.json();
//       console.log(res.data.activities);
//       setData(res.data.activities);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getImojiFun();
//   }, []);

//   return (
//     <>
//       <AdminNav />
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4,1fr)",
//           width: "60%",
//           margin: "auto",
//         }}
//       >
//         <h1>Name</h1>
//         <h1>Imoji</h1>
//         <h1>Update</h1>
//         <h1>Delete</h1>
//         {data.map((item) => {
//           return <ActivityCard key={item._id} {...item} />;
//         })}
//       </div>
//     </>
//   );
// }
// export default Activity;
