
// import { useEffect, useState } from "react"
// import UserCard from "./UserCard"
// import AdminNav from "./AdminRoute/AdminNav"

// function Admin(){
//     const [users,setusers] = useState([])

//     const fetchFun = async()=>{
//         let res = await fetch("http://localhost:8080/user")
//         res = await res.json()
//         setusers(res.data.users)
//         console.log(res.data.users)
//     }

//     useEffect(()=>{
//         fetchFun()
//     },[])
//     return (
//         <>
//         <AdminNav />
//         <div style={{display:"flex",justifyContent:"space-around"}}>
//             <h1>Total User:-{users.length}</h1>
//         </div>
//         <div style={{display:"grid" ,gridTemplateColumns:"repeat(5,1fr)",width:"80%",margin:"auto",}}>
//             <div>UserName</div>
//             <div>Email</div>
//             <div>CreatedAt</div>
//             <div>Update</div>
//             <div>Delete</div>
        
//                 {
//                     users.map((item)=>(
//                        <UserCard key={item._id} {...item} />
                        
//                     ))
//                 }
// </div>
//         </>
//     )
// function Admin() {
//   return (
//     <>
      
//     </>
//   );
// }
// export default Admin;
