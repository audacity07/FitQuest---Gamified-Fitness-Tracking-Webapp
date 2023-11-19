import { useState } from "react";
import { Toaster, toast } from 'sonner'

function AdminActivityCard({ _id, emoji, name, createdAt, onDeleteUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(name);
  const [newEmail, setNewEmail] = useState(emoji);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://helpful-jay-neckerchief.cyclic.app/activity/delete/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Successful deletion, notify the parent component to update the user list
        onDeleteUser(id);
        toast.success("Activity Deleted !")
      } else {
        toast.error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset the input fields to their original values
    setNewUsername(name);
    setNewEmail(emoji);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `https://helpful-jay-neckerchief.cyclic.app/activity/update/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newUsername, emoji: newEmail }),
        }
      );

      if (response.status === 200) {
        // Successful update, update the state with the new information
        setIsEditing(false); // Exit editing mode
        // Update the parent component or state with the new data
        // onUpdateUserData(_id, newUsername, newEmail);
        toast.success("Activity information updated successfully");
      } else {
        toast.error("Failed to update activity information");
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      toast.error("Failed to update activity information");
    }
  };

  return (
    <tr className="border-b border-gray-100 min-w-full">
      <Toaster richColors position="top-center" />
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full font-[rubik] font-medium text-gray-500 rounded p-2 border focus:outline-orange-200"
          />
        ) : (
          <span className="text-gray-500 font-[rubik] font-medium">{name}</span>
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full text-2xl rounded p-2 border focus:outline-orange-200"
          />
        ) : (
          <div className="text-2xl text-center">{emoji}</div>
        )}
      </td>
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
          <div className="text-center">
            <button
              onClick={handleEdit}
              className="bg-yellow-500/10 font-[rubik] text-yellow-600 font-medium py-1 px-3 rounded-md"
            >
              Edit
            </button>
          </div>
        )}
      </td>
      <td className="px-4 py-2">
        <div className="text-center">
          <button
            onClick={() => handleDelete(_id)}
            className="bg-red-300/10 font-[rubik] text-red-800 font-medium py-1 px-3 rounded-md"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AdminActivityCard;
