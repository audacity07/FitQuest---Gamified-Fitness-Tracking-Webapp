import {Routes,Route} from "react-router-dom"
import Admin from "../admin"
import Activity from "../Activity"

function MainRoute(){
    return (
        <>
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/adminActivity" element={<Activity />} />
        </Routes>
        </>
    )
}
export default MainRoute