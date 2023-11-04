import { Link } from "react-router-dom"

function ActivityCard({_id,emoji,name}){

    const activityDelete = async(id)=>{
        try {
            let res = await fetch(`http://localhost:8080/activity/delete/${id}`,{
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
        <h1>{name}</h1>
        <h3>{emoji}</h3>
        <div>
            <Link to={`/activityupdate/${_id}`}>
        <button>Edit</button>
            </Link>
        </div>
        <div>
        <button onClick={()=>activityDelete(_id)}>Delete</button>
        </div>
        </>
    )
}
export default ActivityCard