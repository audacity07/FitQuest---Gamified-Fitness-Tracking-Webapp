import { Link } from "react-router-dom"

function UserCard({_id,email,username,password,createdAt}){

    const handleDelete = async(id)=>{
    try {
        let res = await fetch(`http://localhost:8080/user/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
         })
        //  res = await res.json()
        alert("Deleted successfully")
         console.log(res)
    } catch (error) {
        console.log(error)
    }
    }


    return (
        <>
        
            <div style={{textAlign:"left"}}>
                <p>
                {username}
                </p>
                </div>
            <div style={{textAlign:"left"}}>
                <p>
                {email}
                </p>
                </div>
            <div style={{textAlign:"left"}}>
                <p>
                {createdAt}
                </p>
                </div>
            <div style={{textAlign:"left"}}>
                <Link to={`/userupdate/${_id}`}>
               <button>Edit</button>
                </Link>
                </div>
            <div style={{textAlign:"left"}}>
                <button onClick={()=>handleDelete(_id)}>Delete</button>
                </div>
        
        </>
    )
}
export default UserCard