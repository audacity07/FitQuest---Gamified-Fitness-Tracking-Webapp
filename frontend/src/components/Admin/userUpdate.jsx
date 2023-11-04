import { useState } from "react"
import { useParams } from "react-router-dom"

function UserUpdate(){
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {id} = useParams()
    // console.log(id)

    const upadteFun = async()=>{
        let res = await fetch(`http://localhost:8080/user/update/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify({username,email,password})
        })
        res = await res.json()
        console.log(res)
        alert("Updated Successfully")
    }

    const handleUpdate = (e)=>{
        e.preventDefault()
        upadteFun()
        // console.log(username,email,password)
    }
    return (
        <>
        <form onSubmit={handleUpdate}>
            <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input type="submit" value={"Update User"} />
        </form>
        </>
    )
}
export default UserUpdate