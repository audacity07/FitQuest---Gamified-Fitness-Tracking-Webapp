import { useState } from "react";
import { Toaster, toast } from 'sonner'

function AdminUserCard({ _id, email, username, createdAt, onDeleteUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://helpful-jay-neckerchief.cyclic.app/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Successful deletion, notify the parent component to update the user list
        onDeleteUser(id);
        toast.success("User Deleted!")
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset the input fields to their original values
    setNewUsername(username);
    setNewEmail(email);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://helpful-jay-neckerchief.cyclic.app/user/update/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername, email: newEmail }),
      });

      if (response.status === 200) {
        // Successful update, update the state with the new information
        setIsEditing(false); // Exit editing mode
        // Update the parent component or state with the new data
        // onUpdateUserData(_id, newUsername, newEmail);
        toast.success("User information updated successfully");
      } else {
        toast.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user information");
    }
  };
  return (
    <tr>
      <Toaster richColors position="bottom-left" />
      <td className="px-4 py-4">
        {isEditing ? (
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full font-[rubik] rounded p-2  font-medium border focus:outline-orange-200"
          />
        ) : (
          <span className="text-gray-500 font-[rubik] font-medium">{username}</span>
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full font-[rubik] text-black font-medium rounded p-2 border focus:outline-orange-200"
          />
        ) : (
          <span className="text-gray-500 font-[rubik] font-medium">{email}</span>
        )}
      </td>
      <td className="px-4 py-2 hidden md:table-cell text-gray-500 font-medium font-[rubik]">{createdAt}</td>
      <td className="px-4 py-2">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="bg-lime-500/10 font-[rubik] text-lime-600 font-medium py-2 px-4 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-slate-500/10 font-[rubik] text-slate-500 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="font-[rubik] bg-yellow-500/10 text-yellow-600 font-medium py-1 px-3 rounded-md"
          >
            Edit
          </button>
        )}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleDelete(_id)}
          className="font-[rubik] bg-red-300/10 text-red-800 font-medium py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default AdminUserCard;
