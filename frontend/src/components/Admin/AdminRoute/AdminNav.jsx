import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <Link to="/admin" className="text-xl font-semibold">
          User
        </Link>
        <div className="lg:flex hidden space-x-4">
          <Link to="/adminActivity">Activity</Link>
          <Link to="/activity/add">Add Activity</Link>
        </div>
        <button className="lg:hidden block text-2xl focus:outline-none">
          <i className="fas fa-bars"></i>
        </button>
      </div>
      {/* Mobile Menu */}
      <div className="lg:hidden mt-4">
        <Link to="/adminActivity" className="block py-2">
          Activity
        </Link>
        <Link to="/activity/add" className="block py-2">
          Add Activity
        </Link>
      </div>
    </div>
  );
}

export default AdminNav;
