function UserCard({_id,email,username,password}){
    return (
        <>
        {/* <div style={{display:"flex",justifyContent:"space-around",textAlign:"left"}}> */}
            <div style={{textAlign:"left",border:"1px solid red"}}>
                <p>
                {username}
                </p>
                </div>
            <div style={{textAlign:"left",border:"1px solid red"}}>
                <p>
                {email}
                </p>
                </div>
            <div style={{textAlign:"left",border:"1px solid red"}}>
                <p>
                {password}
                </p>
                </div>
            <div style={{textAlign:"left",border:"1px solid red"}}>
               <button>Edit</button>
                </div>
            <div style={{textAlign:"left",border:"1px solid red"}}>
                <button>Delete</button>
                </div>
        {/* </div> */}
        </>
    )
}
export default UserCard