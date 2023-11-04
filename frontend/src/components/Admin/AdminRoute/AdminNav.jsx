import { Link } from "react-router-dom"

function AdminNav(){
    return (
        <>
        <Link to={"/"}>User</Link>
        <Link to={"/adminActivity"}>Activity</Link>
        <Link to={"/activity/add"} >AddActivity</Link>
        </>
    )
}
export default AdminNav