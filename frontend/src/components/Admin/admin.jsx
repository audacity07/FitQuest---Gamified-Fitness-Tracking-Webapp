


import { useEffect, useState } from "react"
import UserCard from "./UserCard"
import AdminNav from "./AdminRoute/AdminNav"
import MainRoute from "./AdminRoute/MainRoute"


function Admin() {
    const [users, setusers] = useState([])

    const fetchFun = async () => {
        let res = await fetch("http://localhost:8080/user")
        res = await res.json()
        setusers(res.data.users)
        console.log(res.data.users)
    }

    useEffect(() => {
        fetchFun()
    }, [])
    return (
        <>

            <AdminNav />

            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h1>Total User:-{users.length}</h1>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", width: "80%", margin: "auto" }}>
                <div><h1>UserName</h1></div>
                <div><h5>Email</h5></div>
                <div><h1>CreatedAt</h1></div>
                <div><h1>Update</h1></div>
                <div><h1>Delete</h1></div>

                {
                    users.map((item) => (
                        <UserCard key={item._id} {...item} />
                    ))
                }
            </div>
        </>
    )
}


export default Admin;
