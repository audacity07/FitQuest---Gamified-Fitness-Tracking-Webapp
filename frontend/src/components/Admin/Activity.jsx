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
import { useEffect, useState } from "react";
import AdminNav from "./AdminRoute/AdminNav";
import ActivityCard from "./activityCard";

function Activity() {
  const [data, setData] = useState([]);

  const getImojiFun = async () => {
    try {
      let res = await fetch("http://localhost:8080/activity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      console.log(res.data.activities);
      setData(res.data.activities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImojiFun();
  }, [data]);

  return (
    <div className="p-4">
      <AdminNav />

      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-2xl font-semibold mb-4 mt-4">
          Total Users: {data.length}
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Emoji</th>
              <th className="px-4 py-2 text-left">Edit</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <ActivityCard key={item._id} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activity;
