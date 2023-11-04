import { useState } from "react"

function AddActivity(){
    const [name,setName] = useState("")
    const [emoji,setEmoji] = useState("")


    const AddActivityFun = async()=>{
        let res = await fetch("http://localhost:8080/activity/add",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify({name,emoji})
        })
        res = await res.json()
        console.log(res)
        alert("Activity Added")
    }

    const handleAdd = (e)=>{
        e.preventDefault()
        AddActivityFun()
        // console.log(username,email,password)
    }




    return (
        <>
         <h1>Add Activity</h1>
        <form onSubmit={handleAdd}>
            <input type="text" placeholder="Enter Activity Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Enter Activity Imoji" value={emoji} onChange={(e)=>setEmoji(e.target.value)} />
            <input type="submit" value={"Add Activity"} />
        </form>
        </>
    )
}
export default AddActivity