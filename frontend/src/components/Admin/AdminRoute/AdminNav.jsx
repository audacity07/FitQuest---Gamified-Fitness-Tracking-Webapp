import { Link } from "react-router-dom"

function AdminNav(){
    return (
        <>
        <Link to={"/"}>User</Link>
        <Link to={"/adminActivity"}>Activity</Link>
        </>
    )
}
export default AdminNav